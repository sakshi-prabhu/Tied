const crypto = require("crypto");
const { AnalyticsEvent } = require("../models");
const { detectSource } = require("./source");

// Crawlers, link-preview fetchers and scripted HTTP clients. WhatsApp's preview fetcher
// starts with "WhatsApp/" and Telegram's is "TelegramBot"; real visitors from Telegram's
// in-app browser also mention Telegram, so it must not be matched on its own.
const BOT_UA =
  /bot|crawl|spider|slurp|preview|facebookexternalhit|embedly|^whatsapp|curl|wget|python|axios|node-fetch|go-http|java\/|okhttp|headless|phantom|puppeteer|playwright|selenium|lighthouse/i;

// More unique events than this from one IP in the window is treated as automated
const FLOOD_WINDOW_MS = 10 * 60 * 1000;
const FLOOD_LIMIT = 30;

const isBot = (userAgent) => !userAgent || BOT_UA.test(userAgent);

const hash = (value) =>
  crypto
    .createHmac("sha256", process.env.ANALYTICS_SECRET || "tied")
    .update(value)
    .digest("hex")
    .slice(0, 32);

// Records a view or click if it comes from a real visitor we haven't counted today.
// Returns true when the event was counted, so the caller can bump its running total.
const recordEvent = async (req, { user, link, type }) => {
  const userAgent = req.get("user-agent") || "";
  if (isBot(userAgent)) return false;

  const ip = req.ip || "";
  const ipHash = hash(ip);

  const recent = await AnalyticsEvent.countDocuments({
    ipHash,
    createdAt: { $gte: new Date(Date.now() - FLOOD_WINDOW_MS) },
  });
  if (recent >= FLOOD_LIMIT) return false;

  const visitor = hash(`${ip}|${userAgent}`);
  const day = new Date().toISOString().slice(0, 10);

  try {
    await AnalyticsEvent.create({
      user,
      link,
      type,
      referrer: req.body?.referrer || "",
      source: detectSource({ ref: req.body?.ref, userAgent, referrer: req.body?.referrer }),
      visitor,
      ipHash,
      dedupeKey: `${type}:${link || user}:${visitor}:${day}`,
    });
    return true;
  } catch (err) {
    // Same visitor already counted today (also covers double-clicks racing each other)
    if (err.code === 11000) return false;
    throw err;
  }
};

module.exports = { recordEvent };
