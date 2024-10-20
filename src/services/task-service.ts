import axios from "axios";
import { TaskDetail } from "../interfaces/DetailTask";

export const getTaskDetail = (taskId: number) => {
  return axios.get(`/Project/getTaskDetail/${taskId}`);
};

export const updateTaskStatus = (task: TaskDetail) => {
  return axios.put(`/Project/updateTask/${task.taskId}/status`, task);
};
