import { createAsyncThunk } from "@reduxjs/toolkit";
import { Course } from "../../../types";
import { RootState } from "../..";
import courseService from "../../../services/courseService";
import { AxiosError } from "axios";

const editCourse = createAsyncThunk(
  "courses/edit",
  async (course: Course, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const response = await courseService.editCourse(course, state.user.token);
      return response;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);

export default editCourse;
