import { useEffect, useRef, useState } from "react";
import { HiOutlineSun, HiOutlineMoon, HiOutlineDesktopComputer, HiCheck } from "react-icons/hi";
import { getThemePreference, setThemePreference } from "../utils/theme.js";

const OPTIONS = [
  { value: "light", label: "Light", Icon: HiOutlineSun },
  { value: "dark", label: "Dark", Icon: HiOutlineMoon },
  { value: "system", label: "System default", Icon: HiOutlineDesktopComputer },
];

// Sits in the dark navbars, so the trigger is styled for a dark background
const ThemeToggle = () => {
  const [theme, setTheme] = useState(getThemePreference);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  // Close when clicking anywhere outside the menu
  useEffect(() => {
    if (!open) return;

    const handleClick = (e) => {
      if (!menuRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const choose = (value) => {
    setThemePreference(value);
    setTheme(value);
    setOpen(false);
  };

  const CurrentIcon = OPTIONS.find((option) => option.value === theme).Icon;

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Change appearance"
        title="Appearance"
        aria-haspopup="menu"
        aria-expanded={open}
        className="p-2 rounded-lg hover:bg-white/10 text-2xl"
      >
        <CurrentIcon />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-48 py-1 bg-white text-gray-700 border border-gray-200 rounded-lg shadow-lg dark:bg-slate-800 dark:text-gray-200 dark:border-slate-700"
        >
          {OPTIONS.map(({ value, label, Icon }) => (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={theme === value}
              onClick={() => choose(value)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-slate-700"
            >
              <Icon className="text-lg" />
              <span className="flex-1">{label}</span>
              {theme === value && <HiCheck className="text-teal-600 dark:text-teal-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
