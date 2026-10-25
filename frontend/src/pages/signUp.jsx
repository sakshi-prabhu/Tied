import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig.js";
import { getAuthErrorMessage, isPopupClosed } from "../firebase/authErrors.js";
import { setPendingProfile } from "../context/AuthContext.jsx";
import api, { getApiErrorMessage } from "../services/api.js";
import tiedImage from "../assets/tied.jpeg";

const inputClass =
  "w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent";

const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[a-zA-Z0-9_.]{3,30}$/.test(form.username)) {
      setError("Username must be 3–30 characters: letters, numbers, _ or .");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    const username = form.username.toLowerCase();

    try {
      const { data } = await api.get(`/users/check-username/${username}`);

      if (!data.available) {
        setError("That username is already taken.");
        setSubmitting(false);
        return;
      }
    } catch (err) {
      setError(getApiErrorMessage(err));
      setSubmitting(false);
      return;
    }

    try {
      // Picked up by AuthContext when it creates the Tied profile
      setPendingProfile({ username, displayName: form.name.trim() });

      const { user } = await createUserWithEmailAndPassword(
        auth,
        form.email.trim(),
        form.password
      );
      await updateProfile(user, { displayName: form.name.trim() });
      navigate("/dashboard");
    } catch (err) {
      setPendingProfile(null);
      setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    setSubmitting(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (err) {
      if (!isPopupClosed(err)) setError(getAuthErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <Link to="/">
            <img src={tiedImage} alt="Tied logo" className="w-16 h-16 rounded-xl object-cover mx-auto" />
          </Link>
          <p className="text-gray-500 mt-3">
            Create your account and get started.
          </p>
        </div>

        {/* Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-t-4 border-teal-600 rounded-2xl shadow-2xl p-6 sm:p-8"
        >

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Create Account
          </h2>

          {error && (
            <p className="mb-5 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          {/* Name */}
          <div className="mb-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={inputClass}
            />
          </div>

          {/* Username */}
          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Choose a username"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a password"
              className={inputClass}
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={inputClass}
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200"></div>

            <span className="text-sm text-gray-400">
              OR
            </span>

            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={submitting}
            className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-teal-50 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Continue with Google
          </button>

          {/* Sign In */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-teal-700 font-medium hover:text-teal-800 hover:underline"
            >
              Sign In
            </Link>
          </p>

        </form>
      </div>
    </div>
  );
};

export default SignUp;
