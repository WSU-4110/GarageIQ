import assert from 'node:assert/strict';
import test from 'node:test';
import { GarageRecommendationEngine } from './recommendationRules.js';

const engine = new GarageRecommendationEngine();
const today = new Date(2026, 0, 2, 12);

test('prioritizes overdue maintenance and planned modifications for compatibility checking', () => {
  const vehicle = {
    Mileage: '6500', Services: [{ name: 'Oil change', mileage: '1000' }],
    Reminders: [{ name: 'Oil change', mileage: '5000' }],
    Modifications: [{ title: 'Coilovers', status: 'Planned' }, { title: 'Intake', status: 'Installed' }],
  };
  const recommendations = engine.evaluate(vehicle, today);
  assert.deepEqual(recommendations.map(item => item.type), ['maintenance', 'compatibility']);
  assert.match(recommendations[0].title, /Overdue/);
  assert.match(recommendations[1].title, /Coilovers/);
});

test('does not invent maintenance advice without saved intervals', () => {
  assert.deepEqual(engine.evaluate({ Services: [], Reminders: [], Modifications: [] }, today), []);
  assert.deepEqual(engine.evaluate(null, today), []);
});
