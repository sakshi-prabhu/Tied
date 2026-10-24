import HeroPreview from "./HeroPreview.jsx";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div id="home"
      className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-5 pt-28 md:pt-32 pb-12 text-white"
      style={{ backgroundColor: "#112034" }}
    >
      <div className="flex-1 text-left">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-300 md:px-10">
          ONE WORKSPACE. EVERYTHING CONNECTED.
        </p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight md:px-10 mt-3">
          Everything You Need. All Tied Together.
        </h1>
        <p className="text-lg md:text-xl text-white/75 leading-relaxed max-w-xl md:px-10 mt-5">
         Bring your work, tools, and important information together in one organized workspace.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-8 md:px-10">
          <Link
            to="/signin"
            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold tracking-wide py-2 px-4 rounded-2xl"
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
