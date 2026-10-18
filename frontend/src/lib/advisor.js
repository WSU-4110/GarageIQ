export async function getAdvice(user, vehicle, question, installedMods = []) {
  const headers = { "Content-Type": "application/json" };
  if (user?.getIdToken) {
    headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }
  const response = await fetch("/api/advice", {
    method: "POST",
    headers,
    body: JSON.stringify({ vehicle, question, top_k: 5, installed_mods: installedMods }),
  });
  if (!response.ok) {
    throw new Error(`Advisor request failed (${response.status})`);
  }
  return response.json();
}

// Best-effort parse of "2018 Subaru WRX STI" into year/make/model/trim.
export function parseCar(text) {
  const [year = "", make = "", model = "", ...trim] = (text || "").trim().split(/\s+/);
  return { year: /^\d{4}$/.test(year) ? year : "", make, model, trim: trim.join(" ") };
}
