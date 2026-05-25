import ComplaintDetailsView from "../../components/ComplaintDetailsView";

function ComplaintDetails({ complaintId }) {
  return (
    <ComplaintDetailsView
      complaintId={complaintId}
      title="Complaint Details"
      subtitle="View detailed information about your complaint"
      emptyText="Select a complaint from history."
    />
  );
}

export default ComplaintDetails;
