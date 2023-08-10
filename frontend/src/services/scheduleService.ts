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

export default { getSchedulesForUser, addSchedule };
