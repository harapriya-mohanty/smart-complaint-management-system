import WorkUploadForm from "./components/WorkUploadForm";

function UploadWork({ taskId, onDone }) {

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Upload Completed Work
      </h1>

      <p className="text-gray-500 mb-8">
        Upload proof image and mark work completed
      </p>

      {!taskId ? (
        <p className="text-gray-500">Select a task first from Assigned Tasks.</p>
      ) : (
        <WorkUploadForm taskId={taskId} onDone={onDone} />
      )}

    </div>
  );
}

export default UploadWork;
