import { getModMaintenanceRecommendations, normalizeModText } from './modMaintenanceRules.js';
import { intervalError } from './maintenanceRules.js';

// A modification may suggest an extra inspection without prescribing a mileage.
// Owners explicitly choose a schedule; existing reminders are never overwritten.
export function validateModIntervalChoice(input, vehicle) {
  const recommendations = getModMaintenanceRecommendations(vehicle?.Modifications || []);
  if (!recommendations.some(check => check.id === input?.checkId)) {
    return 'This maintenance check is not active for the selected vehicle.';
  }
  const mode = input?.mode === 'existing' ? 'existing' : 'new';
  const name = String(input?.name || '').trim();
  if (!name || name.length > 80) return 'Enter a service name (up to 80 characters).';
  const baseReminders = Array.isArray(vehicle?.Reminders) ? vehicle.Reminders : [];
  if (mode === 'existing') {
    const base = baseReminders.find(reminder => reminder.name === name);
    if (!base) return 'Select an existing maintenance reminder.';
    for (const field of ['mileage', 'months']) {
      const current = Number(base[field]);
      const proposed = Number(input[field]);
      // A blank adjustment keeps the corresponding original interval.
      if (String(input[field] ?? '').trim() && String(base[field] ?? '').trim() &&
          Number.isFinite(proposed) && proposed > current) {
        return `The modified ${field} interval must not be longer than the original.`;
      }
    }
    if (!String(input.mileage ?? '').trim() && !String(input.months ?? '').trim()) {
      return 'Enter a shorter mileage or time interval to review.';
    }
  } else if (baseReminders.some(reminder => normalizeModText(reminder.name) === normalizeModText(name))) {
    return 'A reminder with this name already exists. Choose Existing reminder instead.';
  }
  return intervalError([{ name, mileage: input.mileage ?? '', months: input.months ?? '' }]);
}

function validChoice(choice) {
  return choice && typeof choice.checkId === 'string' &&
    (choice.mode === 'existing' || choice.mode === 'new') &&
    typeof choice.name === 'string' && choice.name.trim() &&
    !intervalError([{ name: choice.name, mileage: choice.mileage ?? '', months: choice.months ?? '' }]);
}

function minimumPositive(current, proposed) {
  const a = Number(current);
  const b = Number(proposed);
  if (String(proposed ?? '').trim() === '' || !Number.isFinite(b) || b <= 0) return current;
  if (String(current ?? '').trim() === '' || !Number.isFinite(a) || a <= 0) return String(b);
  return String(Math.min(a, b));
}

// Return reminders to DISPLAY/CALCULATE, never the stored base reminders themselves.
// If the mod is removed, the saved override goes inactive and baseline is restored.
export function getEffectiveMaintenancePlan(vehicle) {
  const base = Array.isArray(vehicle?.Reminders) ? vehicle.Reminders : [];
  const original = base.map(reminder => ({ ...reminder }));
  const checks = getModMaintenanceRecommendations(vehicle?.Modifications || []);
  const byId = new Map(checks.map(check => [check.id, check]));
  const choices = Array.isArray(vehicle?.ModMaintenanceIntervals) ? vehicle.ModMaintenanceIntervals : [];
  const activeChoices = [];
  for (const choice of choices) {
    if (!validChoice(choice) || !byId.has(choice.checkId)) continue;
    if (validateModIntervalChoice(choice, vehicle)) continue;
    const check = byId.get(choice.checkId);
    if (choice.mode === 'existing') {
      const index = original.findIndex(reminder => reminder.name === choice.name);
      if (index < 0) continue;
      const updated = original[index];
      updated.mileage = minimumPositive(updated.mileage, choice.mileage);
      updated.months = minimumPositive(updated.months, choice.months);
      updated.modBased = true;
      updated.modCheckIds = [...new Set([...(updated.modCheckIds || []), choice.checkId])];
      updated.modCauses = [...new Set([...(updated.modCauses || []), ...check.triggers.map(t => t.modName)])];
    } else {
      if (original.some(reminder => normalizeModText(reminder.name) === normalizeModText(choice.name))) continue;
      original.push({ name: choice.name, mileage: String(choice.mileage ?? ''),
        months: String(choice.months ?? ''), modBased: true,
        modCheckIds: [choice.checkId], modCauses: [...new Set(check.triggers.map(t => t.modName))] });
    }
    activeChoices.push(choice);
  }
  return { reminders: original, activeChoices, checks };
}
