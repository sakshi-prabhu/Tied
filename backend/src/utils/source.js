// Works out where a profile visitor came from, for the "Traffic Sources" card.
// Checked in order of reliability:
//   1. ?ref= / ?utm_source= on the shared link (the only way to spot WhatsApp, SMS, QR codes...)
//   2. The app's name in the user agent (in-app browsers of Instagram, TikTok, Facebook...)
//   3. The referring website, with each site's link-shortener domains merged into one name
//   4. "Direct" when none of these say anything

// Short ref codes (as used by the dashboard's share buttons) -> display name
const REF_NAMES = {
  whatsapp: "WhatsApp",
  wa: "WhatsApp",
  instagram: "Instagram",
  ig: "Instagram",
  facebook: "Facebook",
  fb: "Facebook",
  messenger: "Messenger",
  x: "X",
  twitter: "X",
  linkedin: "LinkedIn",
  telegram: "Telegram",
  tiktok: "TikTok",
  snapchat: "Snapchat",
  youtube: "YouTube",
  threads: "Threads",
  reddit: "Reddit",
  discord: "Discord",
  pinterest: "Pinterest",
  email: "Email",
  sms: "SMS",
  qr: "QR code",
};

// In-app browsers that add their name to the user agent
const APP_USER_AGENTS = [
  [/Instagram/i, "Instagram"],
  [/Barcelona/i, "Threads"],
  [/FBAN|FBAV|FB_IAB|FBIOS/i, "Facebook"],
  [/musical_ly|BytedanceWebview|TikTok/i, "TikTok"],
  [/Snapchat/i, "Snapchat"],
  [/LinkedInApp/i, "LinkedIn"],
  [/Pinterest/i, "Pinterest"],
  [/Telegram/i, "Telegram"],
  [/\bLine\//, "Line"],
  [/Twitter/i, "X"],
];

// Referring domains (and their subdomains) -> display name
const SITE_NAMES = {
  "instagram.com": "Instagram",
  "threads.net": "Threads",
  "facebook.com": "Facebook",
  "fb.com": "Facebook",
  "messenger.com": "Messenger",
  "t.co": "X",
  "twitter.com": "X",
  "x.com": "X",
  "linkedin.com": "LinkedIn",
  "lnkd.in": "LinkedIn",
  "youtube.com": "YouTube",
  "youtu.be": "YouTube",
  "tiktok.com": "TikTok",
  "snapchat.com": "Snapchat",
  "pinterest.com": "Pinterest",
  "reddit.com": "Reddit",
  "discord.com": "Discord",
  "t.me": "Telegram",
  "web.telegram.org": "Telegram",
  "web.whatsapp.com": "WhatsApp",
  "wa.me": "WhatsApp",
  "mail.google.com": "Email",
  "outlook.live.com": "Email",
};

const fromRef = (ref) => {
  const code = String(ref || "").trim().toLowerCase();
  if (!/^[a-z0-9_.-]{1,30}$/.test(code)) return null;
  return REF_NAMES[code] || code;
};

const fromUserAgent = (userAgent) =>
  APP_USER_AGENTS.find(([pattern]) => pattern.test(userAgent || ""))?.[1] || null;

// "https://l.instagram.com/?u=..." -> "Instagram", "https://www.example.com/" -> "example.com"
const fromReferrer = (referrer) => {
  let host;
  try {
    host = new URL(referrer).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }

  // Google, Bing, etc. use country domains: google.co.in, google.de...
  if (/(^|\.)google\.[a-z.]+$/.test(host)) return "Google";
  if (/(^|\.)bing\.com$/.test(host)) return "Bing";

  const match = Object.keys(SITE_NAMES).find((domain) => host === domain || host.endsWith(`.${domain}`));
  return match ? SITE_NAMES[match] : host;
};

const detectSource = ({ ref, userAgent, referrer }) =>
  fromRef(ref) || fromUserAgent(userAgent) || fromReferrer(referrer) || "Direct";

module.exports = { detectSource, fromReferrer };
