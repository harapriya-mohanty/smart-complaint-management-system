import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const dashboardPath = useMemo(() => {
    const role = user?.role;
    if (role === "admin") return "/admin";
    if (role === "resident") return "/resident";
    if (role === "worker") return "/worker";
    return null;
  }, [user?.role]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f7efe9] to-[#f2d9d6] flex items-center">
      <div className="max-w-6xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">
            Smart Complaint Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Efficient complaint handling and resolution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              type="button"
              onClick={() => navigate(dashboardPath || "/login")}
              className="bg-[#1E1917] text-white px-6 py-3 rounded-2xl hover:bg-[#AE2828] transition"
            >
              Get Started
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-white text-slate-900 px-6 py-3 rounded-2xl border border-slate-200 hover:bg-slate-50 transition"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="rounded-3xl bg-white/80 border border-white shadow-xl p-8">
            <p className="text-slate-700 text-lg">
              Join the smart community and simplify complaint tracking, approvals, and worker coordination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
