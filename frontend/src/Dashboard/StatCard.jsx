import { useState } from "react";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

// Percent change vs the previous period; null when there's nothing to compare to
const percentChange = (current, previous) =>
  previous ? Math.round(((current - previous) / previous) * 1000) / 10 : null;

const StatCard = ({ label, value, current, previous, suffix = "", info }) => {
  const change = percentChange(current, previous);
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">

      <div className="relative flex items-center gap-1.5">
        <p className="text-gray-500">
          {label}
        </p>

        {/* Hover on desktop, tap on mobile (tapping elsewhere closes it) */}
        {info && (
          <button
            type="button"
            onClick={() => setShowInfo(true)}
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            onBlur={() => setShowInfo(false)}
            aria-label={`What is ${label}?`}
            aria-expanded={showInfo}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            <HiOutlineQuestionMarkCircle />
          </button>
        )}

        {info && showInfo && (
          <p
            role="tooltip"
            className="absolute left-0 top-full mt-2 z-10 w-64 max-w-[80vw] p-3 text-sm text-white bg-slate-900 rounded-lg shadow-lg"
          >
            {info}
          </p>
        )}
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-2">
        {value.toLocaleString()}{suffix}
      </h2>

      {change === null ? (
        <p className="text-gray-400 text-sm mt-2">
          No data from last period
        </p>
      ) : (
        <p className={`text-sm mt-2 ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
          {change >= 0 ? "+" : ""}{change}% from last period
        </p>
      )}

    </div>
  );
};

export default StatCard;
