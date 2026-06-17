import API from "./api";

// Get all tasks
export const getTasks = async (params = {}) => {
  const response = await API.get("/tasks", { params });
  return response.data;
};

// Get dashboard stats
export const getTaskStats = async () => {
  const response = await API.get("/tasks/stats/dashboard");
  return response.data;
};

// Create task
export const createTask = async (taskData) => {
  const response = await API.post("/tasks", taskData);
  return response.data;
};

// Update task
export const updateTask = async (id, taskData) => {
  const response = await API.put(`/tasks/${id}`, taskData);
  return response.data;
};

// Delete task
export const deleteTask = async (id) => {
  const response = await API.delete(`/tasks/${id}`);
  return response.data;
};