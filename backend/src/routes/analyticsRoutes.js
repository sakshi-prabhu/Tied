const express = require("express");
const { Link, AnalyticsEvent } = require("../models");
const { verifyToken, requireProfile } = require("../middleware/auth");
const { fromReferrer } = require("../utils/source");

const router = express.Router();

router.use(verifyToken, requireProfile);

// Views, clicks and CTR are all counted in visits: one visitor on one day.
// A visit counts once towards "views" if they opened the profile, and once towards
// "clicks" if they tapped any link, however many links they tapped. Per-link totals
// (each link once per visitor per day) are what "Top links" shows.
const ctr = (views, clickedViews) =>
  views ? Math.min(Math.round((clickedViews / views) * 1000) / 10, 100) : 0;

// Visit counts per day in [from, to): views, clicks, and visits with both (for CTR)
const dailyVisits = (user, from, to) =>
  AnalyticsEvent.aggregate([
    { $match: { user, createdAt: { $gte: from, ...(to && { $lt: to }) } } },
    {
      $group: {
        _id: {
          // Events from before deduplication have no visitor, so each stands alone
          visitor: { $ifNull: ["$visitor", "$_id"] },
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
        types: { $addToSet: "$type" },
      },
    },
    {
      $group: {
        _id: "$_id.date",
        views: { $sum: { $cond: [{ $in: ["view", "$types"] }, 1, 0] } },
        clicks: { $sum: { $cond: [{ $in: ["click", "$types"] }, 1, 0] } },
        clickedViews: { $sum: { $cond: [{ $setIsSubset: [["view", "click"], "$types"] }, 1, 0] } },
      },
    },
  ]);

const total = (rows, key) => rows.reduce((sum, row) => sum + row[key], 0);

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
    dailyVisits(req.user._id, since),
    dailyVisits(req.user._id, previousSince, since),
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
  for (const { _id, views, clicks } of daily) {
    if (byDate[_id]) Object.assign(byDate[_id], { views, clicks });
  }

  const views = total(daily, "views");
  const clicks = total(daily, "clicks");

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
    period: { views, clicks, ctr: ctr(views, total(daily, "clickedViews")) },
    previousPeriod: {
      views: total(previous, "views"),
      clicks: total(previous, "clicks"),
      ctr: ctr(total(previous, "views"), total(previous, "clickedViews")),
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
