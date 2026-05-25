import {
  FaClipboardList,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

function StatsCard({ title, value, color }) {

  const styles = {
    yellow: {
      border: "border-yellow-500",
      text: "text-yellow-600",
      icon: <FaClipboardList className="text-3xl md:text-5xl text-yellow-500" />,
    },

    blue: {
      border: "border-[#AE2828]",
      text: "text-[#AE2828]",
      icon: <FaSpinner className="text-3xl md:text-5xl text-[#AE2828]" />,
    },

    green: {
      border: "border-green-500",
      text: "text-green-600",
      icon: <FaCheckCircle className="text-3xl md:text-5xl text-green-500" />,
    },
  };

  return (
    <div className={`bg-white p-4 md:p-6 rounded-3xl shadow-lg border-l-4 ${styles[color].border}`}>

      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <p className={`text-4xl font-bold mt-2 ${styles[color].text}`}>
            {value}
          </p>

        </div>

        {styles[color].icon}

      </div>

    </div>
  );
}

export default StatsCard;