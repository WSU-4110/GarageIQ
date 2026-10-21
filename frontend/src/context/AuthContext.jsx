import { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseConfigured } from "../lib/firebase.js";
import AuthContext from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(auth));
  const [error, setError] = useState("");
  // Firebase mutates the same User object when emailVerified changes, so we bump
  // this counter after a reload to make consumers re-render with the new value.
  const [, setVersion] = useState(0);

  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    return onAuthStateChanged(
      auth,
      (authenticatedUser) => {
        setUser(authenticatedUser);
        setError("");
        setLoading(false);
      },
      (authError) => {
        setError(`Unable to check your sign-in status: ${authError.message}`);
        setLoading(false);
      },
    );
  }, []);

  // Re-fetches the user from Firebase (picks up emailVerified) and returns the fresh flag.
  const refreshUser = useCallback(async () => {
    if (!auth?.currentUser) {
      return false;
    }
    await auth.currentUser.reload();
    // Refresh the ID token too, so the email_verified claim is current for Firestore rules.
    await auth.currentUser.getIdToken(true);
    setVersion((v) => v + 1);
    return auth.currentUser.emailVerified;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, firebaseConfigured, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}
