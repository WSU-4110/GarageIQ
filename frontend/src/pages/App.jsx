import { useState } from 'react';

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

const modifications = [
  { title: "Stage 1 ECU Tune", category: "Performance", date: "May 12, 2024", price: "$899", status: "Installed" },
  { title: "KW V3 Coilovers", category: "Suspension", date: "Apr 28, 2024", price: "$2,840", status: "Installed" },
  { title: "Titanium Cat-back", category: "Exhaust", date: "Mar 16, 2024", price: "$3,250", status: "Installed" },
];

export default function App() {
  const [active, setActive] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  };

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
              className={active === item.label ? "nav-item active" : "nav-item"}
              onClick={() => { setActive(item.label); setMenuOpen(false); }}
            >
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="garage-switcher">
          <p className="eyebrow">Active vehicle</p>
          <button onClick={() => notify("Vehicle switcher ready")}>
            <span className="mini-car"><img src={carImage} alt="" /></span>
            <span><strong>2020 BMW M4</strong><small>F82 Competition</small></span>
            <Icon name="chevron" size={14} />
          </button>
        </div>

        <div className="sidebar-footer">
          <div className="avatar">JD</div>
          <div><strong>Mohamed Hamidat</strong><span>Pro member</span></div>
          <button aria-label="Account options">•••</button>
        </div>
      </aside>

      <main>
        <header className="topbar">
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu" /></button>
          <div className="mobile-brand">GARAGE<span>IQ</span></div>
          <label className="search">
            <Icon name="search" />
            <input placeholder="Search your garage..." aria-label="Search your garage" />
            <kbd>⌘ K</kbd>
          </label>
          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications" onClick={() => notify("You're all caught up")}><Icon name="bell" /></button>
            <button className="primary-button" onClick={() => notify("New modification added to your plan")}><Icon name="plus" /> Add modification</button>
          </div>
        </header>

        <div className="content">
          <section className="welcome">
            <div>
              <p className="eyebrow orange">Tuesday, June 18</p>
              <h1>{active === "Overview" ? "Welcome back, Hamidat." : active}</h1>
              <p>{active === "Overview" ? "Your M4 is dialed in. Here’s what’s happening in your garage." : `Everything you need to manage your ${active.toLowerCase()}.`}</p>
            </div>
            <button className="secondary-button" onClick={() => notify("Build sheet exported")}><Icon name="arrow" /> Export build sheet</button>
          </section>

          <section className="hero-card">
            <img src={carImage} alt="Black performance car in a workshop" />
            <div className="hero-shade" />
            <div className="car-title">
              <span className="status-dot">PRIMARY BUILD</span>
              <h2>2020 BMW M4 Competition</h2>
              <p>F82 · S55 3.0L Twin-Turbo · Black Sapphire Metallic</p>
            </div>
            <div className="hero-stats">
              <div><small>EST. POWER</small><strong>512 <span>hp</span></strong><em>+68 hp</em></div>
              <div><small>MODIFICATIONS</small><strong>14</strong><em>9 installed</em></div>
              <div><small>BUILD VALUE</small><strong>$18.4k</strong><em>in upgrades</em></div>
            </div>
          </section>

          <section className="dashboard-grid">
            <div className="panel activity-panel">
              <div className="panel-heading">
                <div><p className="eyebrow">Build log</p><h3>Recent modifications</h3></div>
                <button onClick={() => setActive("Modifications")}>View all <Icon name="arrow" size={15} /></button>
              </div>
              <div className="mod-list">
                {modifications.map((mod, index) => (
                  <div className="mod-row" key={mod.title}>
                    <div className={`mod-icon mod-${index}`}><Icon name={index === 0 ? "bolt" : index === 1 ? "wrench" : "car"} /></div>
                    <div className="mod-copy"><strong>{mod.title}</strong><span>{mod.category} · {mod.date}</span></div>
                    <span className="installed"><Icon name="check" size={12} /> {mod.status}</span>
                    <strong className="price">{mod.price}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel health-panel">
              <div className="panel-heading">
                <div><p className="eyebrow">Vehicle health</p><h3>Maintenance</h3></div>
                <div className="health-score">92</div>
              </div>
              <div className="service-item">
                <div className="service-icon"><Icon name="calendar" /></div>
                <div><strong>Oil service</strong><span>Due in 420 miles</span></div>
                <b>SOON</b>
              </div>
              <div className="progress"><span /></div>
              <div className="odometer"><span>Current mileage</span><strong>31,842 mi</strong></div>
              <button className="full-button" onClick={() => notify("Maintenance record flow opened")}>Log maintenance <Icon name="plus" size={15} /></button>
            </div>

            <div className="panel planner-panel">
              <div className="panel-heading">
                <div><p className="eyebrow">Next up</p><h3>Build planner</h3></div>
                <button onClick={() => notify("Planner opened")}>Open planner <Icon name="arrow" size={15} /></button>
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
                <button className="full-button dark" onClick={() => notify("Opening shop profile")}>View shop <Icon name="arrow" size={15} /></button>
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
