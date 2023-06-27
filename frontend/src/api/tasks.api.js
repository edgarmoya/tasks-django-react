import axios from "axios";

const taskAPI = axios.create({
  baseURL: "http://localhost:8000/tasks/api/v1/tasks/",
});

export const getAllTasks = () => taskAPI.get("/");

export const getTask = (id) => taskAPI.get(`/${id}/`);

export const createTask = (task) => taskAPI.post("/", task);

export const deleteTask = (id) => taskAPI.delete(`/${id}/`);

export const updateTask = (id, task) => taskAPI.put(`/${id}/`, task);

export const checkTask = (id, status) =>
  taskAPI.patch(`/${id}/`, { done: !status });
