import { getVehicles, payloadForVehicles } from './vehicleData.js';

export class VehicleProfileRepository {
  constructor(saveProfile) {
    this.saveProfile = saveProfile;
  }

  list(profile) {
    return getVehicles(profile);
  }

  save(userId, profile, vehicles, selectedIndex) {
    const payload = payloadForVehicles(profile, vehicles, selectedIndex);
    return this.saveProfile(userId, payload);
  }
}
