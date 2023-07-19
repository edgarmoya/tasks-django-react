import axios from "axios";

const taskAPI = axios.create({
  baseURL: "http://localhost:8000/api/tasks",
});

const createHeaders = (authTokens) => ({
  "Content-Type": "application/json",
  Authorization: "Bearer " + String(authTokens.access),
});

const TaskService = {
  getAllTasks: async (authTokens) => {
    return taskAPI.get("/", {
      headers: createHeaders(authTokens),
    });
  },

  getTasksForPage: async (authTokens, page) => {
    return await taskAPI.get("/", {
      headers: createHeaders(authTokens),
      params: {
        page: page,
      },
    });
  },

  getTask: async (authTokens, id) => {
    return taskAPI.get(`/${id}/`, {
      headers: createHeaders(authTokens),
    });
  },

  createTask: async (authTokens, task) => {
    return taskAPI.post("/", task, {
      headers: createHeaders(authTokens),
    });
  },

  deleteTask: async (authTokens, id) => {
    return taskAPI.delete(`/${id}/`, {
      headers: createHeaders(authTokens),
    });
  },

  updateTask: async (authTokens, id, task) => {
    return taskAPI.put(`/${id}/`, task, {
      headers: createHeaders(authTokens),
    });
  },

  checkTask: async (authTokens, id, status) => {
    return taskAPI.patch(
      `/${id}/`,
      { done: !status },
      {
        headers: createHeaders(authTokens),
      }
    );
  },
};

export default TaskService;
