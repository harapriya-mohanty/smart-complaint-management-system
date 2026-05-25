import {
  FaClipboardList,
  FaHistory,
  FaCheckCircle,
} from "react-icons/fa";

function ResidentSidebar({ active, setActive, isOpen, onClose }) {
  const itemBase =
    "flex items-center gap-4 p-4 rounded-xl transition duration-300 cursor-pointer";
  const itemIdle = "hover:bg-slate-800";
  const itemActive = "bg-slate-800 ring-1 ring-white/10";

  const handleSelect = (key) => {
    setActive(key);
    onClose?.();
  };

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
          "w-72 h-screen bg-slate-900 text-white fixed p-6 z-50",
          "transition-transform duration-200 ease-out",
          "md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >

      <div className="mb-12 flex items-start justify-between gap-4">
        <div>

        <h1 className="text-4xl font-bold text-[#AE2828]">
          SCMS
        </h1>

        <p className="text-gray-400 mt-2">
          Resident Portal
        </p>
        </div>

        <button
          type="button"
          className="md:hidden px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20"
          onClick={onClose}
          aria-label="Close menu"
        >
          Close
        </button>

      </div>

      <ul className="space-y-4">

        <li
          onClick={() => handleSelect("raise")}
          className={[
            itemBase,
            active === "raise" ? itemActive : itemIdle,
          ].join(" ")}
        >
          <FaClipboardList className="text-[#AE2828]" />

          Raise Complaint
        </li>

        <li
          onClick={() => handleSelect("history")}
          className={[
            itemBase,
            active === "history" ? itemActive : itemIdle,
          ].join(" ")}
        >
          <FaHistory className="text-yellow-400" />

          Complaint History
        </li>

        <li
          onClick={() => handleSelect("verify")}
          className={[
            itemBase,
            active === "verify" ? itemActive : itemIdle,
          ].join(" ")}
        >
          <FaCheckCircle className="text-green-400" />

          Verify Completion
        </li>

      </ul>
      </div>
    </>
  );
}

export default ResidentSidebar;
