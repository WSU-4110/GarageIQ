import { useState } from 'react';
import { saveUserProfile } from '../lib/userProfile.js';
import { payloadForActiveUpdate } from '../lib/vehicleData.js';
import { getActiveOneTimeChecks, oneTimeStatus, validateOneTime } from '../lib/maintenanceWorkflow.js';
import { todayLocalISO } from '../lib/maintenanceRules.js';
import './ModMaintenanceSection.css';

export default function OneTimeChecksSection({ vehicle, profile, user }) {
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({name:'',dueMileage:'',dueDate:''});
  const [showFinished, setShowFinished] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const saved = Array.isArray(vehicle?.OneTimeMaintenanceChecks) ? vehicle.OneTimeMaintenanceChecks : [];
  const active = getActiveOneTimeChecks(vehicle);
  const pending = active.filter(t => !t.completedAt && !t.hidden);
  const finished = active.filter(t => t.completedAt || t.hidden);

  async function persist(items, success='') {
    if (!user?.uid || !profile || !vehicle) return setError('Sign in and choose a vehicle first.');
    setBusy(true);
    setError('');
    try {
      await saveUserProfile(user.uid, payloadForActiveUpdate(profile, {OneTimeMaintenanceChecks:items}));
      if (success) setError(success);
    } catch (e) { setError(`Could not save one-time checks: ${e.message}`); }
    finally { setBusy(false); }
  }
  function update(id, patch) { return persist(saved.map(t => t.id === id ? {...t,...patch} : t)); }
  function addCheck() {
    const item = { ...draft, name:draft.name.trim(), id:crypto.randomUUID(), createdAt:new Date().toISOString() };
    const validation = validateOneTime(item);
    if (validation) return setError(validation);
    persist([...saved,item],'One-time check added.');
    setDraft({name:'',dueMileage:'',dueDate:''});
    setCreating(false);
  }
  return <div className="one-time-panel" id="one-time-checks">
    <div className="one-time-heading"><div><h3>One-time checks</h3><p>For inspections that only need to happen once, not at a recurring interval.</p></div><button type="button" className="secondary-button" onClick={()=>setCreating(!creating)}>+ One-time check</button></div>
    {creating && <div className="one-time-add">
      <label>Inspection name<input maxLength="80" placeholder="e.g. Inspect exhaust hangers after install" value={draft.name} onChange={e=>setDraft(d=>({...d,name:e.target.value}))}/></label>
      <label>Due at mileage (optional)<input type="number" min="0" max="2000000" placeholder="Miles" value={draft.dueMileage} onChange={e=>setDraft(d=>({...d,dueMileage:e.target.value}))}/></label>
      <label>Due date (optional)<input type="date" value={draft.dueDate} onChange={e=>setDraft(d=>({...d,dueDate:e.target.value}))}/></label>
      <button className="primary-button" disabled={busy} type="button" onClick={addCheck}>Add check</button>
    </div>}
    {pending.length > 0 ? <div className="one-time-list">{pending.map(item => {
      const state=oneTimeStatus(item,vehicle?.Mileage,todayLocalISO());
      return <div className="one-time-item" key={item.id}>
        <div className="one-time-item-copy"><strong>{item.name}</strong><small>{state==='due' ? 'Due now' : 'One-time check'}{item.dueMileage!=='' && item.dueMileage!=null ? ` · At ${Number(item.dueMileage).toLocaleString()} mi` : ''}{item.dueDate ? ` · By ${item.dueDate}` : ''}</small></div>
        <button className="secondary-button" type="button" disabled={busy} onClick={()=>update(item.id,{completedAt:new Date().toISOString()})}>✓ Done</button>
        <button className="garage-hide-reminder" type="button" title="Hide this one-time check" aria-label={`Hide ${item.name}`} disabled={busy} onClick={()=>update(item.id,{hidden:true})}>×</button>
      </div>;
    })}</div> : <p className="mod-health-note">No pending one-time checks.</p>}
    {finished.length>0 && <><button type="button" className="mod-health-text-button" onClick={()=>setShowFinished(!showFinished)}>{showFinished?'Hide':'Review'} {finished.length} completed/hidden checks</button>
      {showFinished&&<div className="one-time-list">{finished.map(item=><div className="one-time-item" key={item.id}>
        <div className="one-time-item-copy"><strong>{item.name}</strong><small>{item.completedAt?'Completed':'Hidden'}</small></div>
        <button type="button" className="secondary-button" disabled={busy} onClick={()=>update(item.id,{completedAt:null,hidden:false})}>Restore</button>
        <button type="button" className="garage-hide-reminder" aria-label={`Delete ${item.name}`} disabled={busy} onClick={()=>persist(saved.filter(x=>x.id!==item.id))}>×</button>
      </div>)}</div>}</>}
    {error && <p role="status" className="mod-health-note">{error}</p>}
  </div>;
}
