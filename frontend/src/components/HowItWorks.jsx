const HowItWorks = () => {
  return (
    <section id="how-it-works" className="bg-slate-100 py-10 px-6 border border-gray-300 dark:bg-slate-950 dark:border-slate-600">
      {/* Section Heading */}
      <div className="text-center mb-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-400">
          How It Works
        </p>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-2 dark:text-gray-100">
          Get started in six simple steps
        </h2>

        <p className="text-lg text-gray-600 mt-4 dark:text-gray-400">
          From signing up to understanding your digital presence.
        </p>
      </div>

      {/* Flowchart */}
      <div className="max-w-7xl mx-auto relative">

        {/* Center Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 -translate-x-1/2 hidden md:block dark:bg-slate-600"></div>

        {/* STEP 01 */}
        <div className="relative flex items-center justify-center mb-12">
          
          <div className="w-full md:w-[42%] md:mr-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 dark:bg-slate-900 dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2 dark:text-teal-400">
              STEP 01
            </p>

            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Sign Up / Log In
            </h3>

            <p className="text-gray-600 mt-2 dark:text-gray-400">
              Start by creating your Tied account or logging in if you
              already have one.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block dark:bg-slate-900"></div>
        </div>


        {/* STEP 02 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:ml-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 dark:bg-slate-900 dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2 dark:text-teal-400">
              STEP 02
            </p>

            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Build Your Identity
            </h3>

            <p className="text-gray-600 mt-2 dark:text-gray-400">
              Add your name, bio, profile picture, and the information
              that represents you.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block dark:bg-slate-900"></div>
        </div>


        {/* STEP 03 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:mr-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 dark:bg-slate-900 dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2 dark:text-teal-400">
              STEP 03
            </p>

            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Connect Your World
            </h3>

            <p className="text-gray-600 mt-2 dark:text-gray-400">
              Add your GitHub, LinkedIn, portfolio, social profiles,
              projects, and more.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block dark:bg-slate-900"></div>
        </div>


        {/* STEP 04 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:ml-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 dark:bg-slate-900 dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2 dark:text-teal-400">
              STEP 04
            </p>

            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Customize Your Profile
            </h3>

            <p className="text-gray-600 mt-2 dark:text-gray-400">
              Personalize your Tied page with your preferred layout,
              colors, and style so it feels like you.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block dark:bg-slate-900"></div>
        </div>


        {/* STEP 05 */}
        <div className="relative flex items-center justify-center mb-12">

          <div className="w-full md:w-[42%] md:mr-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 dark:bg-slate-900 dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2 dark:text-teal-400">
              STEP 05
            </p>

            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Share Your Tied
            </h3>

            <p className="text-gray-600 mt-2 dark:text-gray-400">
              Get your unique Tied link and share it anywhere. One link
              gives people access to your entire digital identity.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block dark:bg-slate-900"></div>
        </div>


        {/* STEP 06 */}
        <div className="relative flex items-center justify-center">

          <div className="w-full md:w-[42%] md:ml-auto bg-white border border-gray-300 rounded-lg p-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300 dark:bg-slate-900 dark:border-slate-600">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-2 dark:text-teal-400">
              STEP 06
            </p>

            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100">
              Understand Your Reach
            </h3>

            <p className="text-gray-600 mt-2 dark:text-gray-400">
              See profile visits, link clicks, and how people interact
              with your digital identity.
            </p>
          </div>

          {/* Center Dot */}
          <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-2 border-teal-600 rounded-full hidden md:block dark:bg-slate-900"></div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;