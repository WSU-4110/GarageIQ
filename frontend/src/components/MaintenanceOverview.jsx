import { useState } from 'react';
import { saveUserProfile } from '../lib/userProfile.js';
import { payloadForActiveUpdate } from '../lib/vehicleData.js';
import { calculateReminder } from '../lib/maintenanceRules.js';
import { getVisibleReminders, reminderKey } from '../lib/maintenanceWorkflow.js';
import OneTimeChecksSection from './OneTimeChecksSection.jsx';
import './ModMaintenanceSection.css';

function statusText(status) {
  return status.overdue ? 'Overdue' : status.dueNow ? 'Due now' : status.dueSoon ? 'Due soon' :
    status.needsBaseline ? 'Needs service history' : 'Upcoming';
}

export default function MaintenanceOverview({vehicle,profile,user,reminders,services}) {
  const [showHidden,setShowHidden]=useState(false);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const current={...(vehicle||{}),Reminders:reminders||[]};
  const {visible,hidden}=getVisibleReminders(current);
  const savedHidden=vehicle?.HiddenMaintenanceReminders||[];

  async function hideReminder(name,hide) {
    if(!user?.uid||!profile||!vehicle) return setError('Choose a vehicle and sign in first.');
    const updated=hide?[...new Set([...savedHidden.map(reminderKey),reminderKey(name)])]:
      savedHidden.filter(key=>reminderKey(key)!==reminderKey(name));
    setBusy(true);setError('');
    try{await saveUserProfile(user.uid,payloadForActiveUpdate(profile,{HiddenMaintenanceReminders:updated}));}
    catch(e){setError(`Could not update reminder visibility: ${e.message}`);}
    finally{setBusy(false);}
  }
  return <section className="garage-panel" aria-label="Upcoming maintenance">
    <div className="garage-panel-heading"><div><p className="eyebrow">Maintenance schedule</p><h2>Upcoming reminders</h2></div>
      <span className="field-hint">Active schedule based on saved service history, mileage and installed modifications</span></div>
    <div className="garage-upcoming-grid">{visible.length ? visible.map((reminder,i)=>{
      const s=calculateReminder(reminder,services||[],vehicle?.Mileage);
      const label=statusText(s);
      const detail=s.mileageText==='No mileage interval'?(s.needsBaseline?'Add matching service history':'Time-based interval'):s.mileageText;
      return <div className="garage-upcoming-card garage-manage-reminder" key={`${reminder.name}-${i}`}>
        <button type="button" className="garage-hide-reminder" title="Hide this reminder (does not delete it)" aria-label={`Hide ${reminder.name}`} disabled={busy} onClick={()=>hideReminder(reminder.name,true)}>×</button>
        <span className={`garage-due-flag ${s.overdue||s.dueNow?'is-due':s.dueSoon?'is-soon':s.needsBaseline?'':'is-okay'}`}>{label}</span>
        <strong>{reminder.name||'Unnamed reminder'}</strong>{reminder.modBased&&<small className="mod-effective-tag">Active modification-based interval</small>}
        <p>{detail}</p><p>{s.nextDate?`Target date: ${s.nextDate}`:'No calculated target date'}</p>
      </div>;
    }):<p className="empty-state">No visible recurring reminders. Add a custom interval below, or restore hidden reminders.</p>}</div>
    {hidden.length>0&&<div className="garage-hidden-reminders"><button type="button" className="mod-health-text-button" onClick={()=>setShowHidden(!showHidden)}>{showHidden?'Hide':'Manage'} {hidden.length} hidden reminder{hidden.length===1?'':'s'}</button>
      {showHidden&&<div className="garage-hidden-list">{hidden.map(reminder=><div key={reminderKey(reminder.name)}>
        <span>{reminder.name}</span><button type="button" className="secondary-button" disabled={busy} onClick={()=>hideReminder(reminder.name,false)}>Restore</button>
      </div>)}</div>}</div>}
    {error&&<p className="mod-health-note" role="status">{error}</p>}
    <OneTimeChecksSection vehicle={vehicle} profile={profile} user={user}/>
  </section>;
}
