import { calculateReminder } from './maintenanceRules.js';

// Adds garage-state suggestions without duplicating backend fitment/compatibility rules.
// The existing advisor endpoint remains the authority for supported modifications.
export class GarageRecommendationEngine {
  evaluate(vehicle, today = new Date()) {
    if (!vehicle) return [];
    const services = Array.isArray(vehicle.Services) ? vehicle.Services : [];
    const reminders = Array.isArray(vehicle.Reminders) ? vehicle.Reminders : [];
    const modifications = Array.isArray(vehicle.Modifications) ? vehicle.Modifications : [];
    const suggestions = [];

    for (const [index, reminder] of reminders.entries()) {
      if (!reminder?.name) continue;
      const result = calculateReminder(reminder, services, vehicle.Mileage, today);
      if (result.overdue || result.dueNow || result.dueSoon || result.needsBaseline) {
        const label = result.overdue ? 'Overdue' : result.dueNow ? 'Due now' : result.dueSoon ? 'Due soon' : 'Missing history';
        suggestions.push({
          id: `service-${index}`, type: 'maintenance', priority: result.dueNow ? 0 : result.dueSoon ? 1 : 2,
          title: `${reminder.name}: ${label}`,
          detail: result.needsBaseline && !result.dueNow && !result.dueSoon
            ? 'Add a matching service record to calculate the next interval.'
            : [result.mileageText !== 'No mileage interval' ? result.mileageText : '', result.nextDate].filter(Boolean).join(' · '),
        });
      }
    }

    for (const [index, mod] of modifications.entries()) {
      if (!mod || typeof mod === 'string' || mod.status !== 'Planned') continue;
      const name = String(mod.title || mod.name || '').trim();
      if (!name) continue;
      suggestions.push({
        id: `planned-${index}`, type: 'compatibility', priority: 3,
        title: `Check fitment: ${name}`,
        detail: 'Use the existing advisor to verify vehicle fitment, required parts and conflicts before installation.',
      });
    }
    return suggestions.sort((a, b) => a.priority - b.priority);
  }
}

export const garageRecommendationEngine = new GarageRecommendationEngine();
