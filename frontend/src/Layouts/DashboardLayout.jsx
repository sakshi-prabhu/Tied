import { useState } from "react";
import DashboardNavbar from "../Dashboard/DashboardNavbar.jsx";
import Sidebar from "../Dashboard/Sidebar.jsx";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">

      <DashboardNavbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 pt-20 p-4 sm:p-6 sm:pt-22">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;
