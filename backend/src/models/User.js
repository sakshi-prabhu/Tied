const mongoose = require("mongoose");
const { isReservedUsername } = require("../utils/username");

const userSchema = new mongoose.Schema(
  {
    // Firebase Auth UID — links this profile to the signed-in Firebase user
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    // Public handle used in the profile URL: tied.app/<username>
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
      match: [/^[a-z0-9_.]+$/, "Username can only contain letters, numbers, _ and ."],
      validate: {
        validator: (value) => !isReservedUsername(value),
        message: "That username is reserved. Please choose another one.",
      },
    },
    displayName: {
      type: String,
      trim: true,
      maxlength: 50,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 160,
      default: "",
    },
    avatarUrl: {
      type: String,
      default: "",
    },
    appearance: {
      theme: {
        type: String,
        enum: ["light", "dark", "custom"],
        default: "light",
      },
      buttonStyle: {
        type: String,
        enum: ["rounded", "soft", "square"],
        default: "rounded",
      },
      // Only used when theme is "custom"
      backgroundColor: { type: String, default: "#ffffff" },
      buttonColor: { type: String, default: "#0f172a" },
      textColor: { type: String, default: "#ffffff" },
    },
    profileViews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
