import tiedImage from "../assets/tied.jpeg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 text-white p-4 border border-y-gray-600 border-x-0"
      style={{ backgroundColor: "#112034" }}
    >
      <div className="container mx-auto flex items-center justify-between relative">

        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="#home">
            <img
              src={tiedImage}
              alt="Tied logo"
              className="w-15 h-15 rounded-xl object-cover"
            />
          </a>
        </div>

        {/* Navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center space-x-28">
          <a href="#home" className="hover:text-gray-300 text-sm font-medium tracking-wide">
            Home
          </a>

          <a href="#features" className="hover:text-gray-300 text-sm font-medium tracking-wide">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-gray-300 text-sm font-medium tracking-wide">
            How It Works
          </a>

          <a href="#faq" className="hover:text-gray-300 text-sm font-medium tracking-wide">
            FAQ
          </a>
        </div>

        {/* Get Started */}
        <div>
          <Link
            to="/signin"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold tracking-wide py-2 px-4 rounded-2xl"
          >
            GET STARTED
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;