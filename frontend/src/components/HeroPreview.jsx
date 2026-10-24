import { FaGithub, FaLinkedin, FaGlobe, FaFileAlt, FaInstagram } from "react-icons/fa";

const links = [
  { title: "GitHub", icon: FaGithub },
  { title: "LinkedIn", icon: FaLinkedin },
  { title: "Portfolio", icon: FaGlobe },
  { title: "Resume", icon: FaFileAlt },
  { title: "Instagram", icon: FaInstagram },
];

const HeroPreview = () => {
  return (
    <div className="relative flex justify-center py-8 px-10">

      {/* Glow */}
      <div className="absolute inset-0 m-auto w-72 h-72 rounded-full bg-teal-500/30 blur-3xl"></div>

      {/* Phone */}
      <div className="relative w-[270px] bg-slate-950 rounded-[2.5rem] p-3 shadow-2xl border border-white/10">
        <div className="bg-white rounded-[2rem] overflow-hidden">

          {/* Cover */}
          <div className="h-20 bg-gradient-to-r from-teal-500 to-teal-700"></div>

          <div className="px-5 pb-6 -mt-10 text-center">

            {/* Avatar */}
            <div className="w-20 h-20 mx-auto rounded-full bg-[#112034] border-4 border-white flex items-center justify-center text-2xl font-bold text-teal-300">
              AR
            </div>

            <h3 className="text-lg font-bold text-gray-900 mt-3">
              Alex Rivera
            </h3>

            <p className="text-xs text-gray-500 mt-1">
              Developer · Designer · Creator
            </p>

            {/* Links */}
            <div className="mt-5 space-y-2.5">
              {links.map(({ title, icon: Icon }) => (
                <div
                  key={title}
                  className="flex items-center gap-3 bg-[#112034] text-white text-sm font-medium py-2.5 px-4 rounded-full"
                >
                  <Icon className="text-teal-300" />
                  <span className="flex-1 text-center pr-4">{title}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-gray-400 mt-5">
              Powered by Tied
            </p>

          </div>
        </div>
      </div>

      {/* Floating stat card */}
      <div className="hidden sm:block absolute top-16 left-0 bg-white rounded-xl shadow-xl px-4 py-3">
        <p className="text-xs text-gray-500">Profile Views</p>
        <p className="text-xl font-bold text-gray-900">12.4k</p>
        <p className="text-xs text-green-600">+18.2% ↑</p>
      </div>

      {/* Floating link chip */}
      <div className="hidden sm:flex absolute bottom-20 right-0 items-center gap-2 bg-white rounded-full shadow-xl px-4 py-2">
        <span className="w-2 h-2 rounded-full bg-teal-500"></span>
        <span className="text-sm font-semibold text-gray-900">tied.app/alex</span>
      </div>

    </div>
  );
};

export default HeroPreview;
