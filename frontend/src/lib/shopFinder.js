const API_BASE = (import.meta.env?.VITE_API_BASE_URL || '/api').replace(/\/$/, '');

export class ShopSearchClient {
    constructor(baseUrl = API_BASE, fetchImpl = (...args) => fetch(...args)) {
    this.baseUrl = baseUrl;
    this.fetchImpl = fetchImpl;
  }

  async search(user, { location, service = 'performance', make = '' }) {
    const place = String(location || '').trim();
    if (place.length < 2 || place.length > 100) throw new Error('Enter a ZIP code or city.');
    const query = new URLSearchParams({ location: place, service, make: String(make).trim() });
    const headers = {};
    if (user?.getIdToken) headers.Authorization = `Bearer ${await user.getIdToken()}`;
    const response = await this.fetchImpl(`${this.baseUrl}/shops?${query}`, { headers });
    if (!response.ok) {
      let message = `Shop search failed (${response.status}).`;
      try { const json = await response.json(); if (typeof json.detail === 'string') message = json.detail; } catch { /* no JSON */ }
      throw new Error(message);
    }
    const data = await response.json();
    return Array.isArray(data.shops) ? data.shops : [];
  }
}

export const shopSearchClient = new ShopSearchClient();
