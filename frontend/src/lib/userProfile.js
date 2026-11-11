import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "./firebase.js";

// Target interface: the operations GarageIQ requires from a profile store.
export class UserProfileStore {
  subscribe(_userId, _onProfile, _onError) {
    throw new Error("subscribe must be implemented by a profile store.");
  }

  async save(_userId, _profile) {
    throw new Error("save must be implemented by a profile store.");
  }
}

// Adapter: translates the profile-store interface into Firestore calls.
export class FirestoreUserProfileAdapter extends UserProfileStore {
  constructor(database = db) {
    super();
    this.database = database;
  }

  getUserDocument(userId) {
    if (!this.database) {
      throw new Error("Firebase is not configured.");
    }

    return doc(this.database, "users", userId);
  }

  subscribe(userId, onProfile, onError) {
    return onSnapshot(
      this.getUserDocument(userId),
      (snapshot) => onProfile(snapshot.exists() ? snapshot.data() : null),
      onError,
    );
  }

  async save(userId, profile) {
    await setDoc(
      this.getUserDocument(userId),
      { ...profile, updatedAt: serverTimestamp() },
      { merge: true },
    );
  }
}

const userProfileStore = new FirestoreUserProfileAdapter();

// Existing callers retain the same API while storage details stay in the adapter.
export function subscribeToUserProfile(userId, onProfile, onError) {
  return userProfileStore.subscribe(userId, onProfile, onError);
}

export async function saveUserProfile(userId, profile) {
  await userProfileStore.save(userId, profile);
}
