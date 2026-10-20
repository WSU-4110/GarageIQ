import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import useAuth from '../hooks/useAuth.js';
import useUserProfile from '../hooks/useUserProfile.js';
import { auth } from '../lib/firebase.js';
import { saveUserProfile } from '../lib/userProfile.js';
import { activeIndex, getVehicles, payloadForVehicles, vehicleLabel } from '../lib/vehicleData.js';

const paths = {
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  car: <><path d="m5 17-1-1v-5l2-5h12l2 5v5l-1 1"/><path d="M5 11h14M7 17v2M17 17v2"/><circle cx="7.5" cy="14" r=".5"/><circle cx="16.5" cy="14" r=".5"/></>,
  bolt: <path d="m13 2-8 12h7l-1 8 8-12h-7Z"/>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
  map: <><path d="m3 6 5-3 8 3 5-3v15l-5 3-8-3-5 3Z"/><path d="M8 3v15M16 6v15"/></>,
};
function Icon({name,size=18}) {return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>}
const oldCarImage = 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600';
const entries=[
  ['/dashboard','grid','Overview'],
  ['/vehicle','car','My garage'],
  ['/modifications','bolt','Modifications'],
  ['/maintenance','calendar','Maintenance'],
  ['/dashboard?view=shops','map','Find shops'],
];
export default function GarageSidebar({selected=''}) {
  const {user}=useAuth();
  const {profile}=useUserProfile();
  const navigate=useNavigate();
  const vehicles=getVehicles(profile);
  const index=activeIndex(profile,vehicles);
  const active=vehicles[index];
  const displayName=profile?.name||user?.displayName||user?.email?.split('@')[0]||'Driver';
  const initials=displayName.split(/\s+/).filter(Boolean).slice(0,2).map(x=>x[0]?.toUpperCase()).join('');
  async function switchVehicle(event) {
    const next=Number(event.target.value);
    if(!user||!profile||!vehicles[next]||next===index)return;
    try {await saveUserProfile(user.uid,payloadForVehicles(profile,vehicles,next));}
    catch(error) {window.alert(`Could not switch vehicles: ${error.message}`);}
  }
  return <aside className="sidebar garage-sidebar-unified">
    <Link className="brand" to="/dashboard"><span className="brand-mark"><Icon name="bolt" size={17}/></span><span>GARAGE<span>IQ</span></span></Link>
    <nav><p className="eyebrow">Workspace</p>{entries.map(([url,glyph,name])=><Link className={`nav-item ${selected===name?'active':''}`} to={url} key={url}><Icon name={glyph}/><span>{name}</span></Link>)}</nav>
    <div className="garage-switcher">
      <p className="eyebrow">Active vehicle</p>
      {active ? <div className="garage-vehicle-combo"><Link to="/vehicle" className="garage-vehicle-combo-link" title="View vehicle profile"><span className="mini-car"><img src={oldCarImage} alt="" /></span><span className="garage-vehicle-name"><strong>{active.Nickname||vehicleLabel(active)}</strong><small>{vehicleLabel(active)}</small></span></Link><select value={index} onChange={switchVehicle} aria-label="Switch active vehicle" title="Switch active vehicle">{vehicles.map((v,i)=><option key={v.id||i} value={i}>{v.Nickname||vehicleLabel(v)}</option>)}</select></div>:<button className="garage-add-vehicle" onClick={()=>navigate('/vehicle')}>＋ Add a vehicle</button>}
    </div>
    <div className="sidebar-footer"><div className="avatar">{initials}</div><div><strong>{displayName}</strong><span>{user?.email}</span></div><button onClick={async()=>{await signOut(auth);navigate('/login');}} aria-label="Sign out">Sign out</button></div>
  </aside>;
}
