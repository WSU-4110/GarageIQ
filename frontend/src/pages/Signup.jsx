import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import useAuth from "../hooks/useAuth.js";
import { getAuthErrorMessage } from "../lib/authErrors.js";
import { auth, db } from "../lib/firebase.js";
import { validatePassword } from "../lib/passwordValidation.js";
import PasswordChecklist from "../components/PasswordChecklist.jsx";
import GoogleSignInButton from "../components/GoogleSignInButton.jsx";

export default function Signup() {
  const navigate = useNavigate();
  const { user, firebaseConfigured, error: authStateError } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [password, setPassword] = useState("");

  if (user && !submitting && !error && !authStateError) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!auth || !db || !firebaseConfigured) {
      setError("Firebase is not configured. Follow the setup steps in frontend/README.md.");
      return;
    }

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      setError(`Password must meet all requirements: ${passwordCheck.failed.join("; ").toLowerCase()}.`);
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
        // Non-fatal: the verify-email page has a resend button.
      }
      navigate("/verify-email", { replace: true });
    } catch (signupError) {
      setError(signupError?.code?.startsWith("auth/")
        ? getAuthErrorMessage(signupError)
        : `Your account was created, but your profile could not be saved: ${signupError.message}`);
    } finally {
      setSubmitting(false);
    }
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
        <PasswordChecklist password={password} />
        {!firebaseConfigured && <p className="form-message error-message" role="alert">Firebase is not configured. Copy frontend/.env.example to frontend/.env.local, add your Firebase Web app settings, then restart Vite.</p>}
        {(error || authStateError) && <p className="form-message error-message" role="alert">{error || authStateError}</p>}
        <button className="primary-button auth-submit" type="submit" disabled={submitting || !firebaseConfigured}>
          {submitting ? "Creating account..." : "Create account"}
        </button>
        <div className="auth-divider">or</div>
        <GoogleSignInButton
          disabled={submitting}
          onError={setError}
          onSuccess={() => navigate("/dashboard", { replace: true })}
        />
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="auth-note">A private GarageIQ profile will be created for your account. We&rsquo;ll email you a link to verify your address.</p>
      </form>
    </div>
  );
}
