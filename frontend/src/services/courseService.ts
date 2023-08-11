import { AxiosRequestConfig } from "axios";
import { Course } from "../types";
import axios from "./apiClient";

const getCoursesForSchedule = async (id: string) => {
  const response = await axios.get<Course[]>(`/schedules/${id}/courses`);
  return response.data;
};

const addCourseTo = async (
  id: string,
  courseToAdd: Omit<Course, "id">,
  token: string
) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  return null;
};

export default { getCoursesForSchedule, addCourseTo };
