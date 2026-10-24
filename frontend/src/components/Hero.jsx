import HeroPreview from "./HeroPreview.jsx";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="home"
      className="flex flex-col md:flex-row items-center justify-between gap-8 px-5 pt-28 pb-12 text-white"
      style={{ backgroundColor: "#112034" }}
    >
      <div className="flex-1 text-left">
        <div className="text-sm uppercase tracking-wide px-10">
          ONE WORKSPACE. EVERYTHING CONNECTED.
        </div>
        <div className="text-5xl font-bold px-10 mt-2">
          Everything You Need. All Tied Together.
        </div>
        <div className="text-2xl px-10 mt-4">
         Bring your work, tools, and important information together in one organized workspace.
        </div>
        <div className="flex items-center gap-4 mt-6 px-10">
          <Link
            to="/signin"
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-2xl"
          >
            GET STARTED
          </Link>
          <button className="flex items-center gap-2 text-white/90 font-medium border border-white/30 hover:bg-white/10 py-2 px-4 rounded-2xl">
            See How It Works
            <span className="material-symbols-outlined flex h-6 w-6 items-center justify-center ">
              play_arrow
            </span>
          </button>
        </div>
      </div>

      <HeroPreview />
    </div>
  );
};

export default Hero;
