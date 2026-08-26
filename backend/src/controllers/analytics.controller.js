const Link = require("../models/link.model");

async function getAnalytics(req, res) {
  try {
    const { id } = req.params;

    // Scope by user_id too — otherwise any logged-in user could read
    // analytics for any link by guessing its id.
    const link = await Link.findOne({
      _id: id,
      user_id: req.user._id,
    });

    if (!link) {
      return res.status(404).json({
        message: "Link not found",
      });
    }

    return res.status(200).json({
      link,
      message: "Link found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = { getAnalytics };
