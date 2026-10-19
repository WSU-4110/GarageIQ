import { useMemo, useState } from "react";
import useAuth from "../hooks/useAuth.js";
import useUserProfile from "../hooks/useUserProfile.js";
import { saveUserProfile } from "../lib/userProfile.js";
import { toDateInputValue } from "../lib/profileDates.js";

const categories = ["Exhaust", "Intake", "Suspension", "Wheels", "Brakes", "Tune", "Interior", "Custom"];
const initialMods = (profile) => Array.isArray(profile?.Modifications) ? profile.Modifications.map((item) => typeof item === "string" ? { category: "Custom", title: item, brand: "", status: "Installed", date: "", notes: "" } : ({ category: "Custom", title: "", brand: "", status: "Installed", date: "", notes: "", ...item })) : [];
const initialServices = (profile) => Array.isArray(profile?.Services) ? profile.Services : [
  { name: "Oil change", type: "Maintenance", date: toDateInputValue(profile?.LastOilChange), mileage: "", notes: "" },
  { name: "Tire rotation", type: "Maintenance", date: toDateInputValue(profile?.LastTireRotation), mileage: "", notes: "" },
  { name: "Transmission service", type: "Maintenance", date: toDateInputValue(profile?.LastTransmissionService), mileage: "", notes: "" },
].filter((item) => item.date);

function PageFrame({ title, kicker, subtitle, children }) {
  return <div className="app-shell"><aside className="sidebar"><a className="brand" href="/dashboard"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></a><nav><p className="eyebrow">Workspace</p><a className="nav-item" href="/dashboard">▦ <span>Overview</span></a><a className="nav-item" href="/vehicle">▱ <span>My garage</span></a><a className={`nav-item ${kicker === "Primary build" ? "active" : ""}`} href="/modifications">ϟ <span>Modifications</span></a><a className={`nav-item ${kicker === "Vehicle health" ? "active" : ""}`} href="/maintenance">▣ <span>Maintenance</span></a></nav></aside><main className="garage-page"><header className="garage-page-header"><div><p className="eyebrow orange">{kicker}</p><h1>{title}</h1><p>{subtitle}</p></div><a className="secondary-button" href="/dashboard">← Back to overview</a></header>{children}</main></div>;
}

function VehicleCard({ profile }) {
  const full = [profile?.Year, profile?.Make, profile?.Model, profile?.Trim].filter(Boolean).join(" ");
  return <section className="garage-vehicle-card"><div className="garage-car-art">🚘</div><div><strong>{profile?.Nickname || profile?.Car || "Your vehicle"}</strong><p>{full || profile?.Car || "Add vehicle details in your profile"}</p><small>{profile?.Mileage ? `${Number(profile.Mileage).toLocaleString()} miles` : "Mileage not set"}</small></div><a className="secondary-button" href="/vehicle">Edit vehicle</a></section>;
}

export function ModificationsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const [rows, setRows] = useState(null);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const mods = rows ?? initialMods(profile);
  const filtered = useMemo(() => mods.map((mod, index) => ({ ...mod, _index: index })).filter((mod) => `${mod.title} ${mod.category} ${mod.brand} ${mod.notes}`.toLowerCase().includes(query.toLowerCase())), [mods, query]);
  function update(index, key, value) { setRows(mods.map((row, i) => i === index ? { ...row, [key]: value } : row)); setMessage(""); }
  async function save() { setBusy(true); try { await saveUserProfile(user.uid, { ...profile, Modifications: mods }); setMessage("Build log saved."); } catch (e) { setMessage(`Could not save: ${e.message}`); } finally { setBusy(false); } }
  async function archive() { setBusy(true); try { const history = [...(profile?.BuildHistory || []), { archivedAt: new Date().toISOString(), modifications: mods, label: `Version ${(profile?.BuildHistory?.length || 0) + 1}` }]; await saveUserProfile(user.uid, { ...profile, Modifications: mods, BuildHistory: history }); setMessage("Current build archived."); } catch (e) { setMessage(`Could not archive: ${e.message}`); } finally { setBusy(false); } }
  if (loading) return <div className="auth-page"><p>Loading build log…</p></div>;
  return <PageFrame title="Build log & modifications" kicker="Primary build" subtitle="Organize your modifications, track installation details, and keep a history of your build.">
    {error && <p className="form-message error-message">{error}</p>}<VehicleCard profile={profile}/>
    <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Modification log</p><h2>Your modifications</h2></div><input className="garage-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search modifications…" aria-label="Search modifications"/></div>
      <div className="mod-editor-head"><span>Category</span><span>Modification name</span><span>Brand</span><span>Status</span><span>Date installed</span><span>Notes</span><span/></div>
      {filtered.map((mod) => <div className="mod-editor-row" key={mod._index}><select value={mod.category} onChange={(e) => update(mod._index, "category", e.target.value)}>{categories.map((c) => <option key={c}>{c}</option>)}</select><input value={mod.title} onChange={(e) => update(mod._index, "title", e.target.value)} placeholder="Modification name"/><input value={mod.brand} onChange={(e) => update(mod._index, "brand", e.target.value)} placeholder="Brand"/><select value={mod.status} onChange={(e) => update(mod._index, "status", e.target.value)}><option>Installed</option><option>Planned</option><option>Researching</option></select><input type="date" value={mod.date} onChange={(e) => update(mod._index, "date", e.target.value)}/><input value={mod.notes} onChange={(e) => update(mod._index, "notes", e.target.value)} placeholder="Notes"/><button className="row-remove" onClick={() => setRows(mods.filter((_, i) => i !== mod._index))} aria-label="Remove modification">×</button></div>)}
      {!filtered.length && <p className="empty-state">No modifications match your search.</p>}
      <div className="garage-actions"><button className="secondary-button" onClick={() => setRows([...mods, { category: "Exhaust", title: "", brand: "", status: "Installed", date: "", notes: "" }])}>＋ Add row</button><button className="primary-button" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save build log"}</button></div>{message && <p className="form-message" role="status">{message}</p>}</section>
    <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Build history</p><h2>Archived builds / previous versions</h2></div><button className="secondary-button" disabled={busy} onClick={archive}>＋ Archive current build</button></div>{(profile?.BuildHistory || []).length ? [...profile.BuildHistory].reverse().map((build, i) => <div className="history-row" key={`${build.archivedAt}-${i}`}><strong>{build.label || `Version ${i + 1}`}</strong><span>{new Date(build.archivedAt).toLocaleDateString()}</span><span>{build.modifications?.length || 0} modifications</span></div>) : <p className="empty-state">Archived versions will appear here when you save a snapshot.</p>}</section>
  </PageFrame>;
}

export function MaintenancePage() {
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const [rows, setRows] = useState(null);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const services = rows ?? initialServices(profile);
  function update(index, key, value) { setRows(services.map((row, i) => i === index ? { ...row, [key]: value } : row)); }
  async function save() { setBusy(true); try { await saveUserProfile(user.uid, { ...profile, Services: services }); setMessage("Service and repair history saved."); } catch (e) { setMessage(`Could not save: ${e.message}`); } finally { setBusy(false); } }
  if (loading) return <div className="auth-page"><p>Loading maintenance…</p></div>;
  const upcoming = (profile?.Reminders || []);
  return <PageFrame title="Maintenance & repairs" kicker="Vehicle health" subtitle="Track service history, repairs, and reminders for your vehicle.">
    {error && <p className="form-message error-message">{error}</p>}<VehicleCard profile={profile}/>
    <div className="maintenance-summary"><div><small>HISTORY ENTRIES</small><strong>{services.length}</strong></div><div><small>CUSTOM REMINDERS</small><strong>{upcoming.length}</strong></div><div><small>LAST SERVICE</small><strong>{services.filter(s => s.date).at(-1)?.date || "Not recorded"}</strong></div></div>
    <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Service & repair history</p><h2>Vehicle history</h2></div><button className="secondary-button" onClick={() => setRows([...services, { name: "", type: "Maintenance", date: "", mileage: "", notes: "" }])}>＋ Add service / repair</button></div>
      <div className="history-table-head"><span>Item</span><span>Type</span><span>Date</span><span>Mileage</span><span>Notes</span><span/></div>
      {services.map((row, i) => <div className="service-editor-row" key={i}><input value={row.name} onChange={(e) => update(i, "name", e.target.value)} placeholder="Oil change, A/C repair…"/><select value={row.type} onChange={(e) => update(i, "type", e.target.value)}><option>Maintenance</option><option>Repair</option></select><input type="date" value={row.date || ""} onChange={(e) => update(i, "date", e.target.value)}/><input type="number" min="0" value={row.mileage || ""} onChange={(e) => update(i, "mileage", e.target.value)} placeholder="Optional"/><input value={row.notes || ""} onChange={(e) => update(i, "notes", e.target.value)} placeholder="Details"/><button className="row-remove" onClick={() => setRows(services.filter((_, j) => j !== i))} aria-label="Remove history item">×</button></div>)}
      <div className="garage-actions"><span className="field-hint">Date and mileage are optional.</span><button className="primary-button" disabled={busy} onClick={save}>{busy ? "Saving…" : "Save history"}</button></div>{message && <p className="form-message" role="status">{message}</p>}</section>
    <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Custom intervals</p><h2>Maintenance reminders</h2></div><button className="secondary-button" onClick={() => setMessage("Add a custom interval from the reminder list below.")}>＋ Add reminder</button></div>{(profile?.Reminders || []).map((reminder, i) => <div className="history-row" key={i}><strong>{reminder.name}</strong><span>{reminder.mileage ? `${reminder.mileage} miles` : "Mileage flexible"}</span><span>{reminder.months ? `${reminder.months} months` : "Date flexible"}</span></div>)}<button className="secondary-button" onClick={() => { const name = window.prompt("Reminder name (for example, Differential fluid)"); if (name?.trim()) { const next = [...upcoming, { name: name.trim() }]; saveUserProfile(user.uid, { ...profile, Reminders: next }).then(() => setMessage("Reminder added.")).catch((e) => setMessage(e.message)); } }}>＋ Add custom reminder</button>{message && <p className="form-message" role="status">{message}</p>}</section>
  </PageFrame>;
}
