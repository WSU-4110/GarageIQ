const authErrorMessages = {
  "auth/email-already-in-use": "An account already exists for this email.",
  "auth/invalid-credential": "The email or password is incorrect.",
  "auth/invalid-email": "Enter a valid email address.",
  "auth/network-request-failed": "Unable to reach Firebase. Check your connection and try again.",
  "auth/operation-not-allowed": "Email and password sign-in is not enabled in Firebase.",
  "auth/too-many-requests": "There have been too many attempts. Try again later.",
  "auth/weak-password": "Choose a stronger password.",
};

export function getAuthErrorMessage(error) {
  return authErrorMessages[error?.code] || error?.message || "Authentication failed.";
}
