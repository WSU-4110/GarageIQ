// GarageIQ vehicle-scoped data. Older accounts may only have top-level fields.
export const emptyVehicle = () => ({
  id: crypto.randomUUID(), Nickname: '', Year: '', Make: '', Model: '', Trim: '', Mileage: '',
  Modifications: [], Services: [], Reminders: [], BuildHistory: [],
});

export const vehicleLabel = (vehicle) => [vehicle?.Year, vehicle?.Make, vehicle?.Model, vehicle?.Trim].filter(Boolean).join(' ') || vehicle?.Car || 'New vehicle';

export function getVehicles(profile) {
  if (!profile) return [];
  if (Array.isArray(profile.Vehicles) && profile.Vehicles.length) {
    return profile.Vehicles.map((v, i) => ({
      ...v,
      id: v.id || `legacy-${i}`,
      // Only the legacy active vehicle may inherit top-level history on migration.
      Modifications: Array.isArray(v.Modifications) ? v.Modifications : (i === (profile.ActiveVehicleIndex || 0) ? profile.Modifications || [] : []),
      Services: Array.isArray(v.Services) ? v.Services : (i === (profile.ActiveVehicleIndex || 0) ? profile.Services || [] : []),
      Reminders: Array.isArray(v.Reminders) ? v.Reminders : (i === (profile.ActiveVehicleIndex || 0) ? profile.Reminders || [] : []),
      BuildHistory: Array.isArray(v.BuildHistory) ? v.BuildHistory : (i === (profile.ActiveVehicleIndex || 0) ? profile.BuildHistory || [] : []),
    }));
  }
  if (!profile.Car && !profile.Year && !profile.Make) return [];
  return [{
    ...emptyVehicle(), id: 'legacy-0', Nickname: profile.Nickname || '',
    Year: profile.Year || '', Make: profile.Make || '', Model: profile.Model || '',
    Trim: profile.Trim || '', Mileage: profile.Mileage || '', Car: profile.Car || '',
    Modifications: profile.Modifications || [], Services: profile.Services || [],
    Reminders: profile.Reminders || [], BuildHistory: profile.BuildHistory || [],
  }];
}

export function activeIndex(profile, vehicles = getVehicles(profile)) {
  return Math.max(0, Math.min(Number(profile?.ActiveVehicleIndex || 0), Math.max(0, vehicles.length - 1)));
}

export function getActiveVehicle(profile) {
  const vehicles = getVehicles(profile);
  return vehicles[activeIndex(profile, vehicles)] || null;
}

export function legacyMirror(vehicle) {
  return {
    Nickname: vehicle?.Nickname || '', Year: vehicle?.Year || '', Make: vehicle?.Make || '',
    Model: vehicle?.Model || '', Trim: vehicle?.Trim || '', Mileage: vehicle?.Mileage || '',
    Car: vehicle ? vehicleLabel(vehicle) : '', Modifications: vehicle?.Modifications || [],
    Services: vehicle?.Services || [], Reminders: vehicle?.Reminders || [],
    BuildHistory: vehicle?.BuildHistory || [],
  };
}

export function payloadForVehicles(profile, vehicles, index) {
  const safe = vehicles.length ? Math.max(0, Math.min(index, vehicles.length - 1)) : 0;
  return { ...profile, Vehicles: vehicles, ActiveVehicleIndex: safe, ...legacyMirror(vehicles[safe]) };
}

export function payloadForActiveUpdate(profile, patch) {
  const vehicles = getVehicles(profile);
  if (!vehicles.length) throw new Error('Add a vehicle in My Garage first.');
  const index = activeIndex(profile, vehicles);
  const updated = vehicles.map((v, i) => i === index ? { ...v, ...patch } : v);
  return payloadForVehicles(profile, updated, index);
}
