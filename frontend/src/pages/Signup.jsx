import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth.js";
import { getAuthErrorMessage } from "../lib/authErrors.js";
import { auth, db } from "../lib/firebase.js";

// Password policy (signup only): 8+ characters, with at least one letter and one number.
const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (p) => p.length >= 8 },
  { id: "letter", label: "At least one letter (A-Z)", test: (p) => /[A-Za-z]/.test(p) },
  { id: "number", label: "At least one number (0-9)", test: (p) => /\d/.test(p) },
];

const styles = {
  checklist: { listStyle: "none", margin: "-4px 0 6px", padding: 0, display: "grid", gap: 4, fontSize: 11 },
  divider: { display: "flex", alignItems: "center", gap: 12, margin: "18px 0 4px", color: "#85888b", fontSize: 11, textTransform: "uppercase", letterSpacing: ".08em" },
  dividerLine: { flex: 1, height: 1, background: "#deded8" },
  secondaryButton: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginTop: 10, padding: "11px 12px", color: "#191a1b", background: "white", border: "1px solid #d8d8d3", borderRadius: 6, fontSize: 13, fontWeight: 700 },
};

const googleErrorMessages = {
  "auth/account-exists-with-different-credential": "An account already exists for this email using a different sign-in method. Sign in with your email and password instead.",
  "auth/popup-blocked": "Your browser blocked the Google sign-in popup. Allow popups for this site and try again.",
  "auth/unauthorized-domain": "This domain is not authorized for Google sign-in. Add it under Firebase Authentication > Settings > Authorized domains.",
};
const silentGoogleCodes = ["auth/popup-closed-by-user", "auth/cancelled-popup-request"];

export default function Signup() {
  const navigate = useNavigate();
  const { user, firebaseConfigured, error: authStateError } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  // Set after email/password signup: shows the "check your email" step instead of redirecting.
  const [verifyEmail, setVerifyEmail] = useState("");
  const [verifyMessage, setVerifyMessage] = useState("");

  if (user && !submitting && !error && !authStateError && !verifyEmail) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!auth || !db || !firebaseConfigured) {
      setError("Firebase is not configured. Follow the setup steps in frontend/README.md.");
      return;
    }

    const failedRules = PASSWORD_RULES.filter((rule) => !rule.test(password));
    if (failedRules.length > 0) {
      setError(`Password must meet all requirements: ${failedRules.map((rule) => rule.label.toLowerCase()).join("; ")}.`);
      return;
    }

    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();

    try {
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", credential.user.uid), {
        name,
        email: credential.user.email,
        Car: "",
        LastOilChange: null,
        LastTireRotation: null,
        LastTransmissionService: null,
        Modifications: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      try {
        await sendEmailVerification(credential.user);
      } catch {
        // Non-fatal: the verification step below has a resend button.
      }
      setVerifyEmail(credential.user.email);
    } catch (signupError) {
      setError(signupError?.code?.startsWith("auth/")
        ? getAuthErrorMessage(signupError)
        : `Your account was created, but your profile could not be saved: ${signupError.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleGoogle() {
    setError("");
    if (!auth || !db || !firebaseConfigured) {
      setError("Firebase is not configured. Follow the setup steps in frontend/README.md.");
      return;
    }

    setSubmitting(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      const { user: googleUser } = await signInWithPopup(auth, provider);

      // Create the GarageIQ profile on first Google sign-in; never overwrite an existing one.
      const profileRef = doc(db, "users", googleUser.uid);
      const existing = await getDoc(profileRef);
      if (!existing.exists()) {
        await setDoc(profileRef, {
          name: (googleUser.displayName || "").trim(),
          email: googleUser.email,
          Car: "",
          LastOilChange: null,
          LastTireRotation: null,
          LastTransmissionService: null,
          Modifications: [],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      navigate("/dashboard", { replace: true });
    } catch (googleError) {
      if (!silentGoogleCodes.includes(googleError?.code)) {
        setError(googleErrorMessages[googleError?.code] || getAuthErrorMessage(googleError));
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setError("");
    setVerifyMessage("");
    try {
      await sendEmailVerification(auth.currentUser);
      setVerifyMessage("Verification email sent. Check your inbox (and spam folder).");
    } catch (resendError) {
      setError(getAuthErrorMessage(resendError));
    }
  }

  async function handleCheckVerified() {
    setError("");
    setVerifyMessage("");
    try {
      await auth.currentUser.reload();
      if (auth.currentUser.emailVerified) {
        navigate("/dashboard", { replace: true });
      } else {
        setError("Your email isn't verified yet. Click the link in the email we sent, then try again.");
      }
    } catch (checkError) {
      setError(getAuthErrorMessage(checkError));
    }
  }

  if (verifyEmail) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
          <p className="eyebrow orange">One more step</p>
          <h1>Verify your email</h1>
          <p className="auth-note" style={{ marginTop: 0 }}>
            We sent a verification link to <strong>{verifyEmail}</strong>. Open it to verify your
            address, then come back and continue.
          </p>
          {verifyMessage && <p className="form-message success-message" role="status">{verifyMessage}</p>}
          {error && <p className="form-message error-message" role="alert">{error}</p>}
          <button className="primary-button auth-submit" type="button" onClick={handleCheckVerified}>
            I&rsquo;ve verified my email
          </button>
          <button style={styles.secondaryButton} type="button" onClick={handleResend}>
            Resend verification email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">Get started</p>
        <h1>Create your account</h1>
        <label>Full name<input name="name" type="text" placeholder="Your name" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
        <label>Password<input name="password" type="password" placeholder="Create a password" autoComplete="new-password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
        <ul style={styles.checklist} aria-label="Password requirements">
          {PASSWORD_RULES.map((rule) => {
            const met = rule.test(password);
            return (
              <li key={rule.id} style={{ color: met ? "#3f704c" : "#85888b", fontWeight: met ? 700 : 400 }}>
                {met ? "✓" : "○"} {rule.label}
              </li>
            );
          })}
        </ul>
        {!firebaseConfigured && <p className="form-message error-message" role="alert">Firebase is not configured. Copy frontend/.env.example to frontend/.env.local, add your Firebase Web app settings, then restart Vite.</p>}
        {(error || authStateError) && <p className="form-message error-message" role="alert">{error || authStateError}</p>}
        <button className="primary-button auth-submit" type="submit" disabled={submitting || !firebaseConfigured}>
          {submitting ? "Creating account..." : "Create account"}
        </button>
        <div style={styles.divider}><span style={styles.dividerLine} />or<span style={styles.dividerLine} /></div>
        <button style={styles.secondaryButton} type="button" onClick={handleGoogle} disabled={submitting || !firebaseConfigured}>
          Continue with Google
        </button>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="auth-note">A private GarageIQ profile will be created for your account. We&rsquo;ll email you a link to verify your address.</p>
      </form>
    </div>
  );
}
