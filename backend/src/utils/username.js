// A username is the public profile link (tied.app/<username>), so it can't
// be one of the app's own pages or files — those would hide the profile.
const RESERVED_USERNAMES = new Set([
  "signin", "signup", "login", "logout", "register", "dashboard", "settings",
  "api", "admin", "app", "help", "support", "about", "terms", "privacy",
  "static", "assets", "public", "www", "tied",
  "favicon.svg", "favicon.ico", "icons.svg", "robots.txt", "sitemap.xml", "index.html",
]);

const USERNAME_PATTERN = /^[a-z0-9_.]{3,30}$/;

const isReservedUsername = (username) => RESERVED_USERNAMES.has(username.toLowerCase());

module.exports = { USERNAME_PATTERN, isReservedUsername };
