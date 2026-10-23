import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import DashboardLayout from "./Layouts/DashboardLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LandingPage />} />

        <Route path="/dashboard" element={<DashboardLayout />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;