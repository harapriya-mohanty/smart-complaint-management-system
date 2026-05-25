function Register({ setPage }) {

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-lg w-[400px]">

        <h1 className="text-3xl font-bold text-center mb-8">
          Register
        </h1>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-6"
        />

        <button className="w-full bg-green-600 text-white py-3 rounded-lg">
          Register
        </button>

        <p className="text-center mt-5">

          Already have account?

          <span
            onClick={() => setPage("login")}
            className="text-[#AE2828] cursor-pointer ml-2"
          >
            Login
          </span>

        </p>

      </div>
    </div>
  );
}

export default Register;