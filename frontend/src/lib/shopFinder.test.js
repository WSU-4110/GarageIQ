import assert from 'node:assert/strict';
import test from 'node:test';
import { ShopSearchClient } from './shopFinder.js';

test('ShopSearchClient sends ZIP/city, service, make, and optional auth token', async () => {
  let request;
  const client = new ShopSearchClient('/api', async (url, options) => {
    request = { url, options };
    return { ok: true, json: async () => ({ shops: [{ id: '1', name: 'Example' }] }) };
  });
  const shops = await client.search({ getIdToken: async () => 'test-token' }, { location: '48212', service: 'tuning', make: 'Subaru' });
  assert.equal(shops.length, 1);
  assert.equal(request.options.headers.Authorization, 'Bearer test-token');
  const url = new URL(request.url, 'http://localhost');
  assert.equal(url.pathname, '/api/shops');
  assert.equal(url.searchParams.get('location'), '48212');
  assert.equal(url.searchParams.get('service'), 'tuning');
  assert.equal(url.searchParams.get('make'), 'Subaru');
});

test('ShopSearchClient validates location and provider errors', async () => {
  const client = new ShopSearchClient('/api', async () => ({ ok: false, status: 503, json: async () => ({ detail: 'API not configured' }) }));
  await assert.rejects(client.search(null, { location: ' ' }), /ZIP code or city/);
  await assert.rejects(client.search(null, { location: 'Detroit' }), /API not configured/);
});
