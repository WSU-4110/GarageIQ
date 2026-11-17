import assert from 'node:assert/strict';
import test from 'node:test';

import {
  calculateReminder,
  digitsOnly,
  intervalError,
  isOdometer,
  maintenanceError,
  MileageReminderStrategy,
  monthsDraft,
  plusMonths,
  ReminderCalculator,
  TimeReminderStrategy,
} from './maintenanceRules.js';

const today = new Date(2026, 0, 2, 12);

test('marks maintenance due within 500 miles as due soon', () => {
  const status = calculateReminder(
    { name: 'Oil change', mileage: '5000' },
    [{ name: 'Oil change', mileage: '1000' }],
    '5500',
    today
  );

  assert.equal(status.dueSoon, true);
  assert.equal(status.dueNow, false);
});

test('marks maintenance overdue by mileage separately from due soon', () => {
  const status = calculateReminder(
    { name: 'Oil change', mileage: '5000' },
    [{ name: 'Oil change', mileage: '1000' }],
    '6100',
    today
  );

  assert.equal(status.dueNow, true);
  assert.equal(status.overdue, true);
  assert.equal(status.mileageText, '100 mi overdue');
});

test('marks maintenance due within 30 days as due soon', () => {
  const status = calculateReminder(
    { name: 'Brake fluid', months: '1' },
    [{ name: 'Brake fluid', date: '2026-01-01' }],
    '',
    today
  );

  assert.equal(status.daysRemaining, 30);
  assert.equal(status.dueSoon, true);
  assert.equal(status.dueNow, false);
});

test('does not mark maintenance due beyond the due-soon window', () => {
  const status = calculateReminder(
    { name: 'Brake fluid', months: '1' },
    [{ name: 'Brake fluid', date: '2026-01-01' }],
    '',
    new Date(2026, 0, 1, 12)
  );

  assert.equal(status.daysRemaining, 31);
  assert.equal(status.dueSoon, false);
  assert.equal(status.dueNow, false);
});

test('marks date-based maintenance overdue after its due date', () => {
  const status = calculateReminder(
    { name: 'Brake fluid', months: '1' },
    [{ name: 'Brake fluid', date: '2026-01-01' }],
    '',
    new Date(2026, 1, 2, 12)
  );

  assert.equal(status.dueNow, true);
  assert.equal(status.overdue, true);
});

test('does not create recommendations without a saved interval', () => {
  const status = calculateReminder(
    { name: 'Oil change' },
    [{ name: 'Oil change', mileage: '1000', date: '2026-01-01' }],
    '1000',
    today
  );

  assert.equal(status.dueSoon, false);
  assert.equal(status.dueNow, false);
  assert.equal(status.needsBaseline, false);
});

test('asks for a matching service record when an interval has no baseline', () => {
  const status = calculateReminder(
    { name: 'Oil change', mileage: '5000' },
    [],
    '1000',
    today
  );

  assert.equal(status.needsBaseline, true);
  assert.equal(status.dueSoon, false);
  assert.equal(status.dueNow, false);
});

test('monthsDraft keeps one decimal point and allows an in-progress value', () => {
  assert.equal(monthsDraft(' 1.5 months'), '1.5');
  assert.equal(monthsDraft('2..5'), '2.5');
  assert.equal(monthsDraft('123456'), '12345');
  assert.equal(monthsDraft(null), '');
});

test('digitsOnly strips non-digits and caps input at seven digits', () => {
  assert.equal(digitsOnly('12,345 mi'), '12345');
  assert.equal(digitsOnly('12345678'), '1234567');
  assert.equal(digitsOnly(undefined), '');
});

test('isOdometer accepts blank and whole-number values only within bounds', () => {
  assert.equal(isOdometer(''), true);
  assert.equal(isOdometer('0'), true);
  assert.equal(isOdometer('2000000'), true);
  assert.equal(isOdometer('2000001'), false);
  assert.equal(isOdometer('-1'), false);
  assert.equal(isOdometer('1.5'), false);
  assert.equal(isOdometer('1e3'), false);
});

test('intervalError validates required names, intervals, range, and half-month steps', () => {
  assert.equal(intervalError([]), '');
  assert.match(intervalError([{ mileage: '5000' }]), /enter a maintenance item name/);
  assert.match(intervalError([{ name: 'Oil' }]), /choose a mileage or time interval/);
  assert.match(intervalError([{ name: 'Oil', mileage: '501' }]), /steps of 500/);
  assert.match(intervalError([{ name: 'Oil', mileage: '100500' }]), /steps of 500/);
  assert.match(intervalError([{ name: 'Oil', months: '0.4' }]), /half-month steps/);
  assert.match(intervalError([{ name: 'Oil', months: '1.2' }]), /half-month steps/);
  assert.equal(intervalError([{ name: 'Oil', mileage: '500', months: '1.5' }]), '');
});

test('maintenanceError validates service records before reminder intervals', () => {
  assert.match(maintenanceError([{ mileage: '2000001' }], []), /Service 1: mileage/);
  assert.match(maintenanceError([{ mileage: '1200', date: '2026-1-02' }], []), /valid date/);
  assert.match(maintenanceError([{ mileage: '1200', date: '2999-01-01' }], []), /future/);
  assert.match(maintenanceError([], [{ name: 'Oil' }]), /choose a mileage or time interval/);
  assert.equal(maintenanceError([{ mileage: '0', date: '' }], [{ name: 'Oil', mileage: '500' }]), '');
});

test('plusMonths handles month ends, half-month intervals, and invalid inputs', () => {
  assert.equal(plusMonths('2024-01-31', 1).toISOString().slice(0, 10), '2024-02-29');
  assert.equal(plusMonths('2026-01-01', 0.5).toISOString().slice(0, 10), '2026-01-16');
  assert.equal(plusMonths('not-a-date', 2), null);
  assert.equal(plusMonths('2026-01-01', 0), null);
});

test('MileageReminderStrategy.calculate picks the latest valid matching mileage', () => {
  const strategy = new MileageReminderStrategy();
  const result = strategy.calculate(
    { name: ' Oil Change ', mileage: '5000' },
    [
      { name: 'Oil Change', mileage: '1000' },
      { name: 'oil change', mileage: '2000' },
      { name: 'Tires', mileage: '9000' },
      { name: 'Oil Change', mileage: 'bad' },
    ],
    '6500'
  );
  assert.equal(result.remainingMiles, 500);
  assert.equal(result.mileageText, '500 mi remaining');
  assert.equal(result.dueNow, false);
  assert.equal(result.needsBaseline, false);
});

test('TimeReminderStrategy.calculate uses the latest matching service date', () => {
  const result = new TimeReminderStrategy().calculate(
    { name: 'Brake fluid', months: '1' },
    [
      { name: 'brake fluid', date: '2025-11-01' },
      { name: 'Brake fluid', date: '2025-12-01' },
      { name: 'Tires', date: '2025-12-20' },
    ],
    '',
    new Date(2025, 11, 15, 12)
  );
  assert.equal(result.daysRemaining, 17);
  assert.equal(result.dueNow, false);
  assert.equal(result.needsBaseline, false);
  assert.ok(result.dueDate instanceof Date);
});

test('ReminderCalculator combines strategy results and supports injected strategies', () => {
  const calculator = new ReminderCalculator([
    { calculate: () => ({ dueNow: true, overdue: true, remainingMiles: -10, needsBaseline: false }) },
    { calculate: () => ({ dueNow: false, overdue: false, daysRemaining: 10, needsBaseline: true }) },
  ]);
  const result = calculator.calculate({}, [], '', today);
  assert.equal(result.dueNow, true);
  assert.equal(result.overdue, true);
  assert.equal(result.remainingMiles, -10);
  assert.equal(result.daysRemaining, 10);
  assert.equal(result.dueSoon, false);
  assert.equal(result.needsBaseline, true);
});
