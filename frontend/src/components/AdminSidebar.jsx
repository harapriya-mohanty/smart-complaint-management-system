function AdminSidebar({ active, setActive, isOpen, onClose }) {
  const linkBase = "cursor-pointer hover:text-[#AE2828]";
  const linkActive = "text-[#AE2828] font-semibold";

  return (
    <>
      <div
        className={[
          "fixed inset-0 bg-black/40 z-40 md:hidden",
          isOpen ? "block" : "hidden",
        ].join(" ")}
        onClick={onClose}
      />

      <div
        className={[
          "w-64 h-screen bg-slate-900 text-white p-6 fixed z-50",
          "transition-transform duration-200 ease-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">
            Admin
          </h1>

          <button
            type="button"
            className="md:hidden px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
            onClick={onClose}
            aria-label="Close menu"
          >
            Close
          </button>
        </div>

        <ul className="space-y-6">
          <li
            onClick={() => {
              setActive("dashboard");
              onClose?.();
            }}
            className={active === "dashboard" ? `${linkBase} ${linkActive}` : linkBase}
          >
            Dashboard
          </li>

          <li
            onClick={() => {
              setActive("complaints");
              onClose?.();
            }}
            className={active === "complaints" ? `${linkBase} ${linkActive}` : linkBase}
          >
            Complaints
          </li>

          <li
            onClick={() => {
              setActive("workers");
              onClose?.();
            }}
            className={active === "workers" ? `${linkBase} ${linkActive}` : linkBase}
          >
            Workers
          </li>

          <li
            onClick={() => {
              setActive("settings");
              onClose?.();
            }}
            className={active === "settings" ? `${linkBase} ${linkActive}` : linkBase}
          >
            Settings
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminSidebar;
