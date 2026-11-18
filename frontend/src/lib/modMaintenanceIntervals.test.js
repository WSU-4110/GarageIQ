import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateReminder } from './maintenanceRules.js';
import { getEffectiveMaintenancePlan, validateModIntervalChoice } from './modMaintenanceIntervals.js';

const installed = (title, category = 'Tune') => ({ title, category, status: 'Installed' });
const baseVehicle = {
  Mileage: '11000',
  Modifications: [installed('Higher boost tune')],
  Reminders: [{ name: 'Spark plugs', mileage: '5000', months: '12' }],
  Services: [{ name: 'Spark plugs', mileage: '8000', date: '2026-01-01' }],
  ModMaintenanceIntervals: [],
};
const choice = { checkId: 'spark-plugs', mode: 'existing', name: 'Spark plugs', mileage: '2000', months: '' };

test('stock baseline stays unchanged when no adjustment is saved', () => {
  assert.equal(getEffectiveMaintenancePlan(baseVehicle).reminders[0].mileage, '5000');
});
test('an installed tune activates an explicitly chosen shorter interval', () => {
  const vehicle = { ...baseVehicle, ModMaintenanceIntervals: [choice] };
  const plan = getEffectiveMaintenancePlan(vehicle);
  assert.equal(plan.reminders[0].mileage, '2000');
  assert.equal(plan.reminders[0].months, '12');
  assert.equal(plan.reminders[0].modBased, true);
  const state = calculateReminder(plan.reminders[0], vehicle.Services, vehicle.Mileage);
  assert.equal(state.overdue, true);
});
test('removing the modification restores the original interval', () => {
  const v = { ...baseVehicle, Modifications: [], ModMaintenanceIntervals: [choice] };
  assert.equal(getEffectiveMaintenancePlan(v).reminders[0].mileage, '5000');
});
test('planned mods never activate adjustments', () => {
  const v = { ...baseVehicle, Modifications: [{ ...installed('Higher boost tune'), status: 'Planned' }], ModMaintenanceIntervals: [choice] };
  assert.equal(getEffectiveMaintenancePlan(v).reminders[0].mileage, '5000');
});
test('rejects longer modifications to existing schedules', () => {
  const error = validateModIntervalChoice({ ...choice, mileage: '6000' }, baseVehicle);
  assert.match(error, /must not be longer/);
});
test('rejects unsupported checks and missing interval', () => {
  assert.match(validateModIntervalChoice({ ...choice, checkId: 'not-real' }, baseVehicle), /not active/);
  assert.match(validateModIntervalChoice({ ...choice, mileage: '' }, baseVehicle), /Enter a shorter/);
});
test('new mod-specific schedule is added without editing base reminders', () => {
  const add = { checkId: 'spark-plugs', mode: 'new', name: 'Tune spark plug inspection', mileage: '1000', months: '' };
  const v = { ...baseVehicle, ModMaintenanceIntervals: [add] };
  const plan = getEffectiveMaintenancePlan(v);
  assert.equal(plan.reminders.length, 2);
  assert.equal(plan.reminders[1].mileage, '1000');
  assert.equal(baseVehicle.Reminders.length, 1);
  assert.equal(baseVehicle.Reminders[0].mileage, '5000');
});
test('no service history produces needsBaseline rather than a fabricated deadline', () => {
  const v = { ...baseVehicle, Services: [], ModMaintenanceIntervals: [choice] };
  const effective = getEffectiveMaintenancePlan(v).reminders[0];
  assert.equal(calculateReminder(effective, [], v.Mileage).needsBaseline, true);
});
test('multiple mods use strictest approved interval without duplicate reminder', () => {
  const v = { ...baseVehicle, Modifications: [installed('Higher boost tune'), installed('Higher boost tune')],
    ModMaintenanceIntervals: [choice, { ...choice, checkId: 'spark-plugs', mileage: '1500' }] };
  const plan = getEffectiveMaintenancePlan(v);
  assert.equal(plan.reminders.length, 1);
  assert.equal(plan.reminders[0].mileage, '1500');
});
test('different vehicles do not share interval preferences', () => {
  const a = getEffectiveMaintenancePlan({ ...baseVehicle, ModMaintenanceIntervals: [choice] });
  const b = getEffectiveMaintenancePlan({ ...baseVehicle, ModMaintenanceIntervals: [] });
  assert.equal(a.reminders[0].mileage, '2000');
  assert.equal(b.reminders[0].mileage, '5000');
});
test('conditional inspection can be user-scheduled but is not scheduled automatically', () => {
  const v = { ...baseVehicle, Modifications: [installed('Burble tune')] };
  const before = getEffectiveMaintenancePlan(v);
  assert.equal(before.activeChoices.length, 0);
  const custom = { checkId: 'spark-plugs', mode: 'new', name: 'Burble spark plug inspection', mileage: '2000', months: '' };
  const after = getEffectiveMaintenancePlan({ ...v, ModMaintenanceIntervals: [custom] });
  assert.equal(after.activeChoices.length, 1);
});
test('Stage 1 ECU Tune matches ignition guidance when named in the build log', () => {
  const v = { ...baseVehicle, Modifications: [installed('Stage 1 ECU Tune')], ModMaintenanceIntervals: [choice] };
  assert.equal(getEffectiveMaintenancePlan(v).reminders[0].mileage, '2000');
});
