const mongoose = require("mongoose");

// One document per profile view or link click, used for the "over time" charts.
// Running totals live on User.profileViews and Link.clicks for fast reads.
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
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

analyticsEventSchema.index({ user: 1, type: 1, createdAt: -1 });

module.exports = mongoose.model("AnalyticsEvent", analyticsEventSchema);
