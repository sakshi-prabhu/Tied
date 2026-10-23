import { Link } from "react-router-dom";
import tiedImage from "../assets/tied.jpeg";

const DashboardNavbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 text-white px-4 py-2 border border-y-gray-600 border-x-0 flex items-center justify-between h-16"
      style={{ backgroundColor: "#112034" }}
    >
      <div className="text-xl font-bold flex items-center">
        <a href="#home">
          <img
            src={tiedImage}
            alt="Tied logo"
            className="w-12 h-12 rounded-xl object-cover"
          />
        </a>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-6">
        <Link to="/dashboard" className="hover:text-gray-300 text-sm font-medium">
          Dashboard
        </Link>

        <Link to="/profile" className="hover:text-gray-300 text-sm font-medium">
          Profile
        </Link>

        <Link to="/settings" className="hover:text-gray-300 text-sm font-medium">
          Settings
        </Link>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
