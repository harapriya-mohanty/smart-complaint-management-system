function StatusBadge({ status }) {

  const normalized = String(status || "").toLowerCase();

  const labelMap = {
    pending: "Pending",
    assigned: "Assigned",
    "in-progress": "In Progress",
    "awaiting-verification": "Awaiting Verification",
    completed: "Completed",
    rejected: "Rejected",
  };

  const styleMap = {
    pending: "bg-yellow-100 text-yellow-700",
    assigned: "bg-indigo-100 text-indigo-700",
    "in-progress": "bg-[#f7e0df] text-[#AE2828]",
    "awaiting-verification": "bg-purple-100 text-purple-700",
    completed: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };

  const label = labelMap[normalized] || status;
  const style = styleMap[normalized] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-4 py-2 rounded-full text-sm ${style}`}>

      {label}

    </span>
  );
}

export default StatusBadge;
