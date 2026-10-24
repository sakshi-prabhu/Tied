import { Link } from "react-router-dom";
import tiedImage from "../assets/tied.jpeg";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-6">
          <img src={tiedImage} alt="Tied logo" className="w-16 h-16 rounded-xl object-cover mx-auto" />
          <p className="text-gray-500 mt-3">
            Create your account and get started.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border-t-4 border-teal-600 rounded-2xl shadow-2xl p-6 sm:p-8">

          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Create Account
          </h2>

          {/* Name */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>

            <input
              type="text"
              placeholder="Choose a username"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="button"
            className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition"
          >
            Create Account
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
            className="w-full border border-gray-300 py-3 rounded-lg font-medium text-gray-700 hover:bg-teal-50 transition"
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

        </div>
      </div>
    </div>
  );
};

export default SignUp;