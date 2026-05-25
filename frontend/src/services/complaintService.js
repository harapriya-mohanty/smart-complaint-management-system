import API from "./api";

export const createComplaint = async (data) => {
  return API.post("/complaints", data);
};

export const getComplaints = async () => {
  return API.get("/complaints");
};

export const getComplaintById = async (id) => {
  return API.get(`/complaints/${id}`);
};

export const updateComplaintStatus = async (id, data) => {
  return API.put(`/complaints/${id}/status`, data);
};

export const assignWorker = async (id, workerId) => {
  return API.put(`/complaints/${id}/assign`, { workerId });
};

export const verifyCompletion = async (id, { action = "accept", notes } = {}) => {
  return API.put(`/complaints/${id}/verify`, { action, notes });
};
