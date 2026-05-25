import StatusBadge from "./StatusBadge";

function TaskCard({ title, location, status, onClick }) {

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left border border-gray-200 rounded-2xl p-4 md:p-6 hover:shadow-lg transition"
    >

      <div className="flex justify-between items-center">

        <div>

          <h2 className="text-2xl font-semibold">
            {title}
          </h2>

          <p className="text-gray-500 mt-1">
            Location: {location}
          </p>

        </div>

        <StatusBadge status={status} />

      </div>

    </button>
  );
}

export default TaskCard;
