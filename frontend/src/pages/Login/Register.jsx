import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { useAuth } from "../../context/authContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("resident");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);
    try {
      const response = await registerUser({ name, email, password, role });
      const { token, ...userData } = response.data;
      login(userData, token);

      if (userData.role === "admin") navigate("/admin");
      else if (userData.role === "worker") navigate("/worker");
      else navigate("/resident");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">
      <h1 className="text-3xl font-bold text-center mb-8">Register</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          className="w-full border p-3 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-3 rounded-lg bg-white"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="resident">Resident</option>
          <option value="worker">Worker</option>
          <option value="admin">Admin</option>
        </select>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center mt-5">
        Already have an account?{" "}
        <Link to="/login" className="text-[#AE2828] cursor-pointer ml-1">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;
