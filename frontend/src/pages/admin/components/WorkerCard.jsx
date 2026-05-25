function WorkerCard({ name, subtitle, statusLabel, taskCounts, onViewTasks }) {
  const counts = {
    completed: taskCounts?.completed ?? 0,
    inProgress: taskCounts?.inProgress ?? 0,
    pending: taskCounts?.pending ?? 0,
    rejected: taskCounts?.rejected ?? 0,
    total: taskCounts?.total ?? 0,
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-4 md:p-6 hover:shadow-lg transition">

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>

        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm">
          {statusLabel}
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-700">
        <div className="rounded-2xl bg-slate-100 p-3">
          <p className="text-gray-500">Total Tasks</p>
          <p className="mt-2 text-lg font-semibold">{counts.total}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <p className="text-gray-500">Completed</p>
          <p className="mt-2 text-lg font-semibold">{counts.completed}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <p className="text-gray-500">In Process</p>
          <p className="mt-2 text-lg font-semibold">{counts.inProgress}</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-3">
          <p className="text-gray-500">Pending</p>
          <p className="mt-2 text-lg font-semibold">{counts.pending}</p>
        </div>
        <div className="col-span-2 rounded-2xl bg-slate-100 p-3">
          <p className="text-gray-500">Rejected</p>
          <p className="mt-2 text-lg font-semibold">{counts.rejected}</p>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={onViewTasks}
          className="bg-slate-900 text-white px-4 py-2 rounded-xl"
        >
          View Tasks
        </button>
      </div>

    </div>
  );
}

export default WorkerCard;
