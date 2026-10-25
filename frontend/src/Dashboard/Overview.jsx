import { useAuth } from "../context/AuthContext.jsx";
import useAnalytics from "../hooks/useAnalytics.js";
import StatCard from "./StatCard.jsx";
import { CTR_INFO } from "./statInfo.js";
import PerformanceChart, { SeriesLegend } from "./PerformanceChart.jsx";

const Overview = () => {
  const { profile } = useAuth();
  const { data, error } = useAnalytics(7);

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Overview
      </h1>

      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Welcome back, {profile.displayName || profile.username}! Here's what's happening with your Tied profile.
      </p>

      {error && (
        <p className="mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 dark:text-red-300 dark:bg-red-950/40 dark:border-red-900">
          {error}
        </p>
      )}

      {!data && !error && (
        <p className="mt-8 text-gray-500 dark:text-gray-400">Loading stats...</p>
      )}

      {data && (
        <>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <StatCard
              label="Profile Views"
              value={data.period.views}
              current={data.period.views}
              previous={data.previousPeriod.views}
            />
            <StatCard
              label="Link Clicks"
              value={data.period.clicks}
              current={data.period.clicks}
              previous={data.previousPeriod.clicks}
            />
            <StatCard
              label="Click Through Rate"
              info={CTR_INFO}
              value={data.period.ctr}
              suffix="%"
              current={data.period.ctr}
              previous={data.previousPeriod.ctr}
            />
          </div>

          {/* Bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">

            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-200 min-w-0 dark:bg-slate-900 dark:border-slate-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Profile Performance
                  </h2>
                  <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                    Last 7 days
                  </p>
                </div>

                <SeriesLegend />
              </div>

              <PerformanceChart series={data.series} />
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-slate-900 dark:border-slate-700">
              <h2 className="text-xl font-semibold">
                Top Links
              </h2>

              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                All-time clicks
              </p>

              <div className="mt-6 space-y-5">
                {data.topLinks.length === 0 && (
                  <p className="text-gray-400 text-sm dark:text-gray-500">No links yet</p>
                )}

                {data.topLinks.map((link) => (
                  <div key={link._id} className="flex justify-between gap-4">
                    <span className="truncate">{link.title}</span>
                    <span className="font-semibold">{link.clicks.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default Overview;
