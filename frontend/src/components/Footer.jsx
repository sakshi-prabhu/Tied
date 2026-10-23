const Footer = () => {
  return (
    <footer className=" text-white py-10"style={{ backgroundColor: "#112034" }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-bold text-2xl mb-2">Tied</p>
            <p className="text-gray-300">
              Your online identity, all in one place.
            </p>
          </div>

          <div>
            <p className="font-bold text-lg mb-3">Explore</p>
            <ul className="space-y-2 text-gray-300">
              <li>Home</li>
              <li>Features</li>
              <li>How It Works</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <p className="font-bold text-lg mb-3">Get Started</p>
            <ul className="space-y-2 text-gray-300">
              <li>Get Started</li>
              <li>Login</li>
              <li>Create Your Tied</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-5 text-center text-gray-400">
          <p>© 2026 Tied. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
