const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-100 py-10 px-6 border border-gray-300">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <p className="font-bold text-2xl text-teal-600">
          How It Works
        </p>

        <p className="text-gray-600 mt-2">
          From signing up to understanding your digital presence.
        </p>
      </div>

      {/* Flowchart */}
      <div className="max-w-7xl mx-auto relative">

        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2 hidden md:block"></div>

        {/* STEP 01 */}
        <div className="relative flex items-center justify-center mb-12">
          
          <div className="w-full md:w-[42%] md:mr-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
            <p className="text-sm font-semibold text-teal-600 mb-2">
              STEP 01
            </p>

            <p className="font-semibold text-xl">
              Sign Up / Log In
            </p>

            <p className="text-gray-600 mt-2">
              Start by creating your Tied account or logging in if you
              already have one.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block"></div>
        </div>


        {/* STEP 02 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:ml-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
            <p className="text-sm font-semibold text-teal-600 mb-2">
              STEP 02
            </p>

            <p className="font-semibold text-xl">
              Build Your Identity
            </p>

            <p className="text-gray-600 mt-2">
              Add your name, bio, profile picture, and the information
              that represents you.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block"></div>
        </div>


        {/* STEP 03 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:mr-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
            <p className="text-sm font-semibold text-teal-600 mb-2">
              STEP 03
            </p>

            <p className="font-semibold text-xl">
              Connect Your World
            </p>

            <p className="text-gray-600 mt-2">
              Add your GitHub, LinkedIn, portfolio, social profiles,
              projects, and more.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block"></div>
        </div>


        {/* STEP 04 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:ml-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
            <p className="text-sm font-semibold text-teal-600 mb-2">
              STEP 04
            </p>

            <p className="font-semibold text-xl">
              Customize Your Profile
            </p>

            <p className="text-gray-600 mt-2">
              Personalize your Tied page with your preferred layout,
              colors, and style so it feels like you.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block"></div>
        </div>


        {/* STEP 05 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:mr-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
            <p className="text-sm font-semibold text-teal-600 mb-2">
              STEP 05
            </p>

            <p className="font-semibold text-xl">
              Share Your Tied
            </p>

            <p className="text-gray-600 mt-2">
              Get your unique Tied link and share it anywhere. One link
              gives people access to your entire digital identity.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block"></div>
        </div>


        {/* STEP 06 */}
        <div className="relative flex items-center justify-center">

          <div className="w-full md:w-[42%] md:ml-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
            <p className="text-sm font-semibold text-teal-600 mb-2">
              STEP 06
            </p>

            <p className="font-semibold text-xl">
              Understand Your Reach
            </p>

            <p className="text-gray-600 mt-2">
              See profile visits, link clicks, and how people interact
              with your digital identity.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block"></div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;