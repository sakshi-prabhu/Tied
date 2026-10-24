import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Only lets signed-in users through; everyone else goes to /signin
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/signin" replace />;
};

// Sends already signed-in users straight to the dashboard
export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/dashboard" replace /> : children;
};
