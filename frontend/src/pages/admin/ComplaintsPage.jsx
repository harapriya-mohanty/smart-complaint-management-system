import ComplaintTable from "./components/ComplaintTable";
import { useEffect, useMemo, useState } from "react";
import { assignWorker, getComplaintById, getComplaints, updateComplaintStatus } from "../../services/complaintService";
import { getAllWorkers } from "../../services/adminService";
import StatusBadge from "../resident/components/StatusBadge";

function ComplaintsPage({ initialSelectedId }) {
  const [complaints, setComplaints] = useState([]);
  const [workers, setWorkers] = useState([]);
  const [selectedId, setSelectedId] = useState(initialSelectedId || null);
  const [selected, setSelected] = useState(null);
  const [workerId, setWorkerId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [complaintsRes, workersRes] = await Promise.all([getComplaints(), getAllWorkers()]);
      setComplaints(complaintsRes.data || []);
      setWorkers(workersRes.data || []);
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

  useEffect(() => {
    if (!initialSelectedId) return;
    Promise.resolve().then(() => setSelectedId(initialSelectedId));
  }, [initialSelectedId]);

  useEffect(() => {
    if (!selectedId) return;
    let ignore = false;
    const run = async () => {
      setBusy(true);
      setError("");
      try {
        const res = await getComplaintById(selectedId);
        if (!ignore) {
          setSelected(res.data);
          setWorkerId(res.data?.assignedWorker?._id || "");
        }
      } catch (e) {
        if (!ignore) setError(e.response?.data?.message || "Failed to load complaint details");
      } finally {
        if (!ignore) setBusy(false);
      }
    };
    void (async () => {
      await run();
    })();
    return () => {
      ignore = true;
    };
  }, [selectedId]);

  const workerOptions = useMemo(() => workers.map((w) => ({
    id: w._id,
    label: `${w.name} (${w.email})`,
  })), [workers]);

  const handleAssign = async () => {
    if (!selectedId || !workerId) return;
    setBusy(true);
    setError("");
    try {
      await assignWorker(selectedId, workerId);
      await load();
      const detail = await getComplaintById(selectedId);
      setSelected(detail.data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to assign worker");
    } finally {
      setBusy(false);
    }
  };

  const handleAdminStatus = async (status) => {
    if (!selectedId) return;
    setBusy(true);
    setError("");
    try {
      await updateComplaintStatus(selectedId, { status });
      await load();
      const detail = await getComplaintById(selectedId);
      setSelected(detail.data);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to update status");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Complaints
      </h1>

      <p className="text-gray-500 mb-8">
        Manage all resident complaints
      </p>

      {loading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ComplaintTable complaints={complaints} onSelect={setSelectedId} />
          </div>

          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-2xl p-4 md:p-6">
              <h2 className="text-xl font-semibold mb-4">Details</h2>

              {!selected && <p className="text-gray-500">Click a complaint to see details.</p>}

              {selected && (
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold">{selected.title}</p>
                      <p className="text-gray-500 text-sm">{selected.location || "-"}</p>
                    </div>
                    <StatusBadge status={selected.status} />
                  </div>

                  <p className="text-gray-700 text-sm whitespace-pre-wrap">{selected.description}</p>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Resident: {selected.resident?.name} ({selected.resident?.email})</p>
                    <p>Priority: {selected.priority}</p>
                    <p>Category: {selected.category}</p>
                  </div>

                  <div className="pt-2 space-y-2">
                    {(selected.status === "pending" || selected.status === "rejected") ? (
                      <>
                        <label className="text-sm text-gray-600">Assign Worker</label>
                        <select
                          className="w-full border border-gray-300 p-3 rounded-xl bg-white"
                          value={workerId}
                          onChange={(e) => setWorkerId(e.target.value)}
                        >
                          <option value="">Select worker</option>
                          {workerOptions.map((w) => (
                            <option key={w.id} value={w.id}>{w.label}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          disabled={busy || !workerId}
                          onClick={handleAssign}
                          className="w-full bg-slate-900 text-white px-4 py-3 rounded-xl disabled:opacity-60"
                        >
                          Assign
                        </button>
                      </>
                    ) : (
                      <p className="text-sm text-gray-600">
                        Assigned Worker: {selected.assignedWorker ? `${selected.assignedWorker.name} (${selected.assignedWorker.email})` : "—"}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleAdminStatus("in-progress")}
                      className="bg-[#1E1917] text-white px-4 py-3 rounded-xl hover:bg-[#AE2828] disabled:opacity-60"
                    >
                      Mark In Progress
                    </button>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => handleAdminStatus("rejected")}
                      className="bg-red-600 text-white px-4 py-3 rounded-xl disabled:opacity-60"
                    >
                      Reject Complaint
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ComplaintsPage;
