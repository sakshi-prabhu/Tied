const express = require("express");
const { User, Link, Avatar } = require("../models");
const { recordEvent } = require("../utils/tracking");

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

// Public profile page data: tied.app/<username>. Old usernames also resolve;
// the response's username is the current one, so the page can redirect.
router.get("/:username", async (req, res) => {
  const user = await User.findByAnyUsername(req.params.username);

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
  const user = await User.findByAnyUsername(req.params.username);

  if (!user) {
    return res.status(404).json({ message: "Profile not found" });
  }

  if (await recordEvent(req, { user: user._id, type: "view" })) {
    await User.updateOne({ _id: user._id }, { $inc: { profileViews: 1 } });
  }

  res.status(204).end();
});

// Called when a visitor clicks a link; responds with the URL to open
router.post("/links/:id/click", async (req, res) => {
  const link = await Link.findOne({ _id: req.params.id, active: true });

  if (!link) {
    return res.status(404).json({ message: "Link not found" });
  }

  if (await recordEvent(req, { user: link.user, link: link._id, type: "click" })) {
    await Link.updateOne({ _id: link._id }, { $inc: { clicks: 1 } });
  }

  res.json({ url: link.url });
});

module.exports = router;
