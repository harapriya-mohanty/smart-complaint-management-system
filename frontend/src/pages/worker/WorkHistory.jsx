import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";
import { getWorkHistory } from "../../services/workerService";

function WorkHistory({ onSelectTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getWorkHistory();
        if (!ignore) setTasks(res.data || []);
      } catch (e) {
        if (!ignore) setError(e.response?.data?.message || "Failed to load work history");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Work History
      </h1>

      <p className="text-gray-500 mb-8">
        Previously completed maintenance tasks
      </p>

      <div className="space-y-6">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && tasks.length === 0 && (
          <p className="text-gray-500">No completed tasks yet.</p>
        )}

        {tasks.map((t) => (
          <TaskCard
            key={t._id}
            title={t.title}
            location={t.location || "-"}
            status={t.status}
            onClick={() => onSelectTask?.(t._id)}
          />
        ))}

      </div>

    </div>
  );
}

export default WorkHistory;
