const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const testRoutes = require("./routes/testRoutes");
const userRoutes = require("./routes/userRoutes");
const linkRoutes = require("./routes/linkRoutes");
const publicRoutes = require("./routes/publicRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");

connectDB();

// Behind a host/proxy (Render, Railway, nginx...) req.ip is only the real visitor IP
// if Express trusts X-Forwarded-For. Analytics deduplication depends on it.
if (process.env.TRUST_PROXY) {
  app.set("trust proxy", Number(process.env.TRUST_PROXY) || process.env.TRUST_PROXY);
}

app.use(cors());
app.use(express.json());

app.use("/api/test", testRoutes);
app.use("/api/users", userRoutes);
app.use("/api/links", linkRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/analytics", analyticsRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Tied API is running 🚀",
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
