import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    navigate("/dashboard");
  }
  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">Welcome back</p>
        <h1>Sign in to your garage</h1>
        <label>Email<input type="email" placeholder="you@example.com" required /></label>
        <label>Password<input type="password" placeholder="Enter your password" required /></label>
        <button className="primary-button auth-submit" type="submit">Sign in</button>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Create one</Link></p>
        <p className="auth-note">Demo interface only — sign-in is not connected to a backend yet.</p>
      </form>
    </div>
  );
}
