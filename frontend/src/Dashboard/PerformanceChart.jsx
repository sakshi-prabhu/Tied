import { useEffect, useRef, useState } from "react";

const SERIES = [
  { key: "views", label: "Views", color: "#2a78d6" },
  { key: "clicks", label: "Clicks", color: "#eb6834" },
];

const HEIGHT = 288;
const PAD = { top: 12, right: 12, bottom: 28, left: 40 };

// "2026-10-25" -> "Oct 25"
const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });

// Rounds the top of the y-axis up to a clean number divisible into 4 gridlines
const niceMax = (value) => {
  if (value <= 4) return 4;
  const step = Math.pow(10, Math.floor(Math.log10(value / 4)));
  const ticks = [1, 2, 2.5, 5, 10].map((m) => m * step);
  return ticks.find((t) => t * 4 >= value) * 4;
};

export const SeriesLegend = () => (
  <div className="flex gap-4 text-sm">
    {SERIES.map((s) => (
      <span key={s.key} className="flex items-center gap-2 text-gray-600">
        <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: s.color }}></span>
        {s.label}
      </span>
    ))}
  </div>
);

const PerformanceChart = ({ series }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const plotWidth = Math.max(width - PAD.left - PAD.right, 0);
  const plotHeight = HEIGHT - PAD.top - PAD.bottom;

  const yMax = niceMax(Math.max(...series.flatMap((d) => [d.views, d.clicks]), 0));
  const x = (i) => PAD.left + (series.length > 1 ? (i / (series.length - 1)) * plotWidth : plotWidth / 2);
  const y = (v) => PAD.top + plotHeight - (v / yMax) * plotHeight;

  const path = (key) =>
    series.map((d, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(d[key]).toFixed(1)}`).join("");

  // At most ~7 date labels so they never collide
  const labelEvery = Math.max(1, Math.ceil(series.length / 7));

  const isEmpty = series.every((d) => !d.views && !d.clicks);

  const handlePointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left - PAD.left) / (plotWidth || 1);
    const index = Math.round(ratio * (series.length - 1));
    setHoverIndex(Math.min(Math.max(index, 0), series.length - 1));
  };

  const hovered = hoverIndex !== null ? series[hoverIndex] : null;

  return (
    <div ref={containerRef} className="relative mt-6 select-none">
      {width > 0 && (
        <svg
          width={width}
          height={HEIGHT}
          onPointerMove={handlePointerMove}
          onPointerLeave={() => setHoverIndex(null)}
          aria-hidden="true"
        >
          {/* Gridlines + y labels */}
          {[0, 1, 2, 3, 4].map((i) => {
            const value = (yMax / 4) * i;
            return (
              <g key={i}>
                <line
                  x1={PAD.left}
                  x2={width - PAD.right}
                  y1={y(value)}
                  y2={y(value)}
                  stroke={i === 0 ? "#d1d5db" : "#f3f4f6"}
                />
                <text x={PAD.left - 8} y={y(value)} dy="0.32em" textAnchor="end" fontSize="11" fill="#9ca3af">
                  {value.toLocaleString()}
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {series.map((d, i) =>
            i % labelEvery === 0 ? (
              <text key={d.date} x={x(i)} y={HEIGHT - 8} textAnchor="middle" fontSize="11" fill="#9ca3af">
                {formatDate(d.date)}
              </text>
            ) : null
          )}

          {/* Crosshair */}
          {hovered && (
            <line
              x1={x(hoverIndex)}
              x2={x(hoverIndex)}
              y1={PAD.top}
              y2={PAD.top + plotHeight}
              stroke="#9ca3af"
            />
          )}

          {/* Lines */}
          {SERIES.map((s) => (
            <path
              key={s.key}
              d={path(s.key)}
              fill="none"
              stroke={s.color}
              strokeWidth="2"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {/* Hover points */}
          {hovered &&
            SERIES.map((s) => (
              <circle
                key={s.key}
                cx={x(hoverIndex)}
                cy={y(hovered[s.key])}
                r="4"
                fill={s.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}
        </svg>
      )}

      {isEmpty && (
        <div className="absolute inset-x-0 top-0 flex items-center justify-center pointer-events-none" style={{ height: HEIGHT - PAD.bottom }}>
          <span className="text-gray-400 text-sm bg-white px-3">
            No views or clicks in this period yet
          </span>
        </div>
      )}

      {/* Tooltip */}
      {hovered && (
        <div
          className="absolute top-2 pointer-events-none bg-white border border-gray-200 rounded-lg shadow-md px-3 py-2 text-sm whitespace-nowrap"
          style={{
            left: x(hoverIndex),
            transform: `translateX(${hoverIndex > series.length / 2 ? "calc(-100% - 12px)" : "12px"})`,
          }}
        >
          <p className="text-gray-500 text-xs mb-1">{formatDate(hovered.date)}</p>
          {SERIES.map((s) => (
            <p key={s.key} className="flex items-center gap-2">
              <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: s.color }}></span>
              <span className="font-semibold text-gray-900">{hovered[s.key].toLocaleString()}</span>
              <span className="text-gray-500">{s.label}</span>
            </p>
          ))}
        </div>
      )}

      {/* Screen-reader table */}
      <table className="sr-only">
        <caption>Views and clicks per day</caption>
        <thead>
          <tr><th>Date</th><th>Views</th><th>Clicks</th></tr>
        </thead>
        <tbody>
          {series.map((d) => (
            <tr key={d.date}><td>{d.date}</td><td>{d.views}</td><td>{d.clicks}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceChart;
