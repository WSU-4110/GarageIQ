import { useEffect, useState } from "react";
import useAuth from "./useAuth.js";
import { subscribeToUserProfile } from "../lib/userProfile.js";

export default function useUserProfile() {
  const { user } = useAuth();
  const [state, setState] = useState({
    userId: null,
    profile: null,
    loading: false,
    error: "",
  });

  useEffect(() => {
    if (!user) {
      return undefined;
    }

    return subscribeToUserProfile(
      user.uid,
      (profile) => {
        setState({ userId: user.uid, profile, loading: false, error: "" });
      },
      (profileError) => {
        setState({
          userId: user.uid,
          profile: null,
          loading: false,
          error: `Unable to load your garage profile: ${profileError.message}`,
        });
      },
    );
  }, [user]);

  const stateIsCurrent = state.userId === user?.uid;
  return {
    profile: stateIsCurrent ? state.profile : null,
    loading: Boolean(user && (!stateIsCurrent || state.loading)),
    error: stateIsCurrent ? state.error : "",
  };
}
