import { calculateReminder, digitsOnly, monthsDraft } from '../lib/maintenanceRules.js';
import './ModMaintenanceSection.css';

const pretty = reminder => [reminder?.mileage?`${Number(reminder.mileage).toLocaleString()} miles`:'',
  reminder?.months?`${reminder.months} months`:''].filter(Boolean).join(' or ')||'No saved interval';

export default function LinkedReminderEditor({reminder,activeReminder,onChange,onRemove,services,currentMileage}) {
  const current=activeReminder||reminder;
  const status=calculateReminder(current,services,currentMileage);
  const label=status.overdue?'Overdue':status.dueNow?'Due now':status.dueSoon?'Due soon':status.needsBaseline?'Needs service history':'Upcoming';
  return <div className="garage-reminder-row linked-reminder-row">
    <div className="linked-reminder-name"><input aria-label="Reminder name" maxLength={80} value={reminder.name||''} onChange={e=>onChange('name',e.target.value)} placeholder="Oil change, brake fluid…"/>
      {current?.modBased&&<small className="mod-effective-tag">Modified schedule active; fields below edit the original</small>}</div>
    <label>Every <input type="text" inputMode="numeric" aria-label="Original mileage interval" value={reminder.mileage??''} onChange={e=>onChange('mileage',digitsOnly(e.target.value))} placeholder="5,000"/> miles</label>
    <label>or <input type="text" inputMode="decimal" aria-label="Original time interval months" value={reminder.months??''} onChange={e=>onChange('months',monthsDraft(e.target.value))} placeholder="0.5–60"/> months</label>
    <div className={`garage-reminder-due ${status.overdue||status.dueNow?'is-due':status.dueSoon?'is-soon':status.needsBaseline?'':'is-okay'}`}>
      {label}{status.mileageText!=='No mileage interval'?`: ${status.mileageText}`:''}
      <small>{status.nextDate?`Next date: ${status.nextDate}`:status.needsBaseline?'Add service history':'No date-based threshold'}</small>
      {current?.modBased&&<small className="linked-effective-detail">Effective: {pretty(current)} · Original: {pretty(reminder)}. To edit the modification adjustment, use its check below.</small>}
    </div>
    <button className="row-remove" type="button" onClick={onRemove} aria-label="Delete original reminder">×</button>
  </div>;
}

export function LinkedModReminders({reminders,effective,services,currentMileage}) {
  const keys=new Set(reminders.map(r=>String(r.name||'').trim().toLowerCase()));
  const created=effective.filter(r=>r.modBased&&!keys.has(String(r.name||'').trim().toLowerCase()));
  if(!created.length)return null;
  return <div className="linked-mod-added"><h3>Active modification-based reminders</h3>
    <p className="field-hint">These are included in Upcoming reminders. They are attached to installed modifications, not permanently added to your original custom reminders.</p>
    {created.map((r,i)=>{
      const status=calculateReminder(r,services,currentMileage);
      return <div className="linked-mod-added-item" key={`${r.name}-${i}`}><strong>{r.name}</strong><span>{pretty(r)}</span>
        <span>{status.needsBaseline?'Add matching service record':status.mileageText}</span>
        <button type="button" className="secondary-button" onClick={()=>document.getElementById('mod-maintenance-section')?.scrollIntoView({behavior:'smooth'})}>Manage</button>
      </div>;
    })}
  </div>;
}
