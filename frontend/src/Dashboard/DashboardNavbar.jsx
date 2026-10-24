import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import tiedImage from "../assets/tied.jpeg";

const DashboardNavbar = ({ onMenuClick, sidebarOpen }) => {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 text-white px-4 py-2 border border-y-gray-600 border-x-0 flex items-center justify-between h-16"
      style={{ backgroundColor: "#112034" }}
    >
      <div className="flex items-center gap-2">
        {/* Sidebar toggle (mobile / tablet) */}
        <button
          type="button"
          onClick={onMenuClick}
          aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          aria-expanded={sidebarOpen}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 text-2xl"
        >
          {sidebarOpen ? <HiX /> : <HiMenu />}
        </button>

        <Link to="/dashboard">
          <img
            src={tiedImage}
            alt="Tied logo"
            className="w-12 h-12 rounded-xl object-cover"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="hidden sm:flex items-center space-x-6">
        <Link to="/dashboard" className="hover:text-gray-300 text-sm font-medium">
          Dashboard
        </Link>

        <Link to="/dashboard/appearance" className="hover:text-gray-300 text-sm font-medium">
          Profile
        </Link>

        <Link to="/dashboard/settings" className="hover:text-gray-300 text-sm font-medium">
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
