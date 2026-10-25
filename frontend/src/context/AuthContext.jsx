import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig.js";
import api from "../services/api.js";

const AuthContext = createContext(null);

// Sign-up stashes the chosen username here so the profile is created with it
let pendingProfile = null;

// eslint-disable-next-line react-refresh/only-export-components
export const setPendingProfile = (data) => {
  pendingProfile = data;
};

// Creates the Tied profile on first sign-in, or returns the existing one
const loadProfile = async () => {
  const details = pendingProfile;
  pendingProfile = null;

  try {
    const { data } = await api.post("/users/me", details || {});
    return data;
  } catch (error) {
    // Chosen username got taken in the meantime — fall back to a generated one
    if (details && error.response?.status === 409) {
      const { data } = await api.post("/users/me", {});
      return data;
    }
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(false);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    setProfileError(false);

    try {
      setProfile(await loadProfile());
    } catch {
      setProfileError(true);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setProfile(null);

      if (currentUser) {
        await refreshProfile();
      }

      setLoading(false);
    });

    return unsubscribe;
  }, [refreshProfile]);

  return (
    <AuthContext.Provider
      value={{ user, profile, setProfile, profileError, refreshProfile, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
