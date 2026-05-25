import { useEffect, useMemo, useState } from "react";
import { getComplaintById } from "../services/complaintService";
import StatusBadge from "../pages/resident/components/StatusBadge";

function ComplaintDetailsView({
  complaintId,
  title = "Complaint Details",
  subtitle = "View detailed information",
  emptyText = "Select a complaint to view details.",
  refreshToken,
  showResident = false,
  showPriority = false,
  showCategory = false,
  renderExtra,
}) {
  const apiBase = useMemo(
    () => (import.meta.env.VITE_API_URL || "https://smart-complain-management-system.onrender.com/api").replace(/\/api\/?$/, ""),
    []
  );

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!complaintId) return;
    let ignore = false;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getComplaintById(complaintId);
        if (!ignore) setComplaint(res.data);
      } catch (e) {
        if (!ignore) setError(e.response?.data?.message || "Failed to load complaint");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    run();
    return () => {
      ignore = true;
    };
  }, [complaintId, refreshToken]);

  const resolveUrl = (maybeRelative) => {
    if (!maybeRelative) return "";
    return maybeRelative.startsWith("http") ? maybeRelative : `${apiBase}${maybeRelative}`;
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">{subtitle}</p>

      {!complaintId && <p className="text-gray-500">{emptyText}</p>}
      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {complaint && (
        <div className="border border-gray-200 rounded-2xl p-4 md:p-6 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{complaint.title}</h2>
              <p className="text-gray-500 mt-1">Location: {complaint.location || "-"}</p>
            </div>
            <StatusBadge status={complaint.status} />
          </div>

          <p className="text-gray-700 whitespace-pre-wrap">{complaint.description}</p>

          {(showResident || showPriority || showCategory) && (
            <div className="text-sm text-gray-600 space-y-1">
              {showResident && (
                <p>
                  Resident: {complaint.resident?.name || "-"}
                  {complaint.resident?.email ? ` (${complaint.resident.email})` : ""}
                </p>
              )}
              {showPriority && <p>Priority: {complaint.priority || "-"}</p>}
              {showCategory && <p>Category: {complaint.category || "-"}</p>}
            </div>
          )}

          {complaint.imageUrl && (
            <div className="pt-2">
              <p className="text-gray-500 mb-2">Complaint Photo:</p>
              <img
                className="max-h-80 w-full object-contain rounded-2xl border"
                src={resolveUrl(complaint.imageUrl)}
                alt="Complaint"
              />
            </div>
          )}

          {complaint.assignedWorker && (
            <p className="text-gray-500">
              Assigned Worker: {complaint.assignedWorker.name} ({complaint.assignedWorker.email})
            </p>
          )}

          {complaint.completionProof && (
            <div className="pt-2">
              <p className="text-gray-500 mb-2">Completion Proof:</p>
              <img
                className="max-h-80 w-full object-contain rounded-2xl border mb-3"
                src={resolveUrl(complaint.completionProof)}
                alt="Completion proof"
              />
              <a
                className="text-[#AE2828] underline"
                href={resolveUrl(complaint.completionProof)}
                target="_blank"
                rel="noreferrer"
              >
                View proof
              </a>
            </div>
          )}

          {typeof renderExtra === "function" ? renderExtra(complaint) : null}
        </div>
      )}
    </div>
  );
}

export default ComplaintDetailsView;
