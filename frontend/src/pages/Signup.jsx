import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">Get started</p>
        <h1>Create your account</h1>
        <label>Full name<input type="text" placeholder="Your name" required /></label>
        <label>Email<input type="email" placeholder="you@example.com" required /></label>
        <label>Password<input type="password" placeholder="Create a password" minLength="6" required /></label>
        <button className="primary-button auth-submit" type="submit">Create account</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
        <p className="auth-note">Demo interface only — account creation is not connected to a backend yet.</p>
      </form>
    </div>
  );
}
