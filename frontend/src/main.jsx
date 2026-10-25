import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import LandingPage from "./pages/LandingPage.jsx";

import SignIn from "./pages/signIn.jsx";
import SignUp from "./pages/signUp.jsx";
import PublicProfile from "./pages/PublicProfile.jsx";

import DashboardLayout from "./Layouts/DashboardLayout.jsx";
import Overview from "./Dashboard/Overview.jsx";

import MyLink from "./pages/Dashboard/myLink.jsx";
import Appearance from "./pages/Dashboard/Appearance.jsx";
import Analytics from "./pages/Dashboard/Analytics.jsx";
import Settings from "./pages/Dashboard/Settings.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute, GuestRoute } from "./components/ProtectedRoute.jsx";

export const App = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />


      <Route path="/signin" element={<GuestRoute><SignIn /></GuestRoute>} />
      <Route path="/signup" element={<GuestRoute><SignUp /></GuestRoute>} />


      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />

        <Route path="mylinks" element={<MyLink />} />

        <Route path="appearance" element={<Appearance />} />

        <Route path="analytics" element={<Analytics />} />

        <Route path="settings" element={<Settings />} />
      </Route>


      {/* Public profile: must stay last so fixed paths like /signin win */}
      <Route path="/:username" element={<PublicProfile />} />

    </Routes>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);