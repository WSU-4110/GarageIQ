import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "../hooks/useAuth.js";
import { getAuthErrorMessage } from "../lib/authErrors.js";
import { auth } from "../lib/firebase.js";

export default function Login() {
  const navigate = useNavigate();
  const { firebaseConfigured, error: authStateError } = useAuth();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!auth || !firebaseConfigured) {
      setError("Firebase is not configured. Follow the setup steps in frontend/README.md.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      await signInWithEmailAndPassword(
        auth,
        String(formData.get("email")).trim(),
        String(formData.get("password")),
      );
      navigate("/dashboard", { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReset() {
    const email = document.querySelector('input[name="email"]')?.value.trim();
    setError("");
    if (!email) { setError("Enter your email address above first."); return; }
    if (!auth || !firebaseConfigured) { setError("Firebase is not configured."); return; }
    try { await sendPasswordResetEmail(auth, email); setResetMessage("Password reset email sent."); }
    catch (resetError) { setError(getAuthErrorMessage(resetError)); }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">Welcome back</p>
        <h1>Sign in to your garage</h1>
        <label>Email<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required /></label>
        <label>Password<input name="password" type="password" placeholder="Enter your password" autoComplete="current-password" required /></label>
        <button className="reset-password-link" type="button" onClick={handleReset}>Reset password</button>
        {resetMessage && <p className="form-message success-message" role="status">{resetMessage}</p>}
        {!firebaseConfigured && <p className="form-message error-message" role="alert">Firebase is not configured. Copy frontend/.env.example to frontend/.env.local, add your Firebase Web app settings, then restart Vite.</p>}
        {(error || authStateError) && <p className="form-message error-message" role="alert">{error || authStateError}</p>}
        <button className="primary-button auth-submit" type="submit" disabled={submitting || !firebaseConfigured}>
          {submitting ? "Signing in..." : "Sign in"}
        </button>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
        <p className="auth-note">Sign in with your GarageIQ account to access your private vehicle profile.</p>
      </form>
    </div>
  );
}
