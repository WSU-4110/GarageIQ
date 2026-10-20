// Shared display + validation for maintenance records and reminders.
export const MAX_ODOMETER = 2000000;
export const MAX_INTERVAL_MILES = 100000;
export const MIN_INTERVAL_MILES = 500;
export const MAX_MONTHS = 60;
// Local date avoids UTC off-by-one issues near midnight.
export function todayLocalISO() {
  const now = new Date();
  return [now.getFullYear(), String(now.getMonth()+1).padStart(2,'0'), String(now.getDate()).padStart(2,'0')].join('-');
}
export function isFutureDate(value) { return Boolean(value && value > todayLocalISO()); }
export function monthsDraft(value) {
  // Allow temporary values like "2." while typing; validation runs on save.
  return String(value ?? '').replace(/[^0-9.]/g,'').replace(/(\..*)\./g,'$1').slice(0,5);
}

export function digitsOnly(value) { return String(value ?? '').replace(/[^0-9]/g, '').slice(0, 7); }
export function isOdometer(value) { return value === '' || (Number.isSafeInteger(Number(value)) && /^\d+$/.test(String(value)) && Number(value) >= 0 && Number(value) <= MAX_ODOMETER); }
export function intervalError(reminders) {
  for (const [i, r] of reminders.entries()) {
    const miles = String(r.mileage ?? '').trim();
    const months = String(r.months ?? '').trim();
    if (!String(r.name ?? '').trim()) return `Reminder ${i + 1}: enter a maintenance item name.`;
    if (!miles && !months) return `Reminder ${i + 1}: choose a mileage or time interval.`;
    if (miles && (!/^\d+$/.test(miles) || Number(miles) < MIN_INTERVAL_MILES || Number(miles) > MAX_INTERVAL_MILES || Number(miles) % 500 !== 0)) return `Reminder ${i + 1}: mileage intervals must be 500–100,000, in steps of 500.`;
    if (months && (!Number.isFinite(Number(months)) || Number(months) < 0.5 || Number(months) > MAX_MONTHS || !Number.isInteger(Number(months) * 2))) return `Reminder ${i + 1}: time intervals must be 0.5–60 months in half-month steps.`;
  }
  return '';
}
export function maintenanceError(services, reminders) {
  for (const [i, s] of services.entries()) {
    if (!isOdometer(String(s.mileage ?? ''))) return `Service ${i + 1}: mileage must be a whole number between 0 and 2,000,000.`;
    if (s.date && !/^\d{4}-\d{2}-\d{2}$/.test(s.date)) return `Service ${i + 1}: enter a valid date.`;
    if (isFutureDate(s.date)) return `Service ${i + 1}: future service and repair dates are not allowed.`;
  }
  return intervalError(reminders);
}
export function plusMonths(dateString, months) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString || '') || !months) return null;
  const [y, m, d] = dateString.split('-').map(Number);
  const whole = Math.trunc(Number(months));
  const half = Number(months) - whole;
  const first = new Date(y, m - 1, 1, 12);
  first.setMonth(first.getMonth() + whole);
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  first.setDate(Math.min(d, lastDay));
  if (half) first.setDate(first.getDate() + 15); // Half-month convention: 15 calendar days
  return first;
}
export function calculateReminder(reminder, services, currentMileage, today = new Date()) {
  const matching = services.filter(s => String(s.name || '').trim().toLowerCase() === String(reminder.name || '').trim().toLowerCase());
  const byDate = matching.filter(s => /^\d{4}-\d{2}-\d{2}$/.test(s.date || '')).sort((a,b) => b.date.localeCompare(a.date))[0];
  const byMiles = matching.filter(s => isOdometer(String(s.mileage ?? '')) && String(s.mileage ?? '') !== '').sort((a,b) => Number(b.mileage) - Number(a.mileage))[0];
  const hasMiles = String(reminder.mileage ?? '') !== '' && Number(reminder.mileage) >= MIN_INTERVAL_MILES;
  const hasTime = String(reminder.months ?? '') !== '' && Number(reminder.months) >= 0.5;
  const targetMiles = hasMiles && byMiles ? Number(byMiles.mileage) + Number(reminder.mileage) : null;
  const remainingMiles = targetMiles !== null && isOdometer(String(currentMileage ?? '')) && String(currentMileage ?? '') !== '' ? targetMiles - Number(currentMileage) : null;
  const dueDate = hasTime && byDate ? plusMonths(byDate.date, Number(reminder.months)) : null;
  const dueNow = (remainingMiles !== null && remainingMiles <= 0) || (dueDate && dueDate.getTime() < new Date(today.getFullYear(), today.getMonth(), today.getDate()+1).getTime());
  const nextDate = dueDate ? dueDate.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'}) : '';
  const mileageText = remainingMiles === null ? (hasMiles ? 'Needs service mileage' : 'No mileage interval') : (remainingMiles <= 0 ? 'Mileage due' : `${remainingMiles.toLocaleString()} mi remaining`);
  return { dueNow: Boolean(dueNow), remainingMiles, dueDate, nextDate, mileageText, needsBaseline: Boolean((hasMiles && targetMiles === null) || (hasTime && !byDate)) };
}
