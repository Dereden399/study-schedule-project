import { AxiosRequestConfig } from "axios";
import { Schedule } from "../types";
import axios from "./apiClient";

const getSchedulesForUser = async (id: string) => {
  const response = await axios.get<Schedule[]>(`/users/${id}/schedules`);
  return response.data;
};

const addSchedule = async (schedule: Omit<Schedule, "id">, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  const response = await axios.post<Schedule>("/schedules", schedule, config);
  return response.data;
};

const deleteSchedule = async (id: string, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  await axios.delete(`/schedules/${id}`, config);
};

const editSchedule = async (editedSchedule: Schedule, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  const response = await axios.put<Schedule>(
    `/schedules/${editedSchedule.id}`,
    editedSchedule,
    config
  );
  return response.data;
};

export default {
  getSchedulesForUser,
  addSchedule,
  deleteSchedule,
  editSchedule,
};
