function SettingsPage() {

  return (
    <div className="bg-white p-4 md:p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Settings
      </h1>

      <p className="text-gray-500 mb-8">
        Manage dashboard settings
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="border p-4 md:p-5 rounded-2xl">

          <h2 className="text-xl font-semibold">
            Notification Settings
          </h2>

          <p className="text-gray-500 mt-1">
            Manage alerts and updates
          </p>

        </div>

        <div className="border p-4 md:p-5 rounded-2xl">

          <h2 className="text-xl font-semibold">
            Security
          </h2>

          <p className="text-gray-500 mt-1">
            Password and authentication settings
          </p>

        </div>

      </div>

    </div>
  );
}

export default SettingsPage;
