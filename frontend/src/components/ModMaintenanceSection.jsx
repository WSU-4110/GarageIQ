import { useState } from 'react';
import { saveUserProfile } from '../lib/userProfile.js';
import { payloadForActiveUpdate } from '../lib/vehicleData.js';
import { getCheckWorkflow, checkSignature } from '../lib/maintenanceWorkflow.js';
import { getEffectiveMaintenancePlan, validateModIntervalChoice } from '../lib/modMaintenanceIntervals.js';
import { calculateReminder } from '../lib/maintenanceRules.js';
import './ModMaintenanceSection.css';

const PREVIEW_LIMIT=8;
const emptyDraft = check => ({checkId:check.id,mode:'new',name:check.title.slice(0,80),mileage:'',months:''});
const prettyInterval = r => [r?.mileage ? `${Number(r.mileage).toLocaleString()} miles`: '',
  r?.months ? `${r.months} months`: ''].filter(Boolean).join(' or ') || 'Not set';

export default function ModMaintenanceSection({ vehicle, profile, user }) {
  const [editingId,setEditingId]=useState(null);
  const [draft,setDraft]=useState(null);
  const [showHandled,setShowHandled]=useState(false);
  const [showAll,setShowAll]=useState(false);
  const [busy,setBusy]=useState(false);
  const [feedback,setFeedback]=useState('');
  const workflow=getCheckWorkflow(vehicle);
  const saved=Array.isArray(vehicle?.ModMaintenanceIntervals)?vehicle.ModMaintenanceIntervals:[];
  const decisions=Array.isArray(vehicle?.ModMaintenanceCheckDecisions)?vehicle.ModMaintenanceCheckDecisions:[];
  const oneTimes=Array.isArray(vehicle?.OneTimeMaintenanceChecks)?vehicle.OneTimeMaintenanceChecks:[];
  const reminders=Array.isArray(vehicle?.Reminders)?vehicle.Reminders:[];
  const plan=getEffectiveMaintenancePlan(vehicle);
  const handled=[...workflow.scheduled,...workflow.completed,...workflow.ignored];
  const displayed=showHandled?[...workflow.pending,...handled]:workflow.pending;
  const visible=showAll?displayed:displayed.slice(0,PREVIEW_LIMIT);

  async function savePatch(patch, success) {
    if(!user?.uid||!profile||!vehicle){setFeedback('Sign in and select a vehicle first.');return;}
    setBusy(true);setFeedback('');
    try{
      await saveUserProfile(user.uid,payloadForActiveUpdate(profile,patch));
      setFeedback(success);setEditingId(null);setDraft(null);
    }catch(e){setFeedback(`Could not save: ${e.message}`);}finally{setBusy(false);}
  }
  function startEdit(check){
    const prev=saved.find(x=>x.checkId===check.id);
    setDraft(prev?{...prev}:emptyDraft(check));setEditingId(check.id);setFeedback('');setShowAll(true);
  }
  function chooseMode(mode){setDraft(prev=>({...prev,mode,
    name:mode==='new'?workflow.items.find(x=>x.id===prev.checkId)?.title.slice(0,80)||'':reminders[0]?.name||'',
    mileage:'',months:''}));}
  function saveDraft(check){
    const choice={checkId:check.id,mode:draft.mode,name:String(draft.name||'').trim(),
      mileage:String(draft.mileage??'').trim(),months:String(draft.months??'').trim()};
    const error=validateModIntervalChoice(choice,vehicle);
    if(error){setFeedback(error);return;}
    savePatch({ModMaintenanceIntervals:[...saved.filter(x=>x.checkId!==check.id),choice],
      ModMaintenanceCheckDecisions:decisions.filter(x=>x.checkId!==check.id)},
      'Interval saved and moved to Addressed checks. The original reminder is preserved.');
  }
  function setDecision(check,status){
    const updated=[...decisions.filter(d=>d.checkId!==check.id),{checkId:check.id,signature:checkSignature(check),status}];
    savePatch({ModMaintenanceCheckDecisions:updated},status==='ignored'?'Check hidden. You can restore it below.':'Check marked complete.');
  }
  function restore(check){
    const patch={ModMaintenanceCheckDecisions:decisions.filter(x=>x.checkId!==check.id)};
    if(check.oneTime){patch.OneTimeMaintenanceChecks=oneTimes.map(t=>t.id===check.oneTime.id?{...t,completedAt:null,hidden:false}:t);}
    savePatch(patch,'Check restored.');
  }
  function makeOneTime(check){
    if(oneTimes.some(t=>t.modCheckId===check.id&&t.sourceSignature===check.signature)){
      setFeedback('This check already has a one-time task. Find it in Upcoming reminders.');return;
    }
    const one={id:crypto.randomUUID(),name:check.title,modCheckId:check.id,
      sourceSignature:check.signature,dueDate:'',dueMileage:'',createdAt:new Date().toISOString()};
    savePatch({OneTimeMaintenanceChecks:[...oneTimes,one],
      ModMaintenanceCheckDecisions:decisions.filter(d=>d.checkId!==check.id)},
      'One-time check added to Upcoming reminders. Mark it Done after inspecting.');
  }
  const addressed=workflow.scheduled.length+workflow.completed.length+workflow.ignored.length;
  return <section className="garage-panel garage-mod-health" aria-labelledby="mod-maintenance-heading" id="mod-maintenance-section">
    <div className="garage-panel-heading"><div><p className="eyebrow">Based on installed modifications</p>
      <h2 id="mod-maintenance-heading">Modification-aware maintenance</h2></div>
      <span className="mod-health-count">{workflow.pending.length} remaining / {workflow.items.length} total</span></div>
    <p className="mod-health-intro">Work through the checks below. Set a recurring interval, add a one-time check, mark an inspection completed, or ignore a suggestion. Scheduled and handled items leave this queue, but can always be reviewed and restored.</p>
    {vehicle&&workflow.items.length>0&&<div className="mod-health-progress"><div className="mod-health-progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax={workflow.items.length} aria-valuenow={addressed} aria-label="Checks addressed"><span style={{width:`${addressed*100/workflow.items.length}%`}}/></div>
      <small>{workflow.scheduled.length} scheduled · {workflow.completed.length} completed · {workflow.ignored.length} ignored</small></div>}
    {!vehicle?<p className="empty-state">Select a vehicle to see modification checks.</p>
      : workflow.items.length===0?<p className="empty-state">No maintenance-specific checks match your installed modifications. Cosmetic accessories such as decorative trim do not automatically trigger unrelated electrical or safety reminders. Use a custom or one-time reminder for anything you wish to track manually.</p>
      : <>
        {!workflow.pending.length&&<p className="mod-health-success">All {workflow.items.length} checks addressed. Review them below any time.</p>}
        <div className="mod-health-grid">{visible.map(check=>{
          const conditional=check.triggers.every(x=>x.conditional);
          const choice=saved.find(x=>x.checkId===check.id);
          const effective=plan.reminders.find(r=>r.modCheckIds?.includes(check.id));
          const status=effective?calculateReminder(effective,vehicle.Services||[],vehicle.Mileage):null;
          const editing=editingId===check.id&&draft;
          return <article className="mod-health-card" key={check.id}>
            <div className="mod-health-card-top"><span className="mod-health-group">{check.group}</span>
              <span className="mod-health-type">{check.status==='pending'?(conditional?'Conditional check':'Suggested check')
                :check.status==='scheduled'?'Scheduled':check.status==='completed'?'Completed':'Ignored'}</span></div>
            <h3>{check.title}</h3><p>{check.action}</p>
            <p className="mod-health-causes"><strong>Triggered by:</strong> {[...new Set(check.triggers.map(t=>t.modName))].join(', ')}</p>
            {effective&&<div className="mod-health-schedule"><strong>Active schedule:</strong> {prettyInterval(effective)}
              <span>{status?.needsBaseline?'Add matching service history':status?.mileageText||'Scheduled'}{status?.nextDate?` · ${status.nextDate}`:''}</span></div>}
            {check.oneTime&&!check.oneTime.completedAt&&<p className="mod-health-schedule">One-time check added to Upcoming reminders.</p>}
            <details className="mod-health-details"><summary>Why this check?</summary><ul>{check.triggers.map((trigger,i)=><li key={`${trigger.ruleId}-${i}`}><strong>{trigger.modName}:</strong> {trigger.why}{trigger.conditional?' (If symptoms occur)':''}</li>)}</ul>
              {check.sources.length>0&&<p className="mod-health-sources">References: {check.sources.map((source,i)=><span key={`${source.url}-${i}`}>{i?' · ':''}<a href={source.url} target="_blank" rel="noopener noreferrer">{source.name}</a></span>)}</p>}</details>
            <div className="mod-health-actions">
              {check.status==='pending'&&<>
                <button className="secondary-button" type="button" onClick={()=>editing?setEditingId(null):startEdit(check)}>{editing?'Cancel':'Set recurring interval'}</button>
                <button className="secondary-button" type="button" disabled={busy} onClick={()=>makeOneTime(check)}>One-time check</button>
                <button className="mod-health-text-button" type="button" disabled={busy} onClick={()=>setDecision(check,'completed')}>✓ Checked</button>
                <button className="mod-health-text-button" type="button" disabled={busy} onClick={()=>setDecision(check,'ignored')}>Ignore</button>
              </>}
              {check.status==='scheduled'&&<>
                {choice&&<button className="secondary-button" type="button" onClick={()=>editing?setEditingId(null):startEdit(check)}>{editing?'Cancel':'Edit interval'}</button>}
                {choice&&<button className="mod-health-text-button" type="button" disabled={busy} onClick={()=>savePatch({ModMaintenanceIntervals:saved.filter(x=>x.checkId!==check.id)},'Interval removed; this check is pending again.')}>Remove interval</button>}
                {check.oneTime&&<button className="mod-health-text-button" type="button" onClick={()=>document.getElementById('one-time-checks')?.scrollIntoView({behavior:'smooth'})}>View one-time task</button>}
              </>}
              {(check.status==='ignored'||check.status==='completed')&&<button className="secondary-button" type="button" disabled={busy} onClick={()=>restore(check)}>Restore check</button>}
            </div>
            {editing&&<div className="mod-health-editor">
              <label>Schedule type<select value={draft.mode} onChange={e=>chooseMode(e.target.value)}><option value="new">New recurring reminder</option>{reminders.length>0&&<option value="existing">Shorten existing reminder</option>}</select></label>
              {draft.mode==='existing'?<label>Existing reminder<select value={draft.name} onChange={e=>setDraft(p=>({...p,name:e.target.value,mileage:'',months:''}))}>{reminders.map((r,i)=><option key={`${r.name}-${i}`} value={r.name}>{r.name} · {prettyInterval(r)}</option>)}</select></label>
                :<label>Inspection name<input maxLength="80" value={draft.name} onChange={e=>setDraft(p=>({...p,name:e.target.value}))}/></label>}
              {draft.mode==='existing'&&<p className="mod-health-baseline">Original: {prettyInterval(reminders.find(r=>r.name===draft.name))}. Leave a field blank to keep its original value.</p>}
              <div className="mod-health-interval-inputs"><label>Miles<input type="number" step="500" min="500" max="100000" placeholder="e.g. 3000" value={draft.mileage} onChange={e=>setDraft(p=>({...p,mileage:e.target.value}))}/></label>
                <label>Months<input type="number" step="0.5" min="0.5" max="60" placeholder="Optional" value={draft.months} onChange={e=>setDraft(p=>({...p,months:e.target.value}))}/></label></div>
              <p className="mod-health-note">You select these intervals; GarageIQ does not invent a manufacturer schedule. Original custom reminder values stay saved and return when the modification is removed.</p>
              <button className="primary-button" type="button" disabled={busy} onClick={()=>saveDraft(check)}>{busy?'Saving...':'Save modified schedule'}</button>
            </div>}
          </article>;
        })}</div>
        {displayed.length>PREVIEW_LIMIT&&<button className="secondary-button mod-health-toggle" type="button" onClick={()=>setShowAll(!showAll)}>{showAll?'Show fewer':`Show all ${displayed.length} checks`}</button>}
        {handled.length>0&&<button className="secondary-button mod-health-toggle" type="button" onClick={()=>{setShowHandled(v=>!v);setShowAll(false);}}>{showHandled?'Hide addressed checks':`Review ${handled.length} addressed checks`}</button>}
      </>}
    {feedback&&<p className="mod-health-note" role="status">{feedback}</p>}
    <p className="mod-health-note">This is advisory guidance, not a manufacturer service schedule. Confirm intervals with the vehicle and parts manufacturers. Only installed modifications activate extra schedules.</p>
  </section>;
}
