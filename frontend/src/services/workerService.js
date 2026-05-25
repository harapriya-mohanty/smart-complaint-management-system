import API from "./api";

export const getAssignedTasks = async () => {
  return API.get("/workers/tasks");
};

export const updateTaskStatus = async (id, data) => {
  return API.put(`/workers/tasks/${id}`, data);
};

export const getWorkHistory = async () => {
  return API.get("/workers/history");
};
