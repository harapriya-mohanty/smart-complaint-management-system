import { useEffect, useMemo, useState } from "react";
import { getAllWorkers } from "../../services/adminService";
import { getComplaints } from "../../services/complaintService";
import StatusBadge from "../resident/components/StatusBadge";

function WorkerTasksPage({ workerId, onOpenComplaint }) {
  const [workers, setWorkers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const [workersRes, complaintsRes] = await Promise.all([getAllWorkers(), getComplaints()]);
        if (!ignore) {
          setWorkers(workersRes.data || []);
          setComplaints(complaintsRes.data || []);
        }
      } catch (e) {
        if (!ignore) setError(e.response?.data?.message || "Failed to load worker tasks");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, []);

  const worker = useMemo(
    () => workers.find((w) => w._id === workerId) || null,
    [workers, workerId]
  );

  const tasks = useMemo(
    () => complaints.filter((c) => c.assignedWorker?._id === workerId),
    [complaints, workerId]
  );

  return (
    <div className="bg-white p-4 md:p-8 rounded-3xl shadow-lg">
      <h1 className="text-3xl font-bold mb-2">Worker Tasks</h1>
      <p className="text-gray-500 mb-8">
        {worker ? `${worker.name} (${worker.email})` : "Select a worker to view tasks"}
      </p>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && tasks.length === 0 && (
        <p className="text-gray-500">No tasks assigned.</p>
      )}

      <div className="space-y-4">
        {tasks.map((t) => (
          <button
            key={t._id}
            type="button"
            onClick={() => onOpenComplaint?.(t._id)}
            className="w-full text-left border rounded-2xl p-4 flex items-start justify-between gap-4 hover:shadow transition"
          >
            <div>
              <p className="font-semibold">{t.title}</p>
              <p className="text-gray-500 text-sm">{t.location || "-"}</p>
            </div>
            <StatusBadge status={t.status} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default WorkerTasksPage;

