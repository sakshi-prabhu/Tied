// Turns Firebase auth error codes into messages users can understand
const messages = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/missing-password": "Please enter your password.",
  "auth/invalid-credential": "Incorrect email or password.",
  "auth/wrong-password": "Incorrect email or password.",
  "auth/user-not-found": "No account found with this email.",
  "auth/user-disabled": "This account has been disabled.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password must be at least 6 characters.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection.",
  "auth/popup-blocked": "Popup was blocked. Please allow popups and try again.",
  "auth/user-mismatch": "That Google account is different from the one you signed in with.",
};

export const getAuthErrorMessage = (error) =>
  messages[error?.code] || "Something went wrong. Please try again.";

// Closing the Google popup is not an error worth showing
export const isPopupClosed = (error) =>
  error?.code === "auth/popup-closed-by-user" ||
  error?.code === "auth/cancelled-popup-request";
