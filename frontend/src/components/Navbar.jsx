import { useState } from "react";
import tiedImage from "../assets/tied.jpeg";
import { Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import ThemeToggle from "./ThemeToggle.jsx";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 text-white px-4 py-3 border border-y-gray-600 border-x-0"
      style={{ backgroundColor: "#112034" }}
    >
      <div className="container mx-auto flex items-center justify-between relative">

        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="#home">
            <img
              src={tiedImage}
              alt="Tied logo"
              className="w-12 h-12 md:w-14 md:h-14 rounded-xl object-cover"
            />
          </a>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 lg:gap-20">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-gray-300 text-sm font-medium tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Get Started */}
          <Link
            to="/signin"
            className="bg-teal-600 hover:bg-teal-700 text-white text-sm sm:text-base font-semibold tracking-wide py-2 px-4 rounded-2xl"
          >
            GET STARTED
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 text-2xl"
          >
            {menuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden container mx-auto mt-3 pt-3 border-t border-white/10 flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 px-2 rounded-lg hover:bg-white/10 font-medium"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
