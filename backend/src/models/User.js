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
    // Usernames this user had before. Old profile links keep redirecting to
    // the current username, so no one else can take these.
    previousUsernames: {
      type: [String],
      default: [],
      index: true,
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

// Is this username in use (now or as an old link) by anyone other than exceptUserId?
userSchema.statics.isUsernameTaken = function (username, exceptUserId) {
  const filter = { $or: [{ username }, { previousUsernames: username }] };
  if (exceptUserId) filter._id = { $ne: exceptUserId };
  return this.exists(filter);
};

// Finds a profile by its current username or any username it used before
userSchema.statics.findByAnyUsername = async function (username) {
  const name = username.toLowerCase();
  return (await this.findOne({ username: name })) || this.findOne({ previousUsernames: name });
};

module.exports = mongoose.model("User", userSchema);
