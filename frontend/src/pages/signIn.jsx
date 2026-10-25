import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebaseConfig.js";
import { getAuthErrorMessage, isPopupClosed } from "../firebase/authErrors.js";
import tiedImage from "../assets/tied.jpeg";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/dashboard");
    } catch (err) {
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 dark:bg-slate-950">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-teal-600 dark:bg-slate-900"
      >

        <div className="text-center mb-8">
          <Link to="/">
            <img src={tiedImage} alt="Tied logo" className="w-16 h-16 rounded-xl object-cover mx-auto" />
          </Link>
          <p className="text-gray-500 mt-3 dark:text-gray-400">Welcome back to your connected workspace.</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Sign In
        </h1>

        {error && (
          <p className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 dark:text-red-300 dark:bg-red-950/40 dark:border-red-900">
            {error}
          </p>
        )}

        <div className="mt-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Email
          </label>

          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent dark:border-slate-600"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300">
            Password
          </label>

          <input
            id="password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent dark:border-slate-600"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg mt-6 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Signing In..." : "Sign In"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>

          <span className="text-sm text-gray-400 dark:text-gray-500">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-200 dark:bg-slate-700"></div>
        </div>

        {/* Google */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={submitting}
          className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-teal-50 transition disabled:opacity-60 disabled:cursor-not-allowed dark:border-slate-600 dark:text-gray-300 dark:hover:bg-teal-950/40"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-gray-500 mt-6 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-700 font-medium hover:text-teal-800 hover:underline dark:text-teal-400 dark:hover:text-teal-300"
          >
            Sign Up
          </Link>
        </p>

      </form>
    </div>
  );
};

export default SignIn;
