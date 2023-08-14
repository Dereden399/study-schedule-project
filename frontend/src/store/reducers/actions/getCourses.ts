import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import courseService from "../../../services/courseService";

const getCourses = createAsyncThunk(
  "courses/get",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await courseService.getCoursesForSchedule(id);
      return response;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);

export default getCourses;
