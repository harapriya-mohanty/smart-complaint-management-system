import { useEffect, useMemo, useState } from "react";
import ComplaintCard from "./components/ComplaintCard";
import { getComplaints, verifyCompletion } from "../../services/complaintService";

function VerifyCompletion({ onSelectComplaint }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState(null);

  const awaiting = useMemo(
    () => (complaints || []).filter((c) => c.status === "awaiting-verification"),
    [complaints]
  );

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getComplaints();
      setComplaints(res.data || []);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void (async () => {
      await load();
    })();
  }, []);

  const handleAction = async (complaintId, action) => {
    setBusyId(complaintId);
    setError("");
    try {
      await verifyCompletion(complaintId, { action });
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Failed to verify complaint");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Verify Completed Work
      </h1>

      <p className="text-gray-500 mb-8">
        Approve or reject completed maintenance
      </p>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && awaiting.length === 0 && (
        <p className="text-gray-500">No complaints awaiting verification.</p>
      )}

      <div className="space-y-6">
        {awaiting.map((c) => (
          <div key={c._id} className="border border-gray-200 rounded-2xl p-4 md:p-6">
            <ComplaintCard
              title={c.title}
              location={c.location || "-"}
              status={c.status}
              onClick={() => onSelectComplaint?.(c._id)}
            />

            <div className="flex flex-col md:flex-row gap-4 mt-6">
              <button
                type="button"
                disabled={busyId === c._id}
                onClick={() => handleAction(c._id, "accept")}
                className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition disabled:opacity-60"
              >
                Accept
              </button>

              <button
                type="button"
                disabled={busyId === c._id}
                onClick={() => handleAction(c._id, "reject")}
                className="bg-red-600 text-white px-6 py-3 rounded-2xl hover:bg-red-700 transition disabled:opacity-60"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default VerifyCompletion;
