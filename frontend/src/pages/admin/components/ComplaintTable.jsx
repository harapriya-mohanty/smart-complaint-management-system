import StatusBadge from "../../resident/components/StatusBadge";

function ComplaintTable({ complaints = [], onSelect }) {

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">

        <thead>

        <tr className="border-b text-left">

          <th className="pb-4">ID</th>
          <th className="pb-4">Issue</th>
          <th className="pb-4">Location</th>
          <th className="pb-4">Status</th>

        </tr>

      </thead>

      <tbody>
        {complaints.map((c) => (
          <tr
            key={c._id}
            className="border-b hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelect?.(c._id)}
          >
            <td className="py-5">{String(c._id).slice(-6).toUpperCase()}</td>
            <td>{c.title}</td>
            <td>{c.location || "-"}</td>
            <td>
              <StatusBadge status={c.status} />
            </td>
          </tr>
        ))}

      </tbody>

      </table>
    </div>
  );
}

export default ComplaintTable;
