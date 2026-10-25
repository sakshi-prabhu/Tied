const express = require("express");
const { User, Link, AnalyticsEvent, Avatar } = require("../models");
const { verifyToken, requireProfile } = require("../middleware/auth");
const { USERNAME_PATTERN, isReservedUsername } = require("../utils/username");

const router = express.Router();

const AVATAR_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_BYTES = 2 * 1024 * 1024;

// Fields the owner is allowed to change through PATCH /me (the picture goes through /me/avatar)
const EDITABLE_FIELDS = ["username", "displayName", "bio"];
const APPEARANCE_FIELDS = ["theme", "buttonStyle", "backgroundColor", "buttonColor", "textColor"];

// Builds a free username from the email for sign-ups that don't pick one (e.g. Google)
const generateUsername = async (email) => {
  let base = email.split("@")[0].toLowerCase().replace(/[^a-z0-9_.]/g, "");
  base = base.slice(0, 24).padEnd(3, "0");

  let candidate = base;
  while (isReservedUsername(candidate) || (await User.exists({ username: candidate }))) {
    candidate = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return candidate;
};

// Public: is this username free?
router.get("/check-username/:username", async (req, res) => {
  const username = req.params.username.toLowerCase();

  if (!USERNAME_PATTERN.test(username)) {
    return res.json({ available: false, reason: "invalid" });
  }

  if (isReservedUsername(username)) {
    return res.json({ available: false, reason: "reserved" });
  }

  const taken = await User.exists({ username });
  res.json({ available: !taken, reason: taken ? "taken" : undefined });
});

// Create the profile on first sign-in. Safe to call on every sign-in.
router.post("/me", verifyToken, async (req, res) => {
  const { uid, email, name, picture } = req.firebaseUser;

  const existing = await User.findOne({ firebaseUid: uid });
  if (existing) {
    return res.json(existing);
  }

  const username = req.body.username
    ? req.body.username.toLowerCase()
    : await generateUsername(email);

  try {
    const user = await User.create({
      firebaseUid: uid,
      email,
      username,
      displayName: req.body.displayName || name || username,
      avatarUrl: picture || "",
    });

    res.status(201).json(user);
  } catch (error) {
    // Another request created this profile at the same moment
    if (error.code === 11000 && error.keyValue?.firebaseUid) {
      return res.json(await User.findOne({ firebaseUid: uid }));
    }
    throw error;
  }
});

router.get("/me", verifyToken, requireProfile, (req, res) => {
  res.json(req.user);
});

router.patch("/me", verifyToken, requireProfile, async (req, res) => {
  for (const field of EDITABLE_FIELDS) {
    if (req.body[field] !== undefined) {
      req.user[field] = req.body[field];
    }
  }

  if (req.body.appearance) {
    for (const field of APPEARANCE_FIELDS) {
      if (req.body.appearance[field] !== undefined) {
        req.user.appearance[field] = req.body.appearance[field];
      }
    }
  }

  await req.user.save();
  res.json(req.user);
});

// Upload a profile picture: send the image bytes as the body with its Content-Type
router.put(
  "/me/avatar",
  verifyToken,
  requireProfile,
  express.raw({ type: AVATAR_TYPES, limit: MAX_AVATAR_BYTES }),
  async (req, res) => {
    if (!Buffer.isBuffer(req.body) || !req.body.length) {
      return res.status(400).json({ message: "Please upload a JPEG, PNG or WebP image" });
    }

    await Avatar.findOneAndUpdate(
      { user: req.user._id },
      { data: req.body, contentType: req.get("content-type") },
      { upsert: true }
    );

    // The version query string makes browsers fetch the new picture instead of a cached one
    req.user.avatarUrl = `${req.protocol}://${req.get("host")}/api/public/avatars/${req.user._id}?v=${Date.now()}`;
    await req.user.save();

    res.json(req.user);
  }
);

router.delete("/me/avatar", verifyToken, requireProfile, async (req, res) => {
  await Avatar.deleteOne({ user: req.user._id });

  req.user.avatarUrl = "";
  await req.user.save();

  res.json(req.user);
});

// Deletes the Tied profile and all its data (the Firebase account is removed client-side)
router.delete("/me", verifyToken, requireProfile, async (req, res) => {
  await Promise.all([
    Link.deleteMany({ user: req.user._id }),
    AnalyticsEvent.deleteMany({ user: req.user._id }),
    Avatar.deleteOne({ user: req.user._id }),
    req.user.deleteOne(),
  ]);

  res.status(204).end();
});

module.exports = router;
