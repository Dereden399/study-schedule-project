import { createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../../../types";
import { AxiosError } from "axios";
import { RootState } from "../..";
import courseService from "../../../services/courseService";

const addCourse = createAsyncThunk(
  "courses/add",
  async (
    { course, scheduleId }: { course: Omit<Course, "id">; scheduleId: string },
    { rejectWithValue, getState }
  ) => {
    try {
      const state = getState() as RootState;
      const response = await courseService.addCourseTo(
        scheduleId,
        course,
        state.user.token
      );
      console.log(response);
      return response;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);

export default addCourse;
