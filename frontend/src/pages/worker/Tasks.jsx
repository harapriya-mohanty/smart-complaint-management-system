import TaskCard from "./components/TaskCard";

function Tasks({ setActive }) {

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Assigned Tasks
      </h1>

      <p className="text-gray-500 mb-8">
        Tasks assigned by admin
      </p>

      <div className="space-y-6">

        <TaskCard
          title="Water Leakage"
          location="D-21"
          status="Pending"
          onClick={() => setActive("details")}
        />

        <TaskCard
          title="Streetlight Issue"
          location="A-09"
          status="In Progress"
          onClick={() => setActive("details")}
        />

      </div>

    </div>
  );
}

export default Tasks;