import InfoTip from "./InfoTip.jsx";

// Percent change vs the previous period; null when there's nothing to compare to
const percentChange = (current, previous) =>
  previous ? Math.round(((current - previous) / previous) * 1000) / 10 : null;

const StatCard = ({ label, value, current, previous, suffix = "", info }) => {
  const change = percentChange(current, previous);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 dark:bg-slate-900 dark:border-slate-700">

      <div className="relative flex items-center gap-1.5">
        <p className="text-gray-500 dark:text-gray-400">
          {label}
        </p>

        {info && <InfoTip label={label} text={info} />}
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mt-2 dark:text-gray-100">
        {value.toLocaleString()}{suffix}
      </h2>

      {change === null ? (
        <p className="text-gray-400 text-sm mt-2 dark:text-gray-500">
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
