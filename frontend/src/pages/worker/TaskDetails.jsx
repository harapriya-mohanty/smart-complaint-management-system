import ComplaintDetailsView from "../../components/ComplaintDetailsView";

function TaskDetails({ taskId, refreshToken, onUpload }) {
  return (
    <ComplaintDetailsView
      complaintId={taskId}
      refreshToken={refreshToken}
      title="Task Details"
      subtitle="View assigned task details"
      emptyText="Select a task from Assigned Tasks."
      showResident
      showPriority
      renderExtra={(task) => (
        <>
          {task.notes && (
            <div className="pt-2">
              <p className="text-gray-500 mb-1">Worker Notes:</p>
              <p className="text-gray-700 whitespace-pre-wrap">{task.notes}</p>
            </div>
          )}

          <div className="pt-2">
            {task.status === "assigned" || task.status === "in-progress" ? (
              <button
                type="button"
                onClick={() => onUpload?.()}
                className="bg-green-600 text-white px-6 py-3 rounded-2xl hover:bg-green-700 transition"
              >
                Upload Completion Proof
              </button>
            ) : (
              <p className="text-gray-500">
                {task.completionProof && !task.residentVerified
                  ? "Submitted. Waiting for resident verification."
                  : task.status === "completed" || task.residentVerified
                    ? "Completed and verified."
                    : null}
              </p>
            )}
          </div>
        </>
      )}
    />
  );
}

export default TaskDetails;
