const Appearance = () => {
  return (
    <div>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">
          Appearance
        </h1>

        <p className="mt-2 text-gray-600">
          Customize how your Tied profile looks to visitors.
        </p>
      </div>


      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">


        {/* Customization Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Customize Profile
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Personalize your profile appearance.
          </p>


          {/* Profile Image */}
          <div className="mt-8">

            <label className="block text-sm font-medium text-gray-700">
              Profile Image
            </label>

            <div className="flex items-center gap-5 mt-3">

              <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-2xl">
                👤
              </div>

              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100">
                Upload Image
              </button>

            </div>

          </div>


          {/* Name */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>

            <input
              type="text"
              value="Sakshi"
              readOnly
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50"
            />

          </div>


          {/* Bio */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700">
              Bio
            </label>

            <textarea
              rows="3"
              value="Build. Create. Share."
              readOnly
              className="w-full mt-2 p-3 border border-gray-200 rounded-lg bg-gray-50 resize-none"
            />

          </div>


          {/* Theme */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>

            <div className="flex flex-wrap gap-3 mt-3">

              <button className="px-4 py-2 rounded-lg border-2 border-slate-800 bg-white">
                Light
              </button>

              <button className="px-4 py-2 rounded-lg border border-gray-300 bg-gray-900 text-white">
                Dark
              </button>

              <button className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100">
                Custom
              </button>

            </div>

          </div>


          {/* Button Style */}
          <div className="mt-6">

            <label className="block text-sm font-medium text-gray-700">
              Button Style
            </label>

            <div className="flex flex-wrap gap-3 mt-3">

              <button className="px-5 py-2 rounded-full border-2 border-slate-800">
                Rounded
              </button>

              <button className="px-5 py-2 rounded-lg border border-gray-300">
                Soft
              </button>

              <button className="px-5 py-2 border border-gray-300">
                Square
              </button>

            </div>

          </div>


          {/* Save Button */}
          <button className="mt-8 w-full bg-slate-900 text-white py-3 rounded-lg hover:bg-slate-700">
            Save Changes
          </button>

        </div>


        {/* Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Preview
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Preview how your profile will appear.
              </p>
            </div>

            <span className="text-sm text-green-600">
              ● Live
            </span>

          </div>


          {/* Phone Preview */}
          <div className="flex justify-center mt-8">

            <div className="w-full max-w-75 min-h-130 bg-slate-900 rounded-[2rem] p-3 shadow-xl">

              <div className="bg-white rounded-[1.5rem] min-h-[494px] p-6">

                {/* Profile */}
                <div className="text-center">

                  <div className="w-20 h-20 mx-auto rounded-full bg-slate-200 flex items-center justify-center text-3xl">
                    👤
                  </div>

                  <h3 className="text-xl font-bold mt-4">
                    Sakshi
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Build. Create. Share.
                  </p>

                </div>


                {/* Links */}
                <div className="mt-8 space-y-3">

                  <div className="bg-slate-900 text-white text-center py-3 rounded-full">
                    GitHub
                  </div>

                  <div className="bg-slate-900 text-white text-center py-3 rounded-full">
                    LinkedIn
                  </div>

                  <div className="bg-slate-900 text-white text-center py-3 rounded-full">
                    Portfolio
                  </div>

                  <div className="bg-slate-900 text-white text-center py-3 rounded-full">
                    Resume
                  </div>

                </div>


                {/* Tied Branding */}
                <div className="text-center mt-8 text-xs text-gray-400">
                  Powered by Tied
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Appearance;