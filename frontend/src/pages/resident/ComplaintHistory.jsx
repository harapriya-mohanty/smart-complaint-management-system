import { useEffect, useState } from "react";
import ComplaintCard from "./components/ComplaintCard";
import { getComplaints } from "../../services/complaintService";

function ComplaintHistory({ onSelectComplaint }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getComplaints();
        if (!ignore) setComplaints(res.data || []);
      } catch (e) {
        if (!ignore) setError(e.response?.data?.message || "Failed to load complaints");
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
        Complaint History
      </h1>

      <p className="text-gray-500 mb-8">
        View all your complaints
      </p>

      <div className="space-y-6">
        {loading && <p className="text-gray-500">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}
        {!loading && !error && complaints.length === 0 && (
          <p className="text-gray-500">No complaints yet.</p>
        )}

        {complaints.map((c) => (
          <ComplaintCard
            key={c._id}
            title={c.title}
            location={c.location || "-"}
            status={c.status}
            onClick={() => onSelectComplaint?.(c._id)}
          />
        ))}

      </div>

    </div>
  );
}

export default ComplaintHistory;
