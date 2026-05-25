import { useState } from "react";
import { useAuth } from "../../context/authContext";

import AdminSidebar from "../../components/AdminSidebar";

import DashboardHome from "./DashboardHome";
import ComplaintsPage from "./ComplaintsPage";
import WorkersPage from "./WorkersPage";
import SettingsPage from "./SettingsPage";
import WorkerTasksPage from "./WorkerTasksPage";
import ComplaintDetailsPage from "./ComplaintDetailsPage";

function AdminDashboard() {
  const { logout } = useAuth();

  const [active, setActive] = useState("dashboard");
  const [selectedWorkerId, setSelectedWorkerId] = useState(null);
  const [selectedComplaintId, setSelectedComplaintId] = useState(null);
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

      case "complaints":
        return <ComplaintsPage initialSelectedId={selectedComplaintId} />;

      case "workers":
        return <WorkersPage onOpenWorkerTasks={(workerId) => {
          setSelectedWorkerId(workerId);
          setActiveWithHistory("workerTasks");
        }} />;

      case "workerTasks":
        return <WorkerTasksPage
          workerId={selectedWorkerId}
          onOpenComplaint={(complaintId) => {
            setSelectedComplaintId(complaintId);
            setActiveWithHistory("complaintDetails");
          }}
        />;

      case "complaintDetails":
        return <ComplaintDetailsPage complaintId={selectedComplaintId} />;

      case "settings":
        return <SettingsPage />;

      default:
        return <DashboardHome setActive={setActiveWithHistory} />;
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#f7efe9] to-[#f2d9d6] min-h-screen">

      <AdminSidebar
        active={active}
        setActive={setActiveWithHistory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="md:ml-64 flex-1 p-4 md:p-8">

        <div className="flex justify-between items-center mb-6 md:mb-8">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Admin Dashboard
            </h1>

            <p className="text-gray-600 mt-1">
              Smart Complaint Management System
            </p>

          </div>

          <button
            onClick={logout}
            className="hidden md:inline-flex bg-slate-900 text-white px-5 py-3 rounded-2xl hover:bg-slate-800"
          >
            Logout
          </button>

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

export default AdminDashboard;
