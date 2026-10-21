import { doc, getDoc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

export function subscribeToUserProfile(userId, onProfile, onError) {
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
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  await setDoc(
    doc(db, "users", userId),
    { ...profile, updatedAt: serverTimestamp() },
    { merge: true },
  );
}

// Creates users/{uid} with the default GarageIQ fields if it doesn't exist yet.
// Used for first-time Google sign-ins; existing profiles are never overwritten.
export async function ensureUserProfile(user, nameOverride) {
  if (!db) {
    throw new Error("Firebase is not configured.");
  }

  const ref = doc(db, "users", user.uid);
  const snapshot = await getDoc(ref);
  if (snapshot.exists()) {
    return;
  }

  await setDoc(ref, {
    name: (nameOverride || user.displayName || "").trim(),
    email: user.email,
    Car: "",
    LastOilChange: null,
    LastTireRotation: null,
    LastTransmissionService: null,
    Modifications: [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
