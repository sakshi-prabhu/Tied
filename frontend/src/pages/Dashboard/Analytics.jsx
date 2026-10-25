import { useState } from "react";
import useAnalytics from "../../hooks/useAnalytics.js";
import StatCard from "../../Dashboard/StatCard.jsx";
import PerformanceChart, { SeriesLegend } from "../../Dashboard/PerformanceChart.jsx";

const RANGES = [
  { days: 7, label: "Last 7 Days" },
  { days: 30, label: "Last 30 Days" },
  { days: 90, label: "Last 90 Days" },
  { days: 365, label: "Last Year" },
];

const Analytics = () => {
  const [days, setDays] = useState(7);
  const { data, error } = useAnalytics(days);

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
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          aria-label="Date range"
          className="bg-white border border-gray-200 px-4 py-3 rounded-lg text-gray-700 outline-none"
        >
          {RANGES.map((range) => (
            <option key={range.days} value={range.days}>
              {range.label}
            </option>
          ))}
        </select>

      </div>


      {error && (
        <p className="mt-6 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}

      {!data && !error && (
        <p className="mt-8 text-gray-500">Loading analytics...</p>
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
              value={data.period.ctr}
              suffix="%"
              current={data.period.ctr}
              previous={data.previousPeriod.ctr}
            />
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

              <SeriesLegend />

            </div>

            <PerformanceChart series={data.series} />

          </div>


          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">


            {/* Top Links */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

              <h2 className="text-xl font-semibold text-gray-900">
                Top Links
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Your most clicked links (all time)
              </p>


              <div className="mt-6 space-y-5">

                {data.topLinks.length === 0 && (
                  <p className="text-gray-400 text-sm">No links yet</p>
                )}

                {data.topLinks.map((link) => (
                  <div key={link._id} className="flex justify-between items-center gap-4">
                    <span className="truncate">{link.title}</span>
                    <span className="font-semibold">{link.clicks.toLocaleString()}</span>
                  </div>
                ))}

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

                {data.sources.length === 0 && (
                  <p className="text-gray-400 text-sm">No visitors in this period yet</p>
                )}

                {data.sources.map((source) => (
                  <div key={source.name}>
                    <div className="flex justify-between mb-2">
                      <span>{source.name}</span>
                      <span className="font-semibold">{source.percent}%</span>
                    </div>

                    <div className="h-2 bg-gray-100 rounded-full">
                      <div
                        className="h-2 bg-slate-800 rounded-full"
                        style={{ width: `${source.percent}%` }}
                      ></div>
                    </div>
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

export default Analytics;
