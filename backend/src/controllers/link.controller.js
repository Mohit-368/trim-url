const Link = require("../models/link.model");
const QRCode = require("qrcode");
const imagekit = require("../config/imagekit");
const geoip = require("geoip-lite");

const TRIM_LINK_PATTERN = /^[a-zA-Z0-9_-]+$/;

// GET /links
async function getLinks(req, res) {
  try {
    const links = await Link.find({
      user_id: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      message: "Links fetched successfully",
      count: links.length,
      links,
    });
  } catch (error) {
    console.error("Get links error:", error);

    return res.status(500).json({
      message: "Failed to fetch links",
    });
  }
}

// POST /links
async function createLink(req, res) {
  try {
    const { original_link, trim_link, expires_at } = req.body;

    // Validate required fields
    if (!original_link || !trim_link) {
      return res.status(400).json({
        message: "Original link and trim link are required",
      });
    }

    if (!TRIM_LINK_PATTERN.test(trim_link)) {
      return res.status(400).json({
        message:
          "Trim link may only contain letters, numbers, hyphens and underscores",
      });
    }

    try {
      // Throws if original_link isn't a well-formed absolute URL
      new URL(original_link);
    } catch {
      return res.status(400).json({
        message: "Original link must be a valid URL",
      });
    }

    // Check whether trim link already exists
    const existingLink = await Link.findOne({ trim_link });

    if (existingLink) {
      return res.status(409).json({
        message: "Trim link already exists",
      });
    }

    // Create the actual shortened URL
    const shortUrl = `${process.env.SHORT_URL_BASE}/${trim_link}`;

    // Generate QR code as PNG buffer
    const qrBuffer = await QRCode.toBuffer(shortUrl, {
      type: "png",
      width: 500,
      margin: 2,
    });

    // Upload QR code to ImageKit
    const uploadResponse = await imagekit.upload({
      file: qrBuffer,
      fileName: `qr-${trim_link}.png`,
      folder: "/trimlink/qr-codes",
    });

    // Create database document
    const link = await Link.create({
      original_link,
      trim_link,
      qr_code: uploadResponse.url,
      expires_at: expires_at || null,
      user_id: req.user._id,
    });

    return res.status(201).json({
      message: "Link created successfully",
      link,
    });
  } catch (error) {
    console.error("Create link error:", error);

    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(409).json({
        message: "Trim link already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to create link",
    });
  }
}

// DELETE /links/:id
async function deleteLink(req, res) {
  try {
    const { id } = req.params;

    // Delete only if the link belongs to the logged-in user
    const link = await Link.findOneAndDelete({
      _id: id,
      user_id: req.user._id,
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    return res.status(200).json({
      message: "Link deleted successfully",
      link,
    });
  } catch (error) {
    console.error("Delete link error:", error);

    return res.status(500).json({
      message: "Failed to delete link",
    });
  }
}

// Very small, dependency-free device classifier for the click-tracking map.
function classifyDevice(userAgent = "") {
  const ua = userAgent.toLowerCase();
  if (/mobile|iphone|android/.test(ua)) return "mobile";
  if (/tablet|ipad/.test(ua)) return "tablet";
  return "desktop";
}

// req.ip only reflects the real client IP if "trust proxy" is set
// (see app.js) when running behind a proxy/load balancer.
function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded ? forwarded.split(",")[0].trim() : req.ip;

  // IPv4-mapped IPv6 addresses (e.g. "::ffff:203.0.113.5") need stripping
  // for geoip-lite to recognize them.
  return ip?.startsWith("::ffff:") ? ip.slice(7) : ip;
}

// Returns a country code, or null if it can't be determined
// (localhost, private IPs, and unrecognized ranges all resolve to null).
function getCountry(ip) {
  const geo = geoip.lookup(ip);
  return geo?.country || null;
}

// GET /:trim_link  (public, no auth — this is the actual redirect a visitor hits)
async function redirectLink(req, res) {
  try {
    const { trim_link } = req.params;

    const link = await Link.findOne({ trim_link });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    if (link.expires_at && link.expires_at.getTime() < Date.now()) {
      return res.status(410).json({
        message: "This link has expired",
      });
    }

    const deviceType = classifyDevice(req.headers["user-agent"]);
    const country = getCountry(getClientIp(req));

    const incrementFields = {
      clicks: 1,
      [`device.${deviceType}`]: 1,
    };

    // Only bump demographics when a country could actually be resolved
    // (e.g. not for localhost/private-network requests).
    if (country) {
      incrementFields[`demographics.${country}`] = 1;
    }

    await Link.updateOne(
      { _id: link._id },
      { $inc: incrementFields }
    );

    return res.redirect(302, link.original_link);
  } catch (error) {
    console.error("Redirect error:", error);

    return res.status(500).json({
      message: "Failed to redirect link",
    });
  }
}

module.exports = {
  getLinks,
  createLink,
  deleteLink,
  redirectLink,
};
