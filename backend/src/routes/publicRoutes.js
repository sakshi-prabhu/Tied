const express = require("express");
const { User, Link, AnalyticsEvent, Avatar } = require("../models");

const router = express.Router();

// Uploaded profile pictures. Each upload gets a new URL, so it can be cached forever.
router.get("/avatars/:userId", async (req, res) => {
  const avatar = await Avatar.findOne({ user: req.params.userId });

  if (!avatar) {
    return res.status(404).json({ message: "Image not found" });
  }

  res.set({
    "Content-Type": avatar.contentType,
    "Cache-Control": "public, max-age=31536000, immutable",
    "X-Content-Type-Options": "nosniff",
  });
  res.send(avatar.data);
});

// Public profile page data: tied.app/<username>
router.get("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username.toLowerCase() });

  if (!user) {
    return res.status(404).json({ message: "Profile not found" });
  }

  const links = await Link.find({ user: user._id, active: true })
    .sort({ order: 1 })
    .select("title url icon");

  res.json({
    username: user.username,
    displayName: user.displayName,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    appearance: user.appearance,
    links,
  });
});

// Called by the public page once it loads; body: { referrer: document.referrer }
router.post("/:username/view", async (req, res) => {
  const user = await User.findOneAndUpdate(
    { username: req.params.username.toLowerCase() },
    { $inc: { profileViews: 1 } }
  );

  if (!user) {
    return res.status(404).json({ message: "Profile not found" });
  }

  await AnalyticsEvent.create({
    user: user._id,
    type: "view",
    referrer: req.body?.referrer || "",
  });

  res.status(204).end();
});

// Called when a visitor clicks a link; responds with the URL to open
router.post("/links/:id/click", async (req, res) => {
  const link = await Link.findOneAndUpdate(
    { _id: req.params.id, active: true },
    { $inc: { clicks: 1 } }
  );

  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }

  await AnalyticsEvent.create({
    user: link.user,
    link: link._id,
    type: "click",
    referrer: req.body?.referrer || "",
  });

  res.json({ url: link.url });
});

module.exports = router;
