const Overview = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">
        Overview
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome back! Here's what's happening with your Tied profile.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Profile Views</p>
          <h2 className="text-3xl font-bold mt-2">
            12,482
          </h2>
          <p className="text-green-600 mt-2">
            +18.2% ↑
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Link Clicks</p>
          <h2 className="text-3xl font-bold mt-2">
            3,421
          </h2>
          <p className="text-green-600 mt-2">
            +12.5% ↑
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-gray-500">Click Through Rate</p>
          <h2 className="text-3xl font-bold mt-2">
            27.4%
          </h2>
          <p className="text-green-600 mt-2">
            +4.2% ↑
          </p>
        </div>

      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">
            Profile Performance
          </h2>

          <div className="h-64 flex items-center justify-center text-gray-400">
            Graph will go here
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold">
            Top Links
          </h2>

          <div className="mt-6 space-y-5">

            <div className="flex justify-between">
              <span>GitHub</span>
              <span className="font-semibold">842</span>
            </div>

            <div className="flex justify-between">
              <span>LinkedIn</span>
              <span className="font-semibold">621</span>
            </div>

            <div className="flex justify-between">
              <span>Portfolio</span>
              <span className="font-semibold">493</span>
            </div>

            <div className="flex justify-between">
              <span>Resume</span>
              <span className="font-semibold">317</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Overview;