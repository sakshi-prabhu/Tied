const Analytics = () => {
  return (
    <div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Analytics
          </h1>

          <p className="mt-2 text-gray-600">
            Track how people interact with your Tied profile.
          </p>
        </div>

        {/* Date Filter */}
        <select className="bg-white border border-gray-200 px-4 py-3 rounded-lg text-gray-700 outline-none">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 90 Days</option>
          <option>Last Year</option>
        </select>

      </div>


      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        {/* Profile Views */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

          <p className="text-gray-500">
            Profile Views
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            12,482
          </h2>

          <p className="text-green-600 text-sm mt-2">
            +18.2% from last period
          </p>

        </div>


        {/* Link Clicks */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

          <p className="text-gray-500">
            Link Clicks
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            3,421
          </h2>

          <p className="text-green-600 text-sm mt-2">
            +12.5% from last period
          </p>

        </div>


        {/* CTR */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

          <p className="text-gray-500">
            Click Through Rate
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-2">
            27.4%
          </h2>

          <p className="text-green-600 text-sm mt-2">
            +4.2% from last period
          </p>

        </div>

      </div>


      {/* Main Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 p-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Profile Performance
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Views and clicks over time
            </p>
          </div>

          <div className="flex gap-4 text-sm">
            <span className="text-gray-600">
              ● Views
            </span>

            <span className="text-gray-600">
              ● Clicks
            </span>
          </div>

        </div>


        {/* Fake Chart UI */}
        <div className="h-72 mt-6 border-l border-b border-gray-200 relative">

          {/* Horizontal Lines */}
          <div className="absolute top-0 left-0 right-0 border-t border-gray-100"></div>

          <div className="absolute top-1/4 left-0 right-0 border-t border-gray-100"></div>

          <div className="absolute top-1/2 left-0 right-0 border-t border-gray-100"></div>

          <div className="absolute top-3/4 left-0 right-0 border-t border-gray-100"></div>

          {/* Chart Text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-400">
              Analytics chart will go here
            </span>
          </div>

        </div>

        {/* Dates */}
        <div className="flex justify-between gap-1 text-[10px] sm:text-xs text-gray-400 mt-3">
          <span>Aug 22</span>
          <span>Aug 23</span>
          <span>Aug 24</span>
          <span>Aug 25</span>
          <span>Aug 26</span>
          <span>Aug 27</span>
          <span>Aug 28</span>
        </div>

      </div>


      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">


        {/* Top Links */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Top Links
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your most clicked links
          </p>


          <div className="mt-6 space-y-5">

            <div className="flex justify-between items-center">
              <span>GitHub</span>
              <span className="font-semibold">842</span>
            </div>

            <div className="flex justify-between items-center">
              <span>LinkedIn</span>
              <span className="font-semibold">621</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Portfolio</span>
              <span className="font-semibold">493</span>
            </div>

            <div className="flex justify-between items-center">
              <span>Resume</span>
              <span className="font-semibold">317</span>
            </div>

          </div>

        </div>


        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

          <h2 className="text-xl font-semibold text-gray-900">
            Traffic Sources
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Where your visitors are coming from
          </p>


          <div className="mt-6 space-y-5">

            <div>
              <div className="flex justify-between mb-2">
                <span>Instagram</span>
                <span className="font-semibold">42%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-slate-800 rounded-full w-[42%]"></div>
              </div>
            </div>


            <div>
              <div className="flex justify-between mb-2">
                <span>LinkedIn</span>
                <span className="font-semibold">27%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-slate-800 rounded-full w-[27%]"></div>
              </div>
            </div>


            <div>
              <div className="flex justify-between mb-2">
                <span>Google</span>
                <span className="font-semibold">18%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-slate-800 rounded-full w-[18%]"></div>
              </div>
            </div>


            <div>
              <div className="flex justify-between mb-2">
                <span>Direct</span>
                <span className="font-semibold">13%</span>
              </div>

              <div className="h-2 bg-gray-100 rounded-full">
                <div className="h-2 bg-slate-800 rounded-full w-[13%]"></div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Analytics;