import axios from "axios";
import { auth } from "../firebase/firebaseConfig.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Attach the signed-in user's Firebase ID token to every request
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${await user.getIdToken()}`;
  }

  return config;
});

// Pulls the server's error message out of an axios error
export const getApiErrorMessage = (error) =>
  error.response?.data?.message || "Couldn't reach the server. Please try again.";

export default api;
