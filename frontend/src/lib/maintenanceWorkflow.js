import { getModMaintenanceRecommendations, normalizeModText } from './modMaintenanceRules.js';
import { getEffectiveMaintenancePlan } from './modMaintenanceIntervals.js';

export const reminderKey = (name) => normalizeModText(name);

export function activeChecks(vehicle) {
  return getModMaintenanceRecommendations(vehicle?.Modifications || []);
}

// A decision applies to the exact set of modifications that originally caused it.
// Installing a newly different mod that leads to the same check opens that check again.
export function checkSignature(check) {
  return (check?.triggers || []).map(t => `${t.ruleId}:${normalizeModText(t.modName)}`)
    .sort().join('|');
}

export function getCheckWorkflow(vehicle) {
  const checks = activeChecks(vehicle);
  const choices = getEffectiveMaintenancePlan(vehicle).activeChoices;
  const decisions = Array.isArray(vehicle?.ModMaintenanceCheckDecisions) ? vehicle.ModMaintenanceCheckDecisions : [];
  const oneTimes = Array.isArray(vehicle?.OneTimeMaintenanceChecks) ? vehicle.OneTimeMaintenanceChecks : [];
  const items = checks.map(check => {
    const signature = checkSignature(check);
    const decision = decisions.find(d => d.checkId === check.id && d.signature === signature);
    const oneTime = oneTimes.find(item => item.modCheckId === check.id && item.sourceSignature === signature);
    const scheduled = choices.some(choice => choice.checkId === check.id);
    // A completed one-time inspection is finished, not a perpetually scheduled check.
    const status = decision?.status === 'ignored' || (oneTime && oneTime.hidden) ? 'ignored'
      : decision?.status === 'completed' || (oneTime && oneTime.completedAt) ? 'completed'
      : scheduled || (oneTime && !oneTime.hidden) ? 'scheduled' : 'pending';
    return { ...check, signature, status, oneTime };
  });
  return {
    items,
    pending: items.filter(item => item.status === 'pending'),
    scheduled: items.filter(item => item.status === 'scheduled'),
    completed: items.filter(item => item.status === 'completed'),
    ignored: items.filter(item => item.status === 'ignored'),
  };
}

export function getVisibleReminders(vehicle) {
  const all = getEffectiveMaintenancePlan(vehicle).reminders;
  const hidden = new Set((vehicle?.HiddenMaintenanceReminders || []).map(reminderKey));
  return { visible: all.filter(r => !hidden.has(reminderKey(r.name))),
    hidden: all.filter(r => hidden.has(reminderKey(r.name))), all };
}

export function getActiveOneTimeChecks(vehicle) {
  const all = Array.isArray(vehicle?.OneTimeMaintenanceChecks) ? vehicle.OneTimeMaintenanceChecks : [];
  const signatures = new Map(activeChecks(vehicle).map(c => [c.id, checkSignature(c)]));
  return all.filter(check => !check.modCheckId || signatures.get(check.modCheckId) === check.sourceSignature);
}

export function oneTimeStatus(check, currentMileage, currentDate) {
  if (check.completedAt) return 'completed';
  if (check.hidden) return 'ignored';
  const mileage = Number(currentMileage);
  const mileDue = check.dueMileage !== '' && check.dueMileage != null &&
    Number.isFinite(mileage) && String(currentMileage ?? '') !== '' && mileage >= Number(check.dueMileage);
  const dateDue = Boolean(check.dueDate && check.dueDate <= currentDate);
  if (mileDue || dateDue) return 'due';
  return 'pending';
}

export function validateOneTime(check) {
  if (!String(check.name || '').trim() || String(check.name).length > 80) return 'Enter an inspection name (1–80 characters).';
  if (String(check.dueMileage ?? '') !== '' && (!/^\d+$/.test(String(check.dueMileage)) ||
    Number(check.dueMileage) > 2000000)) return 'Due mileage must be a whole number up to 2,000,000.';
  if (check.dueDate && !/^\d{4}-\d{2}-\d{2}$/.test(check.dueDate)) return 'Enter a valid due date.';
  return '';
}
