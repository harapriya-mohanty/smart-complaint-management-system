import { useState } from "react";
import { useAuth } from "../../context/authContext";

import WorkerSidebar from "../../components/WorkerSidebar";

import AssignedTasks from "./AssignedTasks";
import UploadWork from "./UploadWork";
import WorkHistory from "./WorkHistory";
import TaskDetails from "./TaskDetails";

function WorkerDashboard() {
  const { logout } = useAuth();

  const [active, setActive] = useState("tasks");
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const [navHistory, setNavHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const setActiveWithHistory = (next) => {
    setNavHistory((prev) => (prev[prev.length - 1] === active ? prev : [...prev, active]));
    setActive(next);
  };

  const handleBack = () => {
    setNavHistory((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const previousKey = next.pop();
      setActive(previousKey);
      return next;
    });
  };

  const renderPage = () => {

    switch (active) {

      case "upload":
        return (
          <UploadWork
            taskId={selectedTaskId}
            onDone={() => {
              setRefreshToken((x) => x + 1);
              setActive("details");
            }}
          />
        );

      case "history":
        return <WorkHistory onSelectTask={(id) => {
          setSelectedTaskId(id);
          setActiveWithHistory("details");
        }} />;

      case "details":
        return <TaskDetails
          taskId={selectedTaskId}
          refreshToken={refreshToken}
          onUpload={() => setActiveWithHistory("upload")}
          onBack={() => handleBack()}
        />;

      default:
        return <AssignedTasks onSelectTask={(id) => {
          setSelectedTaskId(id);
          setActiveWithHistory("details");
        }} />;
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#f7efe9] to-[#f2d9d6] min-h-screen">

      <WorkerSidebar
        active={active}
        setActive={setActiveWithHistory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="md:ml-64 flex-1 p-4 md:p-8">

        <div className="flex justify-between items-center mb-6 md:mb-8">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Worker Dashboard
            </h1>

            <p className="text-gray-600 mt-1">
              Manage assigned maintenance tasks
            </p>

          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={logout}
              className="bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800"
            >
              Logout
            </button>

            <div className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center text-xl font-bold">
              W
            </div>
          </div>

        </div>

        <div className="md:hidden flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="bg-slate-900 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsSidebarOpen(true)}
            >
              Menu
            </button>

            <button
              type="button"
              className="bg-white text-slate-900 px-4 py-2 rounded-lg border"
              onClick={handleBack}
              disabled={navHistory.length === 0}
            >
              Back
            </button>
          </div>

          <button
            onClick={logout}
            className="bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>

        {renderPage()}

      </div>

    </div>
  );
}

export default WorkerDashboard;
