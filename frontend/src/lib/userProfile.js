import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db, localDemoMode } from "./firebase.js";

const DEMO_PROFILE_KEY = "garageiq-local-demo-profile";
const initialDemoProfile = {
  name: "Demo Driver",
  Car: "2022 Subaru WRX",
  Year: "2022",
  Make: "Subaru",
  Model: "WRX",
  Trim: "",
  Mileage: "24500",
  Modifications: [
    { category: "Intake", title: "Panel air filter", brand: "OEM", status: "Installed", date: "2025-08-15", notes: "Demo entry" },
    { category: "Suspension", title: "Sport lowering springs", brand: "Tein", status: "Planned", date: "", notes: "Demo entry" },
  ],
  Services: [],
  Reminders: [],
  BuildHistory: [],
};

function readDemoProfile() {
  try {
    const saved = localStorage.getItem(DEMO_PROFILE_KEY);
    return saved ? JSON.parse(saved) : initialDemoProfile;
  } catch {
    return initialDemoProfile;
  }
}

export function subscribeToUserProfile(userId, onProfile, onError) {
  if (localDemoMode) {
    onProfile(readDemoProfile());
    const refresh = () => onProfile(readDemoProfile());
    window.addEventListener("garageiq-demo-profile-updated", refresh);
    return () => window.removeEventListener("garageiq-demo-profile-updated", refresh);
  }
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  return onSnapshot(
    doc(db, "users", userId),
    (snapshot) => onProfile(snapshot.exists() ? snapshot.data() : null),
    onError,
  );
}

export async function saveUserProfile(userId, profile) {
  if (localDemoMode) {
    localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify({ ...readDemoProfile(), ...profile }));
    window.dispatchEvent(new Event("garageiq-demo-profile-updated"));
    return;
  }
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await setDoc(
    doc(db, "users", userId),
    { ...profile, updatedAt: serverTimestamp() },
    { merge: true },
  );
}
