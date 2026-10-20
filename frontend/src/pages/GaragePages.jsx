import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import useUserProfile from '../hooks/useUserProfile.js';
import { saveUserProfile } from '../lib/userProfile.js';
import { toDateInputValue } from '../lib/profileDates.js';
import { getActiveVehicle, payloadForActiveUpdate, vehicleLabel } from '../lib/vehicleData.js';
import GarageSidebar from '../components/GarageSidebar.jsx';

const categories = ['Exhaust','Intake','Suspension','Wheels','Brakes','Tune','Interior','Custom'];
const categoryIcons = { Exhaust:'♨', Intake:'≋', Suspension:'⚙', Wheels:'◉', Brakes:'◎', Tune:'⚡', Interior:'▣', Custom:'🔧' };
const brands = ['OEM','AEM','Akrapovič','APR','BBS','Bilstein','Borla','Cobb','Cusco','Eventuri','Garrett','HKS','Invidia','KW','Mishimoto','Perrin','RaceChip','STI','Tein','Tomei','Whiteline','Other'];
const defaultMod = () => ({category:'Exhaust',title:'',brand:'',status:'Installed',date:'',notes:''});
const defaultService = () => ({name:'',type:'Maintenance',date:'',mileage:'',notes:''});
const initialMods = v => Array.isArray(v?.Modifications) ? v.Modifications.map(x=>typeof x==='string' ? {...defaultMod(),title:x,category:'Custom'}:{...defaultMod(),...x}) : [];
const initialServices = v => Array.isArray(v?.Services) ? v.Services : [
  {name:'Oil change',type:'Maintenance',date:toDateInputValue(v?.LastOilChange),mileage:'',notes:''},
  {name:'Tire rotation',type:'Maintenance',date:toDateInputValue(v?.LastTireRotation),mileage:'',notes:''},
  {name:'Transmission service',type:'Maintenance',date:toDateInputValue(v?.LastTransmissionService),mileage:'',notes:''},
].filter(x=>x.date);
const dateStr = d => d ? new Date(`${d}T12:00:00`).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}) : 'Not recorded';
function pageDate(services) {const dates=services.map(s=>s.date).filter(d=>/^\d{4}-\d{2}-\d{2}$/.test(d));return dates.length?dateStr(dates.sort().at(-1)):'Not recorded';}
function Frame({title,kicker,subtitle,selected,children,extra}){
  return <div className="app-shell"><GarageSidebar selected={selected}/><main className="garage-page">
    <header className="garage-page-header"><div><p className="eyebrow orange">{kicker}</p><h1>{title}</h1><p>{subtitle}</p></div><div className="garage-header-actions">{extra}<Link className="secondary-button" to="/dashboard">← Back to overview</Link></div></header>
    {children}</main></div>;
}
function VehicleCard({vehicle}){
  return <section className="garage-vehicle-card"><div className="garage-car-art" aria-hidden="true">🚘</div><div><strong>{vehicle?.Nickname||vehicleLabel(vehicle)}</strong><p>{vehicleLabel(vehicle)}</p><small>{vehicle?.Mileage ? `${Number(vehicle.Mileage).toLocaleString()} miles` : 'Mileage not set'}</small></div><Link className="secondary-button" to="/vehicle">Edit vehicle</Link></section>;
}
function BrandField({brand,onChange}){
  const preset=brands.some(x=>x.toLowerCase()===String(brand||'').toLowerCase());
  const [custom,setCustom]=useState(!!brand&&!preset);
  return <div className="garage-brand-field"><select aria-label="Modification brand" value={custom?'Other':brand||''} onChange={e=>{if(e.target.value==='Other'){setCustom(true);onChange('');}else{setCustom(false);onChange(e.target.value);}}}><option value="">Brand</option>{brands.map(b=><option key={b}>{b}</option>)}</select>{(custom|| (!!brand&&!preset))&&<input aria-label="Custom brand" placeholder="Enter brand" value={brand||''} onChange={e=>onChange(e.target.value)}/>}</div>;
}

export function ModificationsPage(){
 const {user}=useAuth();const {profile,loading,error}=useUserProfile();const navigate=useNavigate();
 const vehicle=getActiveVehicle(profile);const [draft,setDraft]=useState(null);const [query,setQuery]=useState('');const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [open,setOpen]=useState(null);
const rows = draft?.id === vehicle?.id ? (draft?.rows ?? initialMods(vehicle)) : initialMods(vehicle); const history=vehicle?.BuildHistory||[];
 const filtered=rows.map((r,i)=>({...r,index:i})).filter(r=>`${r.category} ${r.title} ${r.brand} ${r.notes}`.toLowerCase().includes(query.toLowerCase()));
 function setRows(r){setDraft({id:vehicle?.id,rows:r});setMessage('');}
 function update(i,k,v){setRows(rows.map((r,j)=>i===j?{...r,[k]:v}:r));}
 async function persist(patch,success){setBusy(true);try{await saveUserProfile(user.uid,payloadForActiveUpdate(profile,patch));setDraft(null);setMessage(success);}catch(e){setMessage(`Could not save: ${e.message}`);}finally{setBusy(false);}}
 async function archive(){const suggested=`Version ${history.length+1}`;const label=window.prompt('Name this build snapshot:',suggested);if(!label?.trim())return;await persist({Modifications:rows,BuildHistory:[...history,{label:label.trim(),archivedAt:new Date().toISOString(),modifications:structuredClone(rows)}]},'Build version archived.');}
 async function restore(build){if(!window.confirm(`Restore “${build.label}”? Your current build will be archived first.`))return;await persist({Modifications:build.modifications||[],BuildHistory:[...history,{label:`Before restoring ${build.label} — ${new Date().toLocaleDateString()}`,archivedAt:new Date().toISOString(),modifications:structuredClone(rows)}]},'Build restored; previous build backed up.');}
 if(loading)return <div className="auth-page">Loading modifications…</div>;
 return <Frame title="Build log & modifications" kicker="Primary build" subtitle="Organize modifications, track installation details, and review your previous builds." selected="Modifications" extra={<button className="primary-button" onClick={()=>navigate('/advisor')}>⚡ Mod Advisor</button>}>
 {error&&<p className="form-message error-message">{error}</p>}{vehicle?<VehicleCard vehicle={vehicle}/>:<p>Add a vehicle in My Garage to begin.</p>}
 <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Modification log</p><h2>Your modifications</h2></div><input className="garage-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search modifications…"/></div>
 <div className="mod-editor-head"><span>Category</span><span>Modification name</span><span>Brand</span><span>Status</span><span>Date installed</span><span>Notes</span><span/></div>
 {filtered.map(mod=><div className="mod-editor-row" key={mod.index}><div className="garage-category-picker"><span aria-hidden="true">{categoryIcons[mod.category]||'🔧'}</span><select aria-label="Category" value={mod.category} onChange={e=>update(mod.index,'category',e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div><input value={mod.title} onChange={e=>update(mod.index,'title',e.target.value)} placeholder="Modification name"/><BrandField brand={mod.brand} onChange={b=>update(mod.index,'brand',b)}/><select value={mod.status} onChange={e=>update(mod.index,'status',e.target.value)}><option>Installed</option><option>Planned</option><option>Researching</option></select><input type="date" value={mod.date||''} onChange={e=>update(mod.index,'date',e.target.value)}/><input value={mod.notes||''} onChange={e=>update(mod.index,'notes',e.target.value)} placeholder="Notes"/><button className="row-remove" onClick={()=>setRows(rows.filter((_,i)=>i!==mod.index))} aria-label="Remove modification">×</button></div>)}
 {!filtered.length&&<p className="empty-state">No matching modifications.</p>}<div className="garage-actions"><button className="secondary-button" onClick={()=>setRows([...rows,defaultMod()])}>＋ Add row</button><button className="primary-button" disabled={busy||!vehicle} onClick={()=>persist({Modifications:rows},'Build log saved.')}>{busy?'Saving…':'Save build log'}</button></div>{message&&<p className="form-message" role="status">{message}</p>}</section>
 <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Build history</p><h2>Archived builds / previous versions</h2></div><button className="secondary-button" disabled={busy||!vehicle} onClick={archive}>＋ Archive current build</button></div>
 {[...history].reverse().map((b,i)=><div className="garage-archive-item" key={`${b.archivedAt}-${i}`}><button className="history-row garage-archive-toggle" onClick={()=>setOpen(open===i?null:i)} aria-expanded={open===i}><strong>{b.label||`Version ${history.length-i}`}</strong><span>{b.archivedAt?dateStr(b.archivedAt.slice(0,10)):'Unknown date'}</span><span>{b.modifications?.length||0} modifications</span><span>{open===i?'⌃':'⌄'} View build</span></button>{open===i&&<div className="garage-archive-detail">{(b.modifications||[]).map((m,j)=><div className="garage-archive-mod" key={j}><b>{typeof m==='string'?m:m.title}</b><span>{m.category||'Custom'}</span><span>{m.brand||'—'}</span><span>{m.status||'Installed'}</span></div>)}<button className="secondary-button" disabled={busy} onClick={()=>restore(b)}>Restore this version</button></div>}</div>)}
 {!history.length&&<p className="empty-state">Archive a build to preserve a snapshot of its modifications.</p>}</section>
 </Frame>;
}

function ReminderEditor({reminder,onChange,onRemove,services,currentMileage}){
 const last=services.filter(s=>s.name?.toLowerCase().trim()===reminder.name?.toLowerCase().trim() && (s.date||s.mileage)).sort((a,b)=>((b.date||'').localeCompare(a.date||'')))[0];
 const nextMileage=last?.mileage&&reminder.mileage?Number(last.mileage)+Number(reminder.mileage):null;
 const left=nextMileage!=null&&currentMileage!=null?nextMileage-Number(currentMileage):null;
 const dueDate=last?.date&&reminder.months?new Date(`${last.date}T12:00:00`):null;
 if(dueDate)dueDate.setMonth(dueDate.getMonth()+Number(reminder.months));
 return <div className="garage-reminder-row"><input aria-label="Reminder name" value={reminder.name||''} onChange={e=>onChange('name',e.target.value)} placeholder="e.g. Oil change"/><label>Every <input type="number" min="1" aria-label="Mileage interval" value={reminder.mileage||''} onChange={e=>onChange('mileage',e.target.value)} placeholder="Miles"/> miles</label><label>or <input type="number" min="1" aria-label="Time interval months" value={reminder.months||''} onChange={e=>onChange('months',e.target.value)} placeholder="Months"/> months</label><div className="garage-reminder-due">{left!=null?`${left<=0?'Due now':`${left.toLocaleString()} mi remaining`}`:'Mileage flexible'}<small>{dueDate?`Next: ${dueDate.toLocaleDateString()}`:'Date flexible'}</small></div><button className="row-remove" onClick={onRemove} aria-label="Remove reminder">×</button></div>;
}
export function MaintenancePage(){
 const {user}=useAuth();const {profile,loading,error}=useUserProfile();const v=getActiveVehicle(profile);
 const [draft,setDraft]=useState(null);const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');
 const services =
  draft?.id === v?.id
    ? (draft?.services ?? initialServices(v))
    : initialServices(v);

const reminders =
  draft?.id === v?.id
    ? (draft?.reminders ?? (v?.Reminders || []))
    : (v?.Reminders || []);
 function edit(nextServices=services,nextReminders=reminders){setDraft({id:v?.id,services:nextServices,reminders:nextReminders});setMessage('');}
 function update(i,k,value){edit(services.map((r,j)=>j===i?{...r,[k]:value}:r));}
 async function save(){setBusy(true);try{await saveUserProfile(user.uid,payloadForActiveUpdate(profile,{Services:services,Reminders:reminders}));setDraft(null);setMessage('Maintenance history and intervals saved.');}catch(e){setMessage(`Could not save: ${e.message}`);}finally{setBusy(false);}}
 if(loading)return <div className="auth-page">Loading maintenance…</div>;
 return <Frame title="Maintenance & repairs" kicker="Vehicle health" subtitle="Track service history, repairs, and custom time or mileage reminders." selected="Maintenance">
 {error&&<p className="form-message error-message">{error}</p>}{v?<VehicleCard vehicle={v}/>:<p>Add a vehicle in My Garage to begin.</p>}
 <div className="maintenance-summary"><div><small>HISTORY ENTRIES</small><strong>{services.length}</strong></div><div><small>CUSTOM REMINDERS</small><strong>{reminders.length}</strong></div><div><small>LAST SERVICE</small><strong>{pageDate(services)}</strong></div></div>
 <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Service & repair history</p><h2>Vehicle history</h2></div><button className="secondary-button" onClick={()=>edit([...services,defaultService()])}>＋ Add service / repair</button></div><div className="history-table-head"><span>Item</span><span>Type</span><span>Date</span><span>Mileage</span><span>Notes</span><span/></div>
 {services.map((r,i)=><div className="service-editor-row" key={i}><input value={r.name||''} onChange={e=>update(i,'name',e.target.value)} placeholder="Oil change, A/C repair…"/><select value={r.type||'Maintenance'} onChange={e=>update(i,'type',e.target.value)}><option>Maintenance</option><option>Repair</option></select><input type="date" value={r.date||''} onChange={e=>update(i,'date',e.target.value)}/><input type="number" min="0" value={r.mileage||''} onChange={e=>update(i,'mileage',e.target.value)} placeholder="Optional"/><input value={r.notes||''} onChange={e=>update(i,'notes',e.target.value)} placeholder="Details"/><button className="row-remove" aria-label="Remove service" onClick={()=>edit(services.filter((_,j)=>j!==i))}>×</button></div>)}
 <div className="garage-actions"><span className="field-hint">Date and mileage are optional. Records are saved per vehicle.</span><button className="primary-button" disabled={!v||busy} onClick={save}>{busy?'Saving…':'Save history'}</button></div></section>
 <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Custom intervals</p><h2>Maintenance reminders</h2><p className="field-hint">Set a mileage interval, a month interval, or both. Either can trigger a service reminder.</p></div><button className="secondary-button" onClick={()=>edit(services,[...reminders,{name:'',mileage:'',months:''}])}>＋ Add reminder</button></div>
 {reminders.map((r,i)=><ReminderEditor key={i} reminder={r} services={services} currentMileage={v?.Mileage} onChange={(k,value)=>edit(services,reminders.map((x,j)=>i===j?{...x,[k]:value}:x))} onRemove={()=>edit(services,reminders.filter((_,j)=>j!==i))}/>)}
 {!reminders.length&&<p className="empty-state">Add an interval to track the next mileage or time-based service.</p>}<div className="garage-actions"><button className="secondary-button" onClick={()=>edit(services,[...reminders,{name:'',mileage:'',months:''}])}>＋ Add custom reminder</button><button className="primary-button" disabled={!v||busy} onClick={save}>Save intervals</button></div>{message&&<p className="form-message" role="status">{message}</p>}</section>
 </Frame>;
}
