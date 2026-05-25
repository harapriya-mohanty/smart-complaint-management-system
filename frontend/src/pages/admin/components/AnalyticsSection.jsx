function AnalyticsSection({ stats, selectedPeriod, setSelectedPeriod }) {
  const segments = [
    { key: "pending", label: "Pending", value: stats?.pending ?? 0, color: "#F59E0B" },
    { key: "inProcess", label: "In Process", value: stats?.inProcess ?? 0, color: "#3B82F6" },
    { key: "completed", label: "Completed", value: stats?.completed ?? 0, color: "#22C55E" },
    { key: "rejected", label: "Rejected", value: stats?.rejected ?? 0, color: "#EF4444" },
  ];

  const total = segments.reduce((sum, item) => sum + item.value, 0);

  const polarToCartesian = (cx, cy, r, angleInDegrees) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(angleInRadians),
      y: cy + r * Math.sin(angleInRadians),
    };
  };

  const describeArc = (cx, cy, r, startAngle, endAngle) => {
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return [`M ${cx} ${cy}`, `L ${start.x} ${start.y}`, `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`, "Z"].join(" ");
  };

  let currentAngle = 0;
  const pieSegments = segments
    .filter((item) => item.value > 0)
    .map((item) => {
      const angle = total > 0 ? (item.value / total) * 360 : 0;
      const path = describeArc(120, 120, 100, currentAngle, currentAngle + angle);
      currentAngle += angle;
      return { ...item, path };
    });

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Complaint Distribution</h2>
          <p className="text-gray-500">Track how complaints are raised, processed, completed, and rejected.</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor="period" className="text-sm font-medium text-gray-700">
            Period:
          </label>
          <select
            id="period"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-2xl px-4 py-2 bg-white text-sm"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[360px_1fr] items-center">
        <div className="rounded-3xl border border-slate-200 p-6">
          <div className="mb-4 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Raised</p>
            <p className="text-5xl font-bold text-slate-900">{stats?.totalComplaints ?? 0}</p>
            <p className="text-sm text-slate-500">complaints in this period</p>
          </div>

          <div className="flex justify-center">
            <svg width="240" height="240" viewBox="0 0 240 240" className="mx-auto">
              {pieSegments.length === 0 ? (
                <circle cx="120" cy="120" r="100" fill="#f3f4f6" />
              ) : (
                pieSegments.map((item) => (
                  <path key={item.key} d={item.path} fill={item.color} stroke="#fff" strokeWidth="2" />
                ))
              )}
            </svg>
          </div>
        </div>

        <div className="grid gap-4">
          {segments.map((item) => (
            <div key={item.key} className="rounded-3xl border border-slate-200 p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="text-xl font-semibold text-slate-900">{item.value}</p>
                </div>
              </div>
              <span className="text-sm text-slate-500">{total > 0 ? `${Math.round((item.value / total) * 100)}%` : "0%"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsSection;