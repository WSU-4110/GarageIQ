const authErrorMessages = {
  "auth/account-exists-with-different-credential":
    "An account already exists for this email using a different sign-in method. Sign in with your email and password instead.",
  "auth/email-already-in-use": "An account already exists for this email.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/network-request-failed": "Unable to reach Firebase. Check your connection and try again.",
  "auth/operation-not-allowed": "This sign-in method is not enabled in Firebase.",
  "auth/password-does-not-meet-requirements":
    "Password must be at least 8 characters and include letters and numbers.",
  "auth/popup-blocked": "Your browser blocked the Google sign-in popup. Allow popups for this site and try again.",
  "auth/too-many-requests": "There have been too many attempts. Try again later.",
  "auth/unauthorized-domain":
    "This domain is not authorized for Google sign-in. Add it under Firebase Authentication → Settings → Authorized domains.",
  "auth/weak-password": "Password must be at least 8 characters and include letters and numbers.",
};

// Errors caused by the user simply closing/cancelling the Google popup; not worth showing.
const silentCodes = new Set(["auth/popup-closed-by-user", "auth/cancelled-popup-request"]);

export function isSilentAuthError(error) {
  return silentCodes.has(error?.code);
}

export function getAuthErrorMessage(error) {
  return authErrorMessages[error?.code] || error?.message || "Authentication failed.";
}
