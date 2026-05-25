import StatsCard from "./components/StatsCard";
import AnalyticsSection from "./components/AnalyticsSection";
import { useEffect, useState } from "react";
import { getAnalytics } from "../../services/adminService";

function DashboardHome({ setActive }) {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");
  const [period, setPeriod] = useState("month");

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setError("");
      try {
        const res = await getAnalytics(period);
        if (!ignore) setStats(res.data);
      } catch (e) {
        if (!ignore) setError(e.response?.data?.message || "Failed to load analytics");
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [period]);

  return (
    <>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <StatsCard
          title="Pending"
          value={stats?.pending ?? "-"}
          color="yellow"
        />

        <StatsCard
          title="In Progress"
          value={stats?.inProcess ?? stats?.inProgress ?? "-"}
          color="blue"
        />

        <StatsCard
          title="Completed"
          value={stats?.completed ?? "-"}
          color="green"
        />

      </div>

      {error && (
        <div className="bg-white p-4 rounded-2xl shadow mb-8">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white p-8 rounded-3xl shadow-lg mb-8">

        <h2 className="text-2xl font-bold mb-5">
          Quick Actions
        </h2>

        <div className="flex gap-4 flex-wrap">

          <button
            onClick={() => setActive("complaints")}
            className="bg-slate-900 text-white px-6 py-3 rounded-2xl"
          >
            View Complaints
          </button>

          <button
            onClick={() => setActive("workers")}
            className="bg-[#1E1917] text-white px-6 py-3 rounded-2xl hover:bg-[#AE2828] transition"
          >
            Manage Workers
          </button>

        </div>

      </div>

      <AnalyticsSection
        stats={stats}
        selectedPeriod={period}
        setSelectedPeriod={setPeriod}
      />

    </>
  );
}

export default DashboardHome;
