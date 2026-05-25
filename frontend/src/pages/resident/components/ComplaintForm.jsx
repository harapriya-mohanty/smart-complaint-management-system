import { useState } from "react";
import { createComplaint } from "../../../services/complaintService";
import { uploadFile } from "../../../services/uploadService";

function ComplaintForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("other");
  const [priority, setPriority] = useState("medium");
  const [suggestedSolution, setSuggestedSolution] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !description) {
      setError("Title and description are required.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (file) {
        const uploadRes = await uploadFile(file);
        imageUrl = uploadRes.data?.url || "";
      }

      await createComplaint({
        title,
        description,
        location,
        category,
        priority,
        suggestedSolution,
        imageUrl,
      });

      setSuccess("Complaint submitted successfully.");
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("other");
      setPriority("medium");
      setSuggestedSolution("");
      setFile(null);
      onCreated?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit complaint.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Complaint Title"
        className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#AE2828]"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        rows="5"
        placeholder="Describe the issue..."
        className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#AE2828]"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          placeholder="Location / Block Number"
          className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#AE2828]"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <select
          className="w-full border border-gray-300 p-4 rounded-2xl outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="other">Other</option>
          <option value="electrical">Electrical</option>
          <option value="plumbing">Plumbing</option>
          <option value="cleaning">Cleaning</option>
          <option value="security">Security</option>
        </select>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          className="w-full border border-gray-300 p-4 rounded-2xl outline-none"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <input
        type="text"
        placeholder="Suggested Solution (optional)"
        className="w-full border border-gray-300 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#AE2828]"
        value={suggestedSolution}
        onChange={(e) => setSuggestedSolution(e.target.value)}
      />
      </div>

      <input
        type="file"
        className="border border-gray-300 p-4 rounded-2xl w-full"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-700">{success}</p>}

      <button
        type="submit"
        disabled={loading}
        className="bg-[#1E1917] text-white px-8 py-4 rounded-2xl hover:bg-[#AE2828] transition disabled:opacity-60"
      >

        {loading ? "Submitting..." : "Submit Complaint"}

      </button>

    </form>
  );
}

export default ComplaintForm;
