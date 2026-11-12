import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
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
