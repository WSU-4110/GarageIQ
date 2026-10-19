import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useUserProfile from "../hooks/useUserProfile.js";
import { saveUserProfile } from "../lib/userProfile.js";
import { deleteField } from "firebase/firestore";

const makes = ["Acura", "Audi", "BMW", "Chevrolet", "Ford", "Honda", "Hyundai", "Lexus", "Mazda", "Mercedes-Benz", "Nissan", "Subaru", "Tesla", "Toyota", "Volkswagen", "Other"];
const emptyVehicle = () => ({ Nickname: "", Year: "", Make: "", Model: "", Trim: "", Mileage: "" });
function fromProfile(profile) {
  if (Array.isArray(profile?.Vehicles) && profile.Vehicles.length) return profile.Vehicles;
  return [{ ...emptyVehicle(), Nickname: profile?.Nickname || "", Car: profile?.Car || "", Mileage: profile?.Mileage || "" }];
}

export default function VehicleProfile() {
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const [vehicles, setVehicles] = useState([]);
  const [selected, setSelected] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => { if (!loading) { setVehicles(fromProfile(profile)); setSelected(0); } }, [profile, loading]);
  const vehicle = vehicles[selected] || emptyVehicle();
  function update(key, value) { setVehicles(vehicles.map((item, i) => i === selected ? { ...item, [key]: value } : item)); setMessage(""); }
  async function save() {
    setSaving(true); setMessage("");
    try {
      const current = vehicles[selected];
      const carLabel = [current.Year, current.Make, current.Model, current.Trim].filter(Boolean).join(" ") || current.Car || "";
      await saveUserProfile(user.uid, { ...profile, Vehicles: vehicles, Nickname: current.Nickname, Year: current.Year, Make: current.Make, Model: current.Model, Trim: current.Trim, Mileage: current.Mileage, Car: carLabel, ActiveVehicleIndex: selected });
      setMessage("Vehicle profile saved.");
    } catch (e) { setMessage(`Could not save: ${e.message}`); } finally { setSaving(false); }
  }
  async function remove() {
    const remaining = vehicles.filter((_, i) => i !== selected);
    const next = Math.min(selected, Math.max(remaining.length - 1, 0));
    setVehicles(remaining); setSelected(next);
    try { await saveUserProfile(user.uid, { ...profile, Vehicles: remaining, ActiveVehicleIndex: next, ...(remaining.length ? {} : { Car: deleteField(), Nickname: deleteField(), Year: deleteField(), Make: deleteField(), Model: deleteField(), Trim: deleteField(), Mileage: deleteField() }) }); setMessage("Vehicle removed."); } catch (e) { setMessage(`Could not remove vehicle: ${e.message}`); }
  }
  if (loading) return <div className="auth-page"><p role="status">Loading your vehicle profile...</p></div>;
  const currentYear = new Date().getFullYear();
  return <div className="app-shell"><aside className="sidebar"><Link className="brand" to="/dashboard"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></Link><nav><p className="eyebrow">Workspace</p><Link className="nav-item" to="/dashboard">▦ <span>Overview</span></Link><Link className="nav-item active" to="/vehicle">▱ <span>My garage</span></Link><Link className="nav-item" to="/modifications">ϟ <span>Modifications</span></Link><Link className="nav-item" to="/maintenance">▣ <span>Maintenance</span></Link></nav></aside><main className="garage-page"><header className="garage-page-header"><div><p className="eyebrow orange">My garage</p><h1>Vehicle profile</h1><p>Manage vehicle details, mileage, and your garage.</p></div><Link className="secondary-button" to="/dashboard">← Back to overview</Link></header>
    {error && <p className="form-message error-message" role="alert">{error}</p>}
    <section className="garage-panel garage-profile-layout"><div className="vehicle-photo-placeholder">🚘<span>Vehicle profile</span></div><div className="vehicle-fields"><label>Vehicle nickname<input value={vehicle.Nickname || ""} onChange={(e) => update("Nickname", e.target.value)} placeholder="e.g. Daily Driver"/></label><div className="vehicle-select-grid"><label>Year<select value={vehicle.Year || ""} onChange={(e) => update("Year", e.target.value)}><option value="">Select year</option>{Array.from({length: 45}, (_, i) => String(currentYear + 1 - i)).map((year) => <option key={year}>{year}</option>)}</select></label><label>Make<select value={vehicle.Make || ""} onChange={(e) => update("Make", e.target.value)}><option value="">Select make</option>{makes.map((make) => <option key={make}>{make}</option>)}</select></label><label>Model<input value={vehicle.Model || ""} onChange={(e) => update("Model", e.target.value)} placeholder="Model"/></label></div><label>Trim <span className="field-hint">(optional)</span><input value={vehicle.Trim || ""} onChange={(e) => update("Trim", e.target.value)} placeholder="Trim"/></label><label>Current mileage <span className="field-hint">(optional)</span><input type="number" min="0" value={vehicle.Mileage || ""} onChange={(e) => update("Mileage", e.target.value)} placeholder="Miles"/></label><div className="recommendation-note">✓ Vehicle tracking is available for all vehicles. Recommendation support may vary by vehicle.</div></div></section>
    <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Your vehicles ({vehicles.length})</p><h2>Garage</h2></div><button className="secondary-button" onClick={() => { setVehicles([...vehicles, emptyVehicle()]); setSelected(vehicles.length); setMessage(""); }}>＋ Add vehicle</button></div><div className="vehicle-list">{vehicles.map((item, i) => <button className={i === selected ? "vehicle-list-item selected" : "vehicle-list-item"} key={i} onClick={() => setSelected(i)}><span className="vehicle-thumb">🚘</span><span><strong>{item.Nickname || item.Car || "New vehicle"}</strong><small>{[item.Year, item.Make, item.Model, item.Trim].filter(Boolean).join(" ") || "Details not set"}</small></span><span>›</span></button>)}</div></section>
    <div className="garage-actions profile-actions"><button className="primary-button" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save vehicle profile"}</button><button className="secondary-button" onClick={() => { setVehicles([...vehicles, emptyVehicle()]); setSelected(vehicles.length); }}>＋ Save another vehicle</button><button className="delete-button" onClick={remove}>Delete vehicle</button></div>{message && <p className="form-message" role="status">{message}</p>}
  </main></div>;
}
