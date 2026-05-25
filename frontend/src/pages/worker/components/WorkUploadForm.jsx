import { useEffect, useState } from "react";
import { updateTaskStatus } from "../../../services/workerService";
import { uploadFile } from "../../../services/uploadService";

function WorkUploadForm({ taskId, onDone }) {
  const [complaintId, setComplaintId] = useState(() => taskId || "");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    Promise.resolve().then(() => setComplaintId(taskId || ""));
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!complaintId) {
      setError("Select a task first (complaint ID missing).");
      return;
    }

    if (!file) {
      setError("Please upload a proof image/file.");
      return;
    }

    setLoading(true);
    try {
      const uploadRes = await uploadFile(file);
      const proofUrl = uploadRes.data?.url;

      await updateTaskStatus(complaintId, {
        status: "completed",
        notes,
        completionProof: proofUrl,
      });

      setSuccess("Marked as completed. Waiting for resident verification.");
      setNotes("");
      setFile(null);
      onDone?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Complaint ID"
        className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#AE2828]"
        value={complaintId}
        onChange={(e) => setComplaintId(e.target.value)}
      />

      <textarea
        rows="5"
        placeholder="Work completion details..."
        className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#AE2828]"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <input
        type="file"
        className="w-full border border-gray-300 p-4 rounded-2xl"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-700">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-8 py-4 rounded-2xl hover:bg-green-700 transition disabled:opacity-60"
      >

        {loading ? "Uploading..." : "Mark as Completed"}

      </button>

    </form>
  );
}

export default WorkUploadForm;
