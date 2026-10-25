const Features = () => {
  return (
   <div id="features" className="bg-slate-100 py-12 px-6 dark:bg-slate-950">
      <p className="text-sm font-semibold tracking-widest text-teal-600 text-center mt-3 dark:text-teal-400">
        EVERYTHING TIED TOGETHER
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mt-2 dark:text-gray-100">
        Your Online Identity, In One Place.
      </h2>

      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-4 dark:text-gray-400">
        Create, customize, share, and understand your digital presence — all
        through one simple page.
      </p>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-10 text-black dark:text-gray-100">
       <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 dark:border-slate-600 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 dark:text-teal-400">Smart Sharing</p>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
            One link. Everywhere you go.
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Bring your profiles, portfolio, resume, projects, and socials
            together in one personalized page.
          </p>
        </div>
         <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 dark:border-slate-600 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 dark:text-teal-400">Profile Identity</p>
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            Build your digital identity.
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create a personalized profile with your photo, name, bio, social
            handles, and a unique Tied URL.
          </p>
        </div>

         <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 dark:border-slate-600 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 dark:text-teal-400">Analytics</p>
          <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
            Know what gets attention.
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Understand your audience with profile views, link clicks,
            click-through rates, and your top-performing links.
          </p>
        </div>

        <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 dark:border-slate-600 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 dark:text-teal-400">Link Management</p>
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            Your links, your way.
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Add, edit, reorder, enable, or disable your links anytime — all from
            one simple dashboard.
          </p>
        </div>
        <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300 dark:border-slate-600 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3 dark:text-teal-400">Personalization</p>
          <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-gray-100">
            Design it your way.
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your themes, colors, fonts, backgrounds, buttons, and
            layout to match your style.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Features;
