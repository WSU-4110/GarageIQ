import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useUserProfile from "../hooks/useUserProfile.js";
import { dateFromInputValue, toDateInputValue } from "../lib/profileDates.js";
import { saveUserProfile } from "../lib/userProfile.js";

function profileToForm(profile) {
  return {
    name: profile?.name || "",
    Car: profile?.Car || "",
    LastOilChange: toDateInputValue(profile?.LastOilChange),
    LastTireRotation: toDateInputValue(profile?.LastTireRotation),
    LastTransmissionService: toDateInputValue(profile?.LastTransmissionService),
    Modifications: Array.isArray(profile?.Modifications)
      ? profile.Modifications.join("\n")
      : typeof profile?.Modifications === "string"
        ? profile.Modifications
        : "",
  };
}

export default function VehicleProfile() {
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saved, setSaved] = useState(false);

  const form = draft?.profile === profile ? draft.values : profileToForm(profile);

  function updateField(event) {
    const { name, value } = event.target;
    setDraft({ profile, values: { ...form, [name]: value } });
    setSaved(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setSaveError("");
    setSaved(false);

    try {
      await saveUserProfile(user.uid, {
        name: form.name.trim(),
        email: user.email || "",
        Car: form.Car.trim(),
        LastOilChange: dateFromInputValue(form.LastOilChange),
        LastTireRotation: dateFromInputValue(form.LastTireRotation),
        LastTransmissionService: dateFromInputValue(form.LastTransmissionService),
        Modifications: form.Modifications
          .split(/\r?\n/)
          .map((modification) => modification.trim())
          .filter(Boolean),
      });
      setSaved(true);
    } catch (profileError) {
      setSaveError(`Your changes could not be saved: ${profileError.message}`);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <div className="auth-page"><p role="status">Loading your vehicle profile...</p></div>;
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">My garage</p>
        <h1>Vehicle profile</h1>
        <p className="vehicle-intro">Profile changes are saved to your private GarageIQ account.</p>
        {error && <p className="form-message error-message" role="alert">{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>Full name<input name="name" type="text" autoComplete="name" value={form.name} onChange={updateField} required /></label>
          <label>Vehicle<input name="Car" type="text" placeholder="Year, make, and model" value={form.Car} onChange={updateField} /></label>
          <p className="profile-section-label">Last service dates</p>
          <label>Oil change<input name="LastOilChange" type="date" value={form.LastOilChange} onChange={updateField} /></label>
          <label>Tire rotation<input name="LastTireRotation" type="date" value={form.LastTireRotation} onChange={updateField} /></label>
          <label>Transmission service<input name="LastTransmissionService" type="date" value={form.LastTransmissionService} onChange={updateField} /></label>
          <label>
            Modifications
            <textarea
              name="Modifications"
              placeholder={"One modification per line"}
              rows="4"
              value={form.Modifications}
              onChange={updateField}
            />
          </label>
          {saveError && <p className="form-message error-message" role="alert">{saveError}</p>}
          {saved && <p className="form-message success-message" role="status">Your profile was saved.</p>}
          <button className="primary-button auth-submit" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save vehicle profile"}
          </button>
        </form>
        <p className="auth-switch"><Link to="/dashboard">Back to dashboard</Link></p>
      </section>
    </div>
  );
}
