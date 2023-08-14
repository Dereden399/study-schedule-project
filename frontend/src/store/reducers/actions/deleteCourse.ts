import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "../..";
import courseService from "../../../services/courseService";

const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (courseId: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      await courseService.deleteCourse(courseId, state.user.token);
      return courseId;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);

export default deleteCourse;
