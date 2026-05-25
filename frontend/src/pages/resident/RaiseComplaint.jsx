import ComplaintForm from "./components/ComplaintForm";

function RaiseComplaint({ onCreated }) {

  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg">

      <h1 className="text-3xl font-bold mb-2">
        Raise Complaint
      </h1>

      <p className="text-gray-500 mb-8">
        Submit maintenance issues with details
      </p>

      <ComplaintForm onCreated={onCreated} />

    </div>
  );
}

export default RaiseComplaint;
