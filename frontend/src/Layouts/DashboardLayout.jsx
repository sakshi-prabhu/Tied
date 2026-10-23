import DashboardNavbar from "../Dashboard/DashboardNavbar.jsx";
import Sidebar from "../Dashboard/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      <DashboardNavbar />

      <Sidebar />

      <main className="ml-64 pt-20 p-6">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;