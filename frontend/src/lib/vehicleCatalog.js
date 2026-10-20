// Curated passenger-vehicle makes. Keep a manual fallback for unlisted brands.
const ROOT = 'https://vpic.nhtsa.dot.gov/api/vehicles';
export const fallbackMakes = ['Acura','Alfa Romeo','Audi','Bentley','BMW','Buick','Cadillac','Chevrolet','Chrysler','Dodge','Ferrari','Fiat','Ford','Genesis','GMC','Honda','Hyundai','Infiniti','Jaguar','Jeep','Kia','Lamborghini','Land Rover','Lexus','Lincoln','Lotus','Maserati','Mazda','Mercedes-Benz','Mini','Mitsubishi','Nissan','Porsche','Ram','Rivian','Rolls-Royce','Subaru','Tesla','Toyota','Volkswagen','Volvo'];
// No request for GetAllMakes: that API returns thousands of trailer, incomplete-vehicle and other companies.
export async function getMakes(signal) {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
  return fallbackMakes;
}
export async function getModels(make, year, signal) {
  if (!make || !year || make === 'Other') return [];
  const response = await fetch(`${ROOT}/GetModelsForMakeYear/make/${encodeURIComponent(make)}/modelyear/${encodeURIComponent(year)}?format=json`, { signal });
  if (!response.ok) throw new Error(`Model lookup failed (${response.status})`);
  const data = await response.json();
  return [...new Set((data.Results || []).map(x => x.Model_Name).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
}
export const supportedPlatforms = [];
export function supportsRecommendations(vehicle) {
  return supportedPlatforms.some(x => String(x.year) === String(vehicle?.Year) && x.make?.toLowerCase() === vehicle?.Make?.toLowerCase() && x.model?.toLowerCase() === vehicle?.Model?.toLowerCase());
}
