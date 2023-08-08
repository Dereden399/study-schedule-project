import { Schedule } from "../types";
import axios from "./apiClient";

const getSchedulesForUser = async (id: string) => {
  const response = await axios.get<Schedule[]>(`/users/${id}/schedules`);
  return response.data;
};

export default { getSchedulesForUser };
