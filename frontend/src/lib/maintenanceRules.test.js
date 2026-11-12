import assert from 'node:assert/strict';
import test from 'node:test';

import { calculateReminder } from './maintenanceRules.js';

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
