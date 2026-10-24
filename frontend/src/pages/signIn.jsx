import { Link, useNavigate } from "react-router-dom";
import tiedImage from "../assets/tied.jpeg";

const SignIn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-teal-600">

        <div className="text-center mb-8">
          <img src={tiedImage} alt="Tied logo" className="w-16 h-16 rounded-xl object-cover mx-auto" />
          <p className="text-gray-500 mt-3">Welcome back to your connected workspace.</p>
        </div>

        <h1 className="text-2xl font-bold text-gray-900">
          Sign In
        </h1>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
          />
        </div>

        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded-lg mt-6 transition"
        >
          Sign In
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-700 font-medium hover:text-teal-800 hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignIn;