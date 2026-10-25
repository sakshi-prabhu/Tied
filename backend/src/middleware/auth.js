const admin = require("../config/firebase");
const { User } = require("../models");

// Verifies the Firebase ID token sent as "Authorization: Bearer <token>"
const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: "Missing auth token" });
  }

  try {
    req.firebaseUser = await admin.auth().verifyIdToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired auth token" });
  }
};

// Loads the Tied profile for the signed-in user into req.user
const requireProfile = async (req, res, next) => {
  const user = await User.findOne({ firebaseUid: req.firebaseUser.uid });

  if (!user) {
    return res.status(404).json({ message: "Profile not found" });
  }

  req.user = user;
  next();
};

module.exports = { verifyToken, requireProfile };
