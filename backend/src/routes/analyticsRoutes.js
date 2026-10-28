const express = require("express");
const { Link, AnalyticsEvent } = require("../models");
const { verifyToken, requireProfile } = require("../middleware/auth");
const { fromReferrer } = require("../utils/source");

const router = express.Router();

router.use(verifyToken, requireProfile);

const ctr = (views, clicks) => (views ? Math.round((clicks / views) * 1000) / 10 : 0);

// Older events have no stored source, so work it out from their referrer
const sourceName = ({ source, referrer }) => source || fromReferrer(referrer) || "Direct";

// GET /api/analytics?days=7 — period totals vs the previous period, daily series,
// top links and traffic sources
router.get("/", async (req, res) => {
  const days = Math.min(Math.max(parseInt(req.query.days, 10) || 7, 1), 365);

  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  since.setUTCDate(since.getUTCDate() - (days - 1));

  const previousSince = new Date(since);
  previousSince.setUTCDate(since.getUTCDate() - days);

  const [daily, previous, referrers, links] = await Promise.all([
    AnalyticsEvent.aggregate([
      { $match: { user: req.user._id, createdAt: { $gte: since } } },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            type: "$type",
          },
          count: { $sum: 1 },
        },
      },
    ]),
    AnalyticsEvent.aggregate([
      { $match: { user: req.user._id, createdAt: { $gte: previousSince, $lt: since } } },
      { $group: { _id: "$type", count: { $sum: 1 } } },
    ]),
    AnalyticsEvent.aggregate([
      { $match: { user: req.user._id, type: "view", createdAt: { $gte: since } } },
      { $group: { _id: { source: "$source", referrer: "$referrer" }, count: { $sum: 1 } } },
    ]),
    Link.find({ user: req.user._id }).sort({ clicks: -1 }).select("title url clicks"),
  ]);

  // Fill in every day so the chart has no gaps
  const series = [];
  for (let i = 0; i < days; i++) {
    const date = new Date(since);
    date.setUTCDate(since.getUTCDate() + i);
    series.push({ date: date.toISOString().slice(0, 10), views: 0, clicks: 0 });
  }

  const byDate = Object.fromEntries(series.map((day) => [day.date, day]));
  for (const { _id, count } of daily) {
    if (byDate[_id.date]) {
      byDate[_id.date][_id.type === "view" ? "views" : "clicks"] = count;
    }
  }

  const views = series.reduce((sum, day) => sum + day.views, 0);
  const clicks = series.reduce((sum, day) => sum + day.clicks, 0);

  const previousViews = previous.find((p) => p._id === "view")?.count || 0;
  const previousClicks = previous.find((p) => p._id === "click")?.count || 0;

  // Several referrer URLs can map to the same source, so merge by name
  const sourceCounts = {};
  for (const { _id, count } of referrers) {
    const name = sourceName(_id);
    sourceCounts[name] = (sourceCounts[name] || 0) + count;
  }
  const sources = Object.entries(sourceCounts)
    .map(([name, count]) => ({ name, count, percent: Math.round((count / views) * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  res.json({
    period: { views, clicks, ctr: ctr(views, clicks) },
    previousPeriod: {
      views: previousViews,
      clicks: previousClicks,
      ctr: ctr(previousViews, previousClicks),
    },
    allTime: {
      views: req.user.profileViews,
      clicks: links.reduce((sum, link) => sum + link.clicks, 0),
    },
    series,
    topLinks: links.slice(0, 5),
    sources,
  });
});

module.exports = router;
