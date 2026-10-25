const mongoose = require("mongoose");

// One document per unique profile view or link click, used for the "over time" charts.
// Running totals live on User.profileViews and Link.clicks for fast reads.
// Repeat hits from the same visitor on the same day and bot traffic are never stored
// (see utils/tracking.js).
const analyticsEventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["view", "click"],
      required: true,
    },
    // Set only for clicks
    link: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Link",
    },
    referrer: {
      type: String,
      default: "",
    },
    // Hashed IP + user agent; raw IPs are never stored
    visitor: String,
    // Hashed IP alone, for spotting floods from one address
    ipHash: String,
    // type:target:visitor:day, so a visitor counts once per link (or profile) per day
    dedupeKey: String,
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

analyticsEventSchema.index({ user: 1, type: 1, createdAt: -1 });
// Sparse because events recorded before deduplication have no key
analyticsEventSchema.index({ dedupeKey: 1 }, { unique: true, sparse: true });
analyticsEventSchema.index({ ipHash: 1, createdAt: -1 });

module.exports = mongoose.model("AnalyticsEvent", analyticsEventSchema);
