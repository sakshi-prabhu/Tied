// Where public profiles live. Set VITE_PUBLIC_URL (e.g. https://tied.app) in production
// so shared links point at the real domain; otherwise the current site is used.
const PUBLIC_URL = (import.meta.env.VITE_PUBLIC_URL || window.location.origin).replace(/\/+$/, "");

export const profileUrl = (username) => `${PUBLIC_URL}/${username}`;

// The link without the protocol, for display: tied.app/alex
export const profileUrlLabel = (username) => profileUrl(username).replace(/^https?:\/\//, "");

// Shown before the username input
export const profileUrlPrefix = () => `${PUBLIC_URL.replace(/^https?:\/\//, "")}/`;

// Same rules as the backend (utils/username.js)
export const USERNAME_PATTERN = /^[a-z0-9_.]{3,30}$/;
