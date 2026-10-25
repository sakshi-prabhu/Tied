// Site-wide light/dark mode. "system" (the default) follows the device setting.
// User profile pages ignore this and always use the owner's chosen theme.
const STORAGE_KEY = "theme";

const media = window.matchMedia("(prefers-color-scheme: dark)");

export const getThemePreference = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || "system";
  } catch {
    return "system";
  }
};

export const applyTheme = (preference = getThemePreference()) => {
  const dark = preference === "dark" || (preference === "system" && media.matches);
  document.documentElement.classList.toggle("dark", dark);
};

export const setThemePreference = (preference) => {
  try {
    if (preference === "system") localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, preference);
  } catch {
    // Storage blocked (private mode): the choice still applies for this visit
  }
  applyTheme(preference);
};

// Keep "system" in sync when the device switches between light and dark
media.addEventListener("change", () => applyTheme());
