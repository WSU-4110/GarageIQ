import { useState } from 'react';
import { Link } from 'react-router-dom';
import GarageSidebar from '../components/GarageSidebar.jsx';
import useAuth from '../hooks/useAuth.js';
import useUserProfile from '../hooks/useUserProfile.js';
import { getActiveVehicle, vehicleLabel } from '../lib/vehicleData.js';
import { shopSearchClient } from '../lib/shopFinder.js';
import '../styles/shop-finder.css';

const services = [
  ['performance', 'Performance / general'], ['tuning', 'ECU tuning / dyno'],
  ['exhaust', 'Exhaust'], ['suspension', 'Suspension'], ['brakes', 'Brakes'], ['general', 'General repair'],
];

export default function ShopFinder() {
  const { user } = useAuth();
  const { profile, loading: profileLoading } = useUserProfile();
  const vehicle = getActiveVehicle(profile);
  const [location, setLocation] = useState('');
  const [service, setService] = useState('performance');
  const [useVehicle, setUseVehicle] = useState(true);
  const [shops, setShops] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();
    setError(''); setShops([]); setBusy(true); setSearched(false);
    try {
      const results = await shopSearchClient.search(user, {
        location, service, make: useVehicle && vehicle ? vehicle.Make : '',
      });
      setShops(results);
      setSearched(true);
    } catch (searchError) { setError(searchError.message); }
    finally { setBusy(false); }
  }

  return <div className="app-shell"><GarageSidebar selected="Find shops" />
    <main className="garage-page shop-finder-page">
      <header className="garage-page-header"><div>
        <p className="eyebrow orange">GarageIQ • Shop discovery</p>
        <h1>Find performance shops</h1>
        <p>Search real shop listings by ZIP code or city, service type and vehicle make.</p>
      </div><Link className="secondary-button" to="/dashboard">← Back to overview</Link></header>
      <section className="garage-panel">
        <div className="garage-panel-heading"><div><p className="eyebrow">Location & expertise</p><h2>Search nearby shops</h2></div></div>
        <form className="shop-finder-form" onSubmit={handleSearch}>
          <label>ZIP code or city
            <input aria-label="ZIP code or city" placeholder="48212 or Detroit, MI" value={location} maxLength={100} minLength={2} onChange={event => setLocation(event.target.value)} required />
          </label>
          <label>Service type
            <select aria-label="Service type" value={service} onChange={event => setService(event.target.value)}>
              {services.map(([value, title]) => <option key={value} value={value}>{title}</option>)}
            </select>
          </label>
          <label className="shop-check">
            <input type="checkbox" checked={useVehicle} disabled={profileLoading || !vehicle?.Make} onChange={event => setUseVehicle(event.target.checked)} />
            Specialize in my vehicle {vehicle?.Make ? `(${vehicle.Make})` : '(add a vehicle first)'}
          </label>
          <button className="primary-button" type="submit" disabled={busy || !location.trim()}>{busy ? 'Searching…' : 'Find shops'}</button>
        </form>
        {vehicle && <p className="field-hint">Active vehicle: {vehicleLabel(vehicle)}. Specialization is a search preference, not verified shop certification.</p>}
        {error && <p className="form-message error-message" role="alert">{error}</p>}
      </section>
      <section className="garage-panel"><div className="garage-panel-heading"><div><p className="eyebrow">Live listings</p><h2>Search results {searched ? `(${shops.length})` : ''}</h2></div></div>
        {shops.length ? <div className="shop-results">{shops.map(shop => <article className="shop-result" key={shop.id}>
          <div className="shop-result-info">
            <div className="shop-result-title"><h3>{shop.name}</h3>
              {typeof shop.rating === 'number' && <span className="shop-rating" aria-label={`${shop.rating.toFixed(1)} out of 5 on Google`}><span aria-hidden="true">★</span> {shop.rating.toFixed(1)} <small>Google</small></span>}
            </div>
            {shop.address && <p className="shop-address"><span aria-hidden="true">⌖</span>{shop.address}</p>}
            {shop.phone && <p className="shop-phone"><a href={`tel:${shop.phone.replace(/[^+\d]/g, '')}`}>{shop.phone}</a></p>}
          </div>
          <div className="shop-links">
            <a className="primary-button" href={shop.directions_url} target="_blank" rel="noopener noreferrer">Directions ↗</a>
            {shop.website && <a className="secondary-button" href={shop.website} target="_blank" rel="noopener noreferrer">Website ↗</a>}
            {shop.maps_url && <a className="secondary-button" href={shop.maps_url} target="_blank" rel="noopener noreferrer">View on Maps ↗</a>}
          </div>
        </article>)}</div> : <p className="empty-state">{searched ? 'No shops matched this search. Try another service or location.' : 'Enter a location and search to see real results.'}</p>}
        <p className="field-hint">Listings provided by Google Maps. Call the shop to confirm services and vehicle specialization.</p>
      </section>
    </main></div>;
}
