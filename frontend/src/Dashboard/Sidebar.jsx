import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Overview", to: "/dashboard", end: true },
  { label: "My Links", to: "/dashboard/mylinks" },
  { label: "Analytics", to: "/dashboard/analytics" },
  { label: "Appearance", to: "/dashboard/appearance" },
  { label: "Settings", to: "/dashboard/settings" },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <>
      {/* Backdrop (mobile / tablet) */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 top-16 z-30 bg-black/40 lg:hidden"
        ></div>
      )}

      <aside
        className={`fixed top-16 left-0 z-40 w-64 h-[calc(100vh-4rem)] bg-gray-800 text-white p-4 transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `block px-3 py-2.5 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
