
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuth from '../hooks/useAuth.js';
import useUserProfile from '../hooks/useUserProfile.js';
import { saveUserProfile } from '../lib/userProfile.js';

import {
  activeIndex,
  emptyVehicle,
  getVehicles,
  payloadForVehicles,
  vehicleLabel,
} from '../lib/vehicleData.js';

import {
  fallbackMakes,
  getMakes,
  getModels,
  supportsRecommendations,
} from '../lib/vehicleCatalog.js';

import GarageSidebar from '../components/GarageSidebar.jsx';
import { digitsOnly, isOdometer } from '../lib/maintenanceRules.js';

export default function VehicleProfile() {
  const { user } = useAuth();
  const { profile, loading, error } = useUserProfile();

  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [makes, setMakes] = useState(fallbackMakes);

  // Store API results with the make/year they belong to.
  // This prevents old models from appearing for another vehicle.
  const [modelResult, setModelResult] = useState({
    key: '',
    models: [],
  });

  const vehicles =
    draft?.base === profile
      ? draft.vehicles
      : getVehicles(profile);

  const selected =
    draft?.base === profile
      ? draft.selected
      : activeIndex(profile, vehicles);

  const vehicle = vehicles[selected] || emptyVehicle();

  const make = vehicle.Make || '';
  const year = vehicle.Year || '';

  const modelKey = `${year}:${make}`;

  const canFetchModels =
    Boolean(year && make && make !== 'Other');

  // Load available makes once.
  useEffect(() => {
    const controller = new AbortController();

    getMakes(controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setMakes(result);
        }
      })
      .catch(() => {
        // Keep the fallback list if the API is unavailable.
      });

    return () => controller.abort();
  }, []);

  // Load models when the selected make or year changes.
  useEffect(() => {
    if (!canFetchModels) return;

    const controller = new AbortController();

    getModels(make, year, controller.signal)
      .then((result) => {
        if (!controller.signal.aborted) {
          setModelResult({
            key: modelKey,
            models: result,
          });
        }
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setModelResult({
            key: modelKey,
            models: [],
          });
        }
      });

    return () => controller.abort();
  }, [canFetchModels, make, year, modelKey]);

  const modelsLoading =
    canFetchModels && modelResult.key !== modelKey;

  const models = useMemo(() => {
    return modelResult.key === modelKey
      ? modelResult.models
      : [];
  }, [modelResult, modelKey]);

  const modelOptions = useMemo(() => {
    return [
      ...new Set(
        [...models, vehicle.Model].filter(Boolean)
      ),
    ];
  }, [models, vehicle.Model]);

  const supported = supportsRecommendations(vehicle);

  function update(key, value) {
    const updated = vehicles.map((v, i) => {
      if (i !== selected) return v;

      return {
        ...v,
        [key]: value,
        ...(key === 'Make' || key === 'Year'
          ? { Model: '', Trim: '' }
          : {}),
      };
    });

    setDraft({
      base: profile,
      vehicles: updated,
      selected,
    });

    setMessage('');
  }

  async function save(
    nextVehicles = vehicles,
    nextIndex = selected
  ) {
    const current = nextVehicles[nextIndex];

    if (!current) {
      setMessage('Add a vehicle before saving.');
      return;
    }

    if (
      !current.Year ||
      !current.Make ||
      !current.Model?.trim()
    ) {
      setMessage(
        'Choose or enter the year, make, and model before saving.'
      );
      return;
    }

    if (
      current.Make === 'Other' &&
      !current.CustomMake?.trim()
    ) {
      setMessage('Enter the vehicle manufacturer.');
      return;
    }

    if (!isOdometer(String(current.Mileage ?? ''))) {
      setMessage('Mileage must be between 0 and 2,000,000 whole miles.');
      return;
    }
    setSaving(true);
    setMessage('');

    try {
      const corrected = nextVehicles.map((v) => {
        if (
          v.Make === 'Other' &&
          v.CustomMake?.trim()
        ) {
          return {
            ...v,
            Make: v.CustomMake.trim(),
          };
        }

        return v;
      });

      const payload = payloadForVehicles(
        profile,
        corrected,
        nextIndex
      );

      await saveUserProfile(user.uid, payload);

      setDraft(null);
      setMessage('Vehicle profile saved.');
    } catch (e) {
      setMessage(`Save failed: ${e.message}`);
    } finally {
      setSaving(false);
    }
  }

  async function switchSelected(index) {
    if (index === selected || saving) return;

    if (
      draft?.base === profile &&
      JSON.stringify(draft.vehicles) !==
        JSON.stringify(getVehicles(profile))
    ) {
      if (
        !window.confirm(
          'Discard unsaved edits and switch vehicles?'
        )
      ) {
        return;
      }
    }

    setSaving(true);

    try {
      await saveUserProfile(
        user.uid,
        payloadForVehicles(
          profile,
          getVehicles(profile),
          index
        )
      );

      setDraft(null);
      setMessage('');
    } catch (e) {
      setMessage(
        `Could not switch vehicle: ${e.message}`
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    if (saving || !vehicles.length) return;

    const confirmed = window.confirm(
      `Delete ${
        vehicle.Nickname || vehicleLabel(vehicle)
      } and its saved history? This cannot be undone.`
    );

    if (!confirmed) return;

    const remaining = vehicles.filter(
      (_, i) => i !== selected
    );

    const next = Math.min(
      selected,
      Math.max(remaining.length - 1, 0)
    );

    setSaving(true);

    try {
      await saveUserProfile(
        user.uid,
        payloadForVehicles(
          profile,
          remaining,
          next
        )
      );

      setDraft(null);
      setMessage('Vehicle removed.');
    } catch (e) {
      setMessage(
        `Could not delete vehicle: ${e.message}`
      );
    } finally {
      setSaving(false);
    }
  }

  function addVehicle() {
    if (saving) return;

    setDraft({
      base: profile,
      vehicles: [...vehicles, emptyVehicle()],
      selected: vehicles.length,
    });

    setMessage('');
  }

  if (loading) {
    return (
      <div className="auth-page">
        Loading vehicle profile…
      </div>
    );
  }

  const years = Array.from(
    { length: 70 },
    (_, i) =>
      String(new Date().getFullYear() + 1 - i)
  );

  return (
    <div className="app-shell">
      <GarageSidebar selected="My garage" />

      <main className="garage-page">
        <header className="garage-page-header">
          <div>
            <p className="eyebrow orange">
              My Garage
            </p>

            <h1>Vehicle profile</h1>

            <p>
              Manage your vehicles, mileage, and
              recommendation availability.
            </p>
          </div>

          <Link
            className="secondary-button"
            to="/dashboard"
          >
            ← Back to overview
          </Link>
        </header>

        {error && (
          <p className="form-message error-message">
            {error}
          </p>
        )}

        <section className="garage-panel garage-profile-layout">
          <div className="vehicle-photo-placeholder garage-photo-patched">
            <img src="https://images.unsplash.com/photo-1486006920555-c77dcf18193c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600" alt="Garage vehicle placeholder" />
            <span>Vehicle profile</span>
          </div>

          <div className="vehicle-fields">
            <label>
              Vehicle nickname

              <input
                value={vehicle.Nickname || ''}
                onChange={(e) =>
                  update('Nickname', e.target.value)
                }
                placeholder="e.g. Weekend Fun Car"
              />
            </label>

            <div className="vehicle-select-grid">
              <label>
                Year

                <select
                  value={year}
                  onChange={(e) =>
                    update('Year', e.target.value)
                  }
                >
                  <option value="">
                    Select year
                  </option>

                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Make

                <select
                  value={make}
                  onChange={(e) =>
                    update('Make', e.target.value)
                  }
                >
                  <option value="">
                    Select make
                  </option>

                  {make &&
                    make !== 'Other' &&
                    !makes.includes(make) && (
                      <option value={make}>
                        {make}
                      </option>
                    )}

                  {makes
                    .filter((m) => m !== 'Other')
                    .map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}

                  <option value="Other">
                    Other / not listed
                  </option>
                </select>
              </label>

              <label>
                Model

                <select
                  value={vehicle.Model || ''}
                  onChange={(e) =>
                    update('Model', e.target.value)
                  }
                  disabled={!canFetchModels}
                >
                  <option value="">
                    {modelsLoading
                      ? 'Loading models…'
                      : 'Select model'}
                  </option>

                  {modelOptions.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {vehicle.Make === 'Other' && (
              <label>
                Enter make

                <input
                  value={vehicle.CustomMake || ''}
                  onChange={(e) =>
                    update(
                      'CustomMake',
                      e.target.value
                    )
                  }
                  placeholder="Manufacturer name"
                />
              </label>
            )}

            <label>
              Model (manual fallback)

              <input
                value={vehicle.Model || ''}
                onChange={(e) =>
                  update('Model', e.target.value)
                }
                placeholder="Enter model if missing from the list"
              />
            </label>

            <label>
              Trim (optional)

              <input
                value={vehicle.Trim || ''}
                onChange={(e) =>
                  update('Trim', e.target.value)
                }
                placeholder="e.g. WRX STI, Sport Prestige"
              />
            </label>

            <label>
              Current mileage (optional)

              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={7}
                value={vehicle.Mileage ?? ''}
                onChange={(e) =>
                  update('Mileage', digitsOnly(e.target.value))
                }
                placeholder="Miles"
              />
            </label>

            <div
              className={`recommendation-note ${
                supported
                  ? 'recommendation-supported'
                  : ''
              }`}
            >
              {supported
                ? '✓ Supported for recommendations. Explore the modification advisor.'
                : 'ⓘ Recommendations not yet available for this vehicle. Modification, maintenance, and build tracking remain available.'}
            </div>

            <div className="profile-save-actions">
              <button
                className="primary-button"
                onClick={() => save()}
                disabled={saving}
              >
                {saving
                  ? 'Saving…'
                  : 'Save vehicle profile'}
              </button>

              <button
                className="secondary-button"
                onClick={addVehicle}
                disabled={saving}
              >
                ＋ Save another vehicle
              </button>
            </div>
          </div>
        </section>

        <section className="garage-panel">
          <div className="garage-panel-heading">
            <div>
              <p className="eyebrow">
                Your vehicles ({vehicles.length})
              </p>

              <h2>Garage</h2>
            </div>

            <button
              className="secondary-button"
              onClick={addVehicle}
              disabled={saving}
            >
              ＋ Add vehicle
            </button>
          </div>

          <div className="vehicle-list">
            {vehicles.map((v, i) => (
              <button
                key={v.id || i}
                className={`vehicle-list-item ${
                  i === selected ? 'selected' : ''
                }`}
                onClick={() =>
                  switchSelected(i)
                }
                disabled={saving}
              >
                <span className="vehicle-thumb">
                  🚘
                </span>

                <span>
                  <strong>
                    {v.Nickname ||
                      vehicleLabel(v)}
                  </strong>

                  <small>
                    {vehicleLabel(v)}
                  </small>
                </span>

                <span>›</span>
              </button>
            ))}
          </div>
        </section>

        <div className="garage-actions profile-actions">
          {vehicles.length > 0 && (
            <button
              className="delete-button"
              disabled={saving}
              onClick={remove}
            >
              Delete vehicle
            </button>
          )}
        </div>

        {message && (
          <p
            className="form-message"
            role="status"
          >
            {message}
          </p>
        )}
      </main>
    </div>
  );
}
