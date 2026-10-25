import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import tiedImage from "../assets/tied.jpeg";
import { useAuth } from "../context/AuthContext.jsx";

const DashboardNavbar = ({ onMenuClick, sidebarOpen }) => {
  const { profile } = useAuth();
  const initial = (profile?.displayName || profile?.username || "?")[0].toUpperCase();

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

      {/* Profile picture, opens the profile editor */}
      <Link
        to="/dashboard/appearance"
        aria-label="Edit profile"
        title="Edit profile"
        className="shrink-0 rounded-full ring-2 ring-white/20 hover:ring-white/60 transition"
      >
        {profile?.avatarUrl ? (
          <img src={profile.avatarUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center font-semibold">
            {initial}
          </div>
        )}
      </Link>
    </nav>
  );
};

export default DashboardNavbar;
