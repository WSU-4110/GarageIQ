import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firebaseConfigured } from "../lib/firebase.js";
import AuthContext from "./authContext.js";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(auth));
  const [error, setError] = useState("");

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

  return (
    <AuthContext.Provider value={{ user, loading, error, firebaseConfigured }}>
      {children}
    </AuthContext.Provider>
  );
}
