import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";
import useUserProfile from "../hooks/useUserProfile.js";
import { getAdvice, parseCar } from "../lib/advisor.js";

const GREEN = "#2e9e5b";

function installedMods(profile) {
  const mods = profile?.Modifications;
  if (Array.isArray(mods)) {
    return mods.flatMap((mod) => {
      if (typeof mod === "string") return mod.trim() ? [mod.trim()] : [];
      if (!mod || typeof mod !== "object" || (mod.status && mod.status !== "Installed")) return [];
      const name = typeof mod.title === "string" ? mod.title : mod.name;
      if (typeof name !== "string") return [];
      return name.trim() ? [name.trim()] : [];
    });
  }
  return typeof mods === "string" ? mods.split(/\r?\n/).map((mod) => mod.trim()).filter(Boolean) : [];
}

function Tag({ children, color }) {
  return (
    <span style={{ marginLeft: 8, padding: "2px 8px", borderRadius: 10, fontSize: 12, fontWeight: 600, color: "#fff", background: color }}>
      {children}
    </span>
  );
}

function ModList({ label, mods, installed }) {
  if (!mods?.length) return null;
  return (
    <p>
      <strong>{label}:</strong>{" "}
      {mods.map((mod, index) => (
        <span key={mod.id} style={installed.has(mod.id) ? { color: GREEN, fontWeight: 600 } : undefined}>
          {index > 0 && ", "}
          {mod.name}{installed.has(mod.id) && " ✓"}
        </span>
      ))}
    </p>
  );
}

export default function Advisor() {
  const { user } = useAuth();
  const { profile, loading } = useUserProfile();
  const [edits, setEdits] = useState({});
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const vehicle = { ...parseCar(profile?.Car), ...edits };
  const installed = new Set(result?.installed_ids);

  function updateField(event) {
    setEdits({ ...edits, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setResult(null);
    try {
      setResult(await getAdvice(user, {
        year: Number(vehicle.year),
        make: vehicle.make.trim(),
        model: vehicle.model.trim(),
        trim: vehicle.trim.trim() || null,
        mileage: 0,
      }, question, installedMods(profile)));
    } catch (adviceError) {
      setError(adviceError.message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="auth-page"><p role="status">Loading your vehicle...</p></div>;
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <div className="brand auth-brand"><span className="brand-mark">⚡</span><span>GARAGE<span>IQ</span></span></div>
        <p className="eyebrow orange">Mod advisor</p>
        <h1>Find mods for your car</h1>
        <form onSubmit={handleSubmit}>
          <label>Year<input name="year" type="number" value={vehicle.year} onChange={updateField} required /></label>
          <label>Make<input name="make" value={vehicle.make} onChange={updateField} required /></label>
          <label>Model<input name="model" value={vehicle.model} onChange={updateField} required /></label>
          <label>Trim (optional)<input name="trim" value={vehicle.trim} onChange={updateField} /></label>
          <label>
            What do you want to do?
            <textarea
              rows="3"
              minLength={3}
              maxLength={500}
              placeholder="e.g. better handling in corners"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              required
            />
          </label>
          {error && <p className="form-message error-message" role="alert">{error}</p>}
          <button className="primary-button auth-submit" type="submit" disabled={busy}>
            {busy ? "Searching..." : "Get recommendations"}
          </button>
        </form>
        {result && (
          <div role="status">
            <p>{result.answer}</p>
            {result.recommendations.map((rec) => {
              const owned = installed.has(rec.mod.id);
              return (
                <div key={rec.mod.id} style={owned ? { color: GREEN } : undefined}>
                  <h3>
                    {rec.mod.name}
                    {owned && <Tag color={GREEN}>Already modified</Tag>}
                    {rec.scope === "universal" && <Tag color="#6b7280">For every car</Tag>}
                    {!rec.mod.verified && <Tag color="#b7791f">Unverified</Tag>}
                  </h3>
                  <p>{rec.mod.summary} {rec.mod.advice}</p>
                  <ModList label="Required" mods={rec.required_mods} installed={installed} />
                  <ModList label="Pairs well with" mods={rec.supporting_mods} installed={installed} />
                  <ModList label="Conflicts with" mods={rec.conflicts} installed={installed} />
                </div>
              );
            })}
            {result.guidance?.length > 0 && <h3>Guides</h3>}
            {result.guidance?.map((item) => (
              <div key={item.guide.id}>
                <h4>{item.guide.title}{!item.guide.verified && <Tag color="#b7791f">Unverified</Tag>}</h4>
                <p>{item.guide.text}</p>
                <small>Source: {item.guide.source.replace(/\s*\(unverified\)/i, "")}</small>
              </div>
            ))}
          </div>
        )}
        <p className="auth-switch"><Link to="/dashboard">Back to dashboard</Link></p>
      </section>
    </div>
  );
}
