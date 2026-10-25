const express = require("express");
const { Link, AnalyticsEvent } = require("../models");
const { verifyToken, requireProfile } = require("../middleware/auth");

const router = express.Router();

const EDITABLE_FIELDS = ["title", "url", "icon", "active"];

router.use(verifyToken, requireProfile);

// Adds https:// when the user types a bare domain like "github.com/me"
const normalizeUrl = (url) =>
  url && !/^[a-z][a-z0-9+.-]*:/i.test(url) ? `https://${url}` : url;

router.get("/", async (req, res) => {
  const links = await Link.find({ user: req.user._id }).sort({ order: 1 });
  res.json(links);
});

router.post("/", async (req, res) => {
  const last = await Link.findOne({ user: req.user._id }).sort({ order: -1 });

  const link = await Link.create({
    user: req.user._id,
    title: req.body.title,
    url: normalizeUrl(req.body.url),
    icon: req.body.icon,
    active: req.body.active,
    order: last ? last.order + 1 : 0,
  });

  res.status(201).json(link);
});

// Body: { ids: [linkId, linkId, ...] } in the new display order
router.put("/reorder", async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    return res.status(400).json({ message: "ids must be an array" });
  }

  await Link.bulkWrite(
    ids.map((id, index) => ({
      updateOne: {
        filter: { _id: id, user: req.user._id },
        update: { order: index },
      },
    }))
  );

  const links = await Link.find({ user: req.user._id }).sort({ order: 1 });
  res.json(links);
});

router.patch("/:id", async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id, user: req.user._id });

  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }

  for (const field of EDITABLE_FIELDS) {
    if (req.body[field] !== undefined) {
      link[field] = field === "url" ? normalizeUrl(req.body.url) : req.body[field];
    }
  }

  await link.save();
  res.json(link);
});

router.delete("/:id", async (req, res) => {
  const link = await Link.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }

  await AnalyticsEvent.deleteMany({ link: link._id });
  res.status(204).end();
});

module.exports = router;
