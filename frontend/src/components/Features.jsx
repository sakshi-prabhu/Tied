const Features = () => {
  return (
   <div id="features" className="bg-slate-100 py-12">
      <p className="text-sm font-semibold tracking-widest text-teal-600 text-center mt-3">
        EVERYTHING TIED TOGETHER
      </p>

      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-900 mt-2">
        Your Online Identity, In One Place.
      </h2>

      <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mt-4">
        Create, customize, share, and understand your digital presence — all
        through one simple page.
      </p>

      <div className="grid grid-cols-3 gap-6 px-5 py-10 text-black ">
       <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Smart Sharing</p>
          <h3 className="text-lg font-bold mb-2 text-gray-900">
            One link. Everywhere you go.
          </h3>
          <p className="text-gray-600">
            Bring your profiles, portfolio, resume, projects, and socials
            together in one personalized page.
          </p>
        </div>
         <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Profile Identity</p>
          <h3 className="text-lg font-bold mb-3 text-gray-900">
            Build your digital identity.
          </h3>
          <p className="text-gray-600">
            Create a personalized profile with your photo, name, bio, social
            handles, and a unique Tied URL.
          </p>
        </div>

         <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Analytics</p>
          <h3 className="text-lg font-bold mb-2 text-gray-900">
            Know what gets attention.
          </h3>
          <p className="text-gray-600">
            Understand your audience with profile views, link clicks,
            click-through rates, and your top-performing links.
          </p>
        </div>

        <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Link Management</p>
          <h3 className="text-lg font-bold mb-3 text-gray-900">
            Your links, your way.
          </h3>
          <p className="text-gray-600">
            Add, edit, reorder, enable, or disable your links anytime — all from
            one simple dashboard.
          </p>
        </div>
        <div className="flex flex-col justify-center border border-gray-300 rounded-lg p-6 bg-white hover:shadow-2xl hover:-translate-y-1 hover:border-teal-300 transition-all duration-300">
          <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 mb-3">Personalization</p>
          <h3 className="text-lg font-bold mb-3 text-gray-900">
            Design it your way.
          </h3>
          <p className="text-gray-600">
            Customize your themes, colors, fonts, backgrounds, buttons, and
            layout to match your style.
          </p>
        </div>
      </div>
    </div>
  );
};
export default Features;
