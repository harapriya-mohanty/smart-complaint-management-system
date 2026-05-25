import { useState } from "react";

function Login({ setPage, selectedRole, setSelectedRole, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const ok = onLogin({
      email,
      password,
      role: selectedRole,
    });

    if (!ok) {
      setError("Enter email, password, and select a role.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded-lg"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="resident">Resident</option>
            <option value="worker">Worker</option>
            <option value="admin">Admin</option>
          </select>

          {
            error
              ? <p className="text-sm text-red-600">{error}</p>
              : null
          }

          <button
            type="submit"
            className="w-full bg-[#1E1917] text-white py-3 rounded-lg hover:bg-[#AE2828]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5">

          Don't have account?

          <span
            onClick={() => setPage("register")}
            className="text-[#AE2828] cursor-pointer ml-2"
          >
            Register
          </span>

        </p>

      </div>
    </div>
  );
}

export default Login;
