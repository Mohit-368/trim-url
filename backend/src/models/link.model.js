const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    original_link: {
      type: String,
      required: [true, "Original link is required"],
      trim: true,
    },

    trim_link: {
      type: String,
      required: [true, "Trim link is required"],
      unique: true,
      trim: true,
      index: true,
    },

    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },

    demographics: {
      type: Map,
      of: Number,
      default: {},
    },

    device: {
      type: Map,
      of: Number,
      default: {},
    },

    qr_code: {
      type: String,
      default: null,
    },

    // Optional expiration
    expires_at: {
      type: Date,
      default: null,
      index: {
        expireAfterSeconds: 0,
      },
    },

    // Useful if you later add user accounts
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
