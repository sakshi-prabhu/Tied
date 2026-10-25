import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Only lets signed-in users with a loaded profile through; everyone else goes to /signin
export const ProtectedRoute = ({ children }) => {
  const { user, profile, profileError, refreshProfile, loading } = useAuth();

  if (!loading && !user) {
    return <Navigate to="/signin" replace />;
  }

  if (profileError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-gray-500 px-4 text-center dark:text-gray-400">
        <p>We couldn't load your profile. Please check your connection.</p>

        <button
          type="button"
          onClick={refreshProfile}
          className="bg-slate-900 text-white px-5 py-2 rounded-lg hover:bg-slate-700 dark:bg-teal-600 dark:hover:bg-teal-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 dark:text-gray-400">
        Loading...
      </div>
    );
  }

  return children;
};

// Sends already signed-in users straight to the dashboard
export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/dashboard" replace /> : children;
};
