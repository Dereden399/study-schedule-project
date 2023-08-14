import { AxiosRequestConfig } from "axios";
import { Course } from "../types";
import axios from "./apiClient";

const getCoursesForSchedule = async (id: string) => {
  const response = await axios.get(`/schedules/${id}/courses`);
  return response.data as Course[];
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
  const response = await axios.post<Course>(
    `/schedules/${id}/addCourse`,
    courseToAdd,
    config
  );
  return response.data;
};

const deleteCourse = async (id: string, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  await axios.delete(`/courses/${id}`, config);
};

const editCourse = async (editedCourse: Course, token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: "bearer " + token,
    },
  };
  const response = await axios.put<Course>(
    `/courses/${editedCourse.id}`,
    editedCourse,
    config
  );
  return response.data;
};

export default { getCoursesForSchedule, addCourseTo, deleteCourse, editCourse };
