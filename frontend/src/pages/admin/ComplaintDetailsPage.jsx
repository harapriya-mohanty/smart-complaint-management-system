import ComplaintDetailsView from "../../components/ComplaintDetailsView";

function ComplaintDetailsPage({ complaintId }) {
  return (
    <ComplaintDetailsView
      complaintId={complaintId}
      title="Complaint Details"
      subtitle="View detailed complaint information"
      emptyText="Select a task to view complaint details."
      showResident
      showPriority
      showCategory
    />
  );
}

export default ComplaintDetailsPage;

