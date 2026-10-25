const mongoose = require("mongoose");

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: errors[0], errors });
  }

  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: `Invalid ${err.path}` });
  }

  // Duplicate key, e.g. username already taken
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "value";
    return res.status(409).json({ message: `That ${field} is already taken` });
  }

  // Request body bigger than the route allows (e.g. a huge image)
  if (err.type === "entity.too.large") {
    return res.status(413).json({ message: "That file is too large" });
  }

  console.error(err);
  res.status(500).json({ message: "Something went wrong" });
};

module.exports = errorHandler;
