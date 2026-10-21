import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { sendEmailVerification, signOut } from "firebase/auth";
import useAuth from "../hooks/useAuth.js";
import { auth } from "../lib/firebase.js";
import { getAuthErrorMessage } from "../lib/authErrors.js";

const RESEND_COOLDOWN_SECONDS = 60;

export default function VerifyEmail() {
  const navigate = useNavigate();
  const { user, loading, refreshUser } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  if (loading) {
    return (
      <div className="auth-page">
        <p role="status">Checking your sign-in status...</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.emailVerified) {
    return <Navigate to="/dashboard" replace />;
  }

  async function handleResend() {
    setError("");
    setMessage("");
    try {
      await sendEmailVerification(user);
      setMessage("Verification email sent. Check your inbox (and spam folder).");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (resendError) {
      setError(getAuthErrorMessage(resendError));
    }
  }

  async function handleCheck() {
    setError("");
    setMessage("");
    setChecking(true);
    try {
      const verified = await refreshUser();
      if (verified) {
        navigate("/dashboard", { replace: true });
      } else {
        setError("Your email isn't verified yet. Click the link in the email we sent, then try again.");
      }
    } catch (checkError) {
      setError(getAuthErrorMessage(checkError));
    } finally {
      setChecking(false);
    }
  }

  async function handleSignOut() {
    await signOut(auth);
    navigate("/login", { replace: true });
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">One more step</p>
        <h1>Verify your email</h1>
        <p className="auth-note" style={{ marginTop: 0 }}>
          We sent a verification link to <strong>{user.email}</strong>. Open it to activate your
          account, then come back and continue.
        </p>
        {message && <p className="form-message success-message" role="status">{message}</p>}
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        <button className="primary-button auth-submit" type="button" onClick={handleCheck} disabled={checking}>
          {checking ? "Checking..." : "I've verified my email"}
        </button>
        <button className="secondary-auth-button" type="button" onClick={handleResend} disabled={cooldown > 0}>
          {cooldown > 0 ? `Resend email (${cooldown}s)` : "Resend verification email"}
        </button>
        <p className="auth-switch">
          Wrong account? <button className="link-button" type="button" onClick={handleSignOut}>Sign out</button>
        </p>
      </div>
    </div>
  );
}
