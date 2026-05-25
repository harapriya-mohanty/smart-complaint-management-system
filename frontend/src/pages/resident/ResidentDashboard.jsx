import { useState } from "react";
import { useAuth } from "../../context/authContext";

import ResidentSidebar from "../../components/ResidentSidebar";

import RaiseComplaint from "./RaiseComplaint";
import ComplaintHistory from "./ComplaintHistory";
import VerifyCompletion from "./VerifyCompletion";
import ComplaintDetails from "./ComplaintDetails";

function ResidentDashboard() {
  const { logout } = useAuth();

  const [active, setActive] = useState("raise");
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

      case "history":
        return <ComplaintHistory
          onSelectComplaint={(id) => {
            setSelectedComplaintId(id);
            setActiveWithHistory("details");
          }}
        />;

      case "verify":
        return <VerifyCompletion
          onSelectComplaint={(id) => {
            setSelectedComplaintId(id);
            setActiveWithHistory("details");
          }}
        />;

      case "details":
        return <ComplaintDetails complaintId={selectedComplaintId} />;

      default:
        return <RaiseComplaint onCreated={() => setActiveWithHistory("history")} />;
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-[#f7efe9] to-[#f2d9d6] min-h-screen">

      <ResidentSidebar
        active={active}
        setActive={setActiveWithHistory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="md:ml-72 flex-1 p-4 md:p-8">

        <div className="flex justify-between items-center mb-6 md:mb-8">

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Resident Dashboard
            </h1>

            <p className="text-gray-600 mt-1">
              Smart Complaint & Maintenance System
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
              R
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

export default ResidentDashboard;
