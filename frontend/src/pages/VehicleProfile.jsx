import { Link } from "react-router-dom";

export default function VehicleProfile() {
  return (
    <div className="auth-page">
      <section className="auth-card">
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">My garage</p>
        <h1>Vehicle profile</h1>
        <p className="vehicle-intro">Your vehicle details and maintenance records will appear here as the feature is built.</p>
        <Link className="primary-button auth-submit" to="/dashboard">Back to dashboard</Link>
      </section>
    </div>
  );
}
