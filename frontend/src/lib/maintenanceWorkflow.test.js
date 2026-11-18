import test from 'node:test';
import assert from 'node:assert/strict';
import { checkSignature, getCheckWorkflow, getVisibleReminders, getActiveOneTimeChecks, oneTimeStatus, validateOneTime, reminderKey } from './maintenanceWorkflow.js';

const mod = (title, category='Suspension') => ({ title, category, status:'Installed' });
const vehicle = () => ({ Modifications:[mod('Coilovers')], Reminders:[{name:'Oil Change',mileage:'5000'}],
  Services:[], ModMaintenanceIntervals:[], OneTimeMaintenanceChecks:[], ModMaintenanceCheckDecisions:[], HiddenMaintenanceReminders:[] });

test('new checks are pending until addressed', () => {
  const x=getCheckWorkflow(vehicle());assert.ok(x.pending.length>0);assert.equal(x.scheduled.length,0);
});
test('a saved modified schedule moves a check from pending to scheduled',()=>{
  const v=vehicle();const check=getCheckWorkflow(v).pending[0];
  v.ModMaintenanceIntervals=[{checkId:check.id, mode:'new',name:check.title,mileage:'1000',months:''}];
  assert.ok(getCheckWorkflow(v).scheduled.some(x=>x.id===check.id));
});
test('completed and ignored checks do not remain in pending queue',()=>{
  const v=vehicle();const [a,b]=getCheckWorkflow(v).pending;
  v.ModMaintenanceCheckDecisions=[{checkId:a.id,signature:checkSignature(a),status:'completed'},
    {checkId:b.id,signature:checkSignature(b),status:'ignored'}];
  const state=getCheckWorkflow(v);assert.equal(state.completed.some(x=>x.id===a.id),true);
  assert.equal(state.ignored.some(x=>x.id===b.id),true);
});
test('new triggering mods reopen an old completed check',()=>{
  const v=vehicle();const target=getCheckWorkflow(v).pending.find(c=>c.id==='alignment');assert.ok(target);
  v.ModMaintenanceCheckDecisions=[{checkId:target.id,signature:target.signature,status:'completed'}];
  v.Modifications.push(mod('Adjustable rear camber arms'));
  const next=getCheckWorkflow(v).items.find(x=>x.id==='alignment');
  assert.notEqual(next.signature,target.signature); assert.equal(next.status,'pending');
});
test('hidden reminders are not deleted from effective schedule',()=>{
  const v=vehicle();v.HiddenMaintenanceReminders=['oil change'];
  const x=getVisibleReminders(v);assert.equal(x.visible.length,0);assert.equal(x.hidden.length,1);
  assert.equal(x.all.length,1);assert.equal(v.Reminders.length,1);
});
test('one-time tasks can be due, completed or dismissed independently',()=>{
  const x={name:'Tire inspection',dueMileage:'12000',dueDate:''};
  assert.equal(oneTimeStatus(x,'11500','2026-11-18'),'pending');
  assert.equal(oneTimeStatus(x,'12000','2026-11-18'),'due');
  assert.equal(oneTimeStatus({...x,completedAt:'2026-11-18'},'12000','2026-11-18'),'completed');
  assert.equal(oneTimeStatus({...x,hidden:true},'12000','2026-11-18'),'ignored');
  assert.equal(validateOneTime(x),'');
  assert.match(validateOneTime({...x,dueMileage:'banana'}),/mileage/);
});
test('mod-based one time is active only for original triggering mod set',()=>{
  const v=vehicle(),check=getCheckWorkflow(v).pending[0];
  v.OneTimeMaintenanceChecks=[{id:'one',name:check.title,modCheckId:check.id,sourceSignature:check.signature}];
  assert.equal(getActiveOneTimeChecks(v).length,1);
  v.Modifications=[]; assert.equal(getActiveOneTimeChecks(v).length,0);
});
test('reminder key normalizes punctuation and case',()=>{
  assert.equal(reminderKey('Oil Change'),reminderKey('oil-change'));
});
