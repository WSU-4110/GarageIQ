import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useAuth from "../hooks/useAuth.js";
import useUserProfile from "../hooks/useUserProfile.js";
import { auth } from "../lib/firebase.js";
import { formatStoredDate } from "../lib/profileDates.js";

const carImage =
  "https://images.unsplash.com/photo-1486006920555-c77dcf18193c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600";

const paths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  car: <><path d="m5 17-1-1v-5l2-5h12l2 5v5l-1 1" /><path d="M5 11h14M7 17v2M17 17v2" /><circle cx="7.5" cy="14" r=".5" /><circle cx="16.5" cy="14" r=".5" /></>,
  wrench: <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5L5 16l-2 5 5-2 7.3-7.3a4 4 0 0 0-.6-5.4Z" />,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
  map: <><path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3Z" /><path d="M8 3v15M16 6v15" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7Z" />,
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

const navItems = [
  { label: "Overview", icon: "grid" },
  { label: "My garage", icon: "car" },
  { label: "Modifications", icon: "bolt" },
  { label: "Maintenance", icon: "calendar" },
  { label: "Find shops", icon: "map" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile();
  const [active, setActive] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const displayName =
    profile?.name || user?.displayName || user?.email?.split("@")[0] || "Driver";
  const vehicleName = profile?.Car?.trim() || "";
  const modifications = (Array.isArray(profile?.Modifications) ? profile.Modifications : [])
    .map((modification, index) => {
      if (typeof modification === "string") {
        return {
          title: modification,
          category: "Modification",
          date: "",
          price: "—",
          status: "Saved",
          index,
        };
      }

      return {
        title: modification?.title || modification?.name || "Modification",
        category: modification?.category || "Modification",
        date: modification?.date || "",
        price: modification?.price || "—",
        status: modification?.status || "Saved",
        index,
      };
    });
  const recentModifications = modifications.filter((item) => `${item.title} ${item.category}`.toLowerCase().includes(search.toLowerCase())).slice(0, 3);
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

  async function handleSignOut() {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (signOutError) {
      notify(`Could not sign out: ${signOutError.message}`);
    }
  }

  if (loading) {
    return <div className="auth-page"><p role="status">Loading your garage...</p></div>;
  }

  if (error) {
    return (
      <div className="auth-page">
        <section className="auth-card">
          <p className="form-message error-message" role="alert">{error}</p>
          <button className="primary-button auth-submit" onClick={handleSignOut}>Sign out</button>
        </section>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <aside className={menuOpen ? "sidebar open" : "sidebar"}>
        <div className="brand">
          <span className="brand-mark"><Icon name="bolt" size={17} /></span>
          <span>GARAGE<span>IQ</span></span>
        </div>
        <button className="close-menu" onClick={() => setMenuOpen(false)} aria-label="Close menu"><Icon name="x" /></button>

        <nav>
          <p className="eyebrow">Workspace</p>
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`nav-item ${active === item.label ? "active" : ""} ${item.label === "Find shops" ? "unavailable" : ""}`}
              aria-disabled={item.label === "Find shops"}
              onClick={() => {
                if (item.label === "Find shops") notify("Find shops is not available yet.");
                else if (item.label === "My garage") navigate("/vehicle");
                else if (item.label === "Modifications") navigate("/modifications");
                else if (item.label === "Maintenance") navigate("/maintenance");
                else setActive(item.label);
                setMenuOpen(false);
              }}
            >
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="garage-switcher">
          <p className="eyebrow">Active vehicle</p>
          <button onClick={() => navigate("/vehicle")}>
            <span className="mini-car"><img src={carImage} alt="" /></span>
            <span><strong>{vehicleName || "Add your vehicle"}</strong><small>Vehicle profile</small></span>
            <Icon name="chevron" size={14} />
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="avatar">{initials}</div>
          <div><strong>{displayName}</strong><span>{user?.email}</span></div>
          <button onClick={handleSignOut} aria-label="Sign out" title="Sign out">Sign out</button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
          <div className="mobile-brand">GARAGE<span>IQ</span></div>
          <label className="search">
            <Icon name="search" />
            <input placeholder="Search your garage..." aria-label="Search your garage" value={search} onChange={(event) => setSearch(event.target.value)} />
            <kbd>⌘ K</kbd>
          </label>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications" onClick={() => notify("Notifications are not connected yet.")}><Icon name="bell" /></button>
            <button className="primary-button" onClick={() => navigate("/advisor")}>Mod advisor</button>
            <button className="primary-button" onClick={() => navigate("/modifications")}><Icon name="plus" /> Add modification</button>
          </div>
        </header>

        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow orange">{new Intl.DateTimeFormat(undefined, { weekday: "long", month: "long", day: "numeric" }).format(new Date())}</p>
              <h1>{active === "Overview" ? `Welcome back, ${displayName}.` : active}</h1>
              <p>{active === "Overview" ? "Here’s what’s happening in your garage." : `Everything you need to manage your ${active.toLowerCase()}.`}</p>
            </div>
            <button className="secondary-button" onClick={() => notify("Build sheet export is not connected yet.")}><Icon name="arrow" /> Export build sheet</button>
          </section>

          <section className="hero-card">
            <img src={carImage} alt="Black performance car in a workshop" />
            <div className="hero-shade" />
            <div className="car-title">
              <span className="status-dot">PRIMARY BUILD</span>
              <h2>{vehicleName || "Add your vehicle profile"}</h2>
              <p>{vehicleName ? "Vehicle details saved to your garage" : "Add your vehicle to start building your garage"}</p>
            </div>
            <div className="hero-stats">
              <div><small>MODIFICATIONS</small><strong>{modifications.length}</strong><em>saved to your profile</em></div>
              <div><small>LAST OIL SERVICE</small><strong>{formatStoredDate(profile?.LastOilChange)}</strong><em>from your service history</em></div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="panel activity-panel">
              <div className="panel-heading">
                <div><p className="eyebrow">Build log</p><h3>Recent modifications</h3></div>
                <button onClick={() => navigate("/modifications")}>View all <Icon name="arrow" size={15} /></button>
              </div>
              <div className="mod-list">
                {recentModifications.length ? recentModifications.map((mod) => (
                  <div className="mod-row" key={`${mod.title}-${mod.index}`}>
                    <div className={`mod-icon mod-${mod.index % 3}`}><Icon name={mod.index % 3 === 0 ? "bolt" : mod.index % 3 === 1 ? "wrench" : "car"} /></div>
                    <div className="mod-copy"><strong>{mod.title}</strong><span>{mod.category}{mod.date ? ` · ${mod.date}` : ""}</span></div>
                    <span className="installed"><Icon name="check" size={12} /> {mod.status}</span>
                    <strong className="price">{mod.price}</strong>
                  </div>
                )) : <p className="empty-state">No modifications saved yet. Add them from your vehicle profile.</p>}
              </div>
            </div>

            <div className="panel health-panel">
              <div className="panel-heading">
                <div><p className="eyebrow">Vehicle health</p><h3>Maintenance</h3></div>
                <button onClick={() => navigate("/maintenance")}>Edit history <Icon name="arrow" size={15} /></button>
              </div>
              <div className="service-item">
                <div className="service-icon"><Icon name="calendar" /></div>
                <div><strong>Oil change</strong><span>{formatStoredDate(profile?.LastOilChange)}</span></div>
              </div>
              <div className="service-item">
                <div className="service-icon"><Icon name="calendar" /></div>
                <div><strong>Tire rotation</strong><span>{formatStoredDate(profile?.LastTireRotation)}</span></div>
              </div>
              <div className="service-item">
                <div className="service-icon"><Icon name="calendar" /></div>
                <div><strong>Transmission service</strong><span>{formatStoredDate(profile?.LastTransmissionService)}</span></div>
              </div>
              <button className="full-button" onClick={() => navigate("/maintenance")}>Edit service history <Icon name="arrow" size={15} /></button>
            </div>

            <div className="panel planner-panel">
              <div className="panel-heading">
                <div><p className="eyebrow">Next up</p><h3>Build planner</h3></div>
                <button onClick={() => notify("The build planner is not connected yet.")}>Open planner <Icon name="arrow" size={15} /></button>
              </div>
              <div className="planned-card">
                <div className="planned-top"><span>PLANNED</span><strong>$4,600 est.</strong></div>
                <h4>AP Racing Big Brake Kit</h4>
                <p>Front 6-piston · 372mm rotors</p>
                <div className="tags"><span>Braking</span><span>High priority</span></div>
              </div>
              <div className="planned-card compact">
                <div><span className="small-icon"><Icon name="clock" size={16} /></span><div><h4>Vorsteiner V-FF 103</h4><p>Wheels · Saved 4 days ago</p></div></div>
                <strong>$2,800</strong>
              </div>
            </div>

            <div className="panel shop-panel">
              <div className="shop-photo" />
              <div className="shop-content">
                <div className="panel-heading"><div><p className="eyebrow">Trusted nearby</p><h3>Apex Motorworks</h3></div><span className="rating">★ 4.9</span></div>
                <p>BMW performance specialists · 3.2 mi away</p>
                <div className="shop-meta"><span>Open until 6 PM</span><span>24 builds</span></div>
                <button className="full-button dark" onClick={() => notify("Shop profiles are not connected yet.")}>View shop <Icon name="arrow" size={15} /></button>
              </div>
            </div>
          </section>
        </div>
      </main>

      {menuOpen && <button className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}
      {toast && <div className="toast"><Icon name="check" size={16} />{toast}</div>}
    </div>
  );
}
