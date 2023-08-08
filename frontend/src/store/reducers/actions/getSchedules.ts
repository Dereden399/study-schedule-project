import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import scheduleService from "../../../services/scheduleService";

export const getSchedules = createAsyncThunk(
  "schedules",
  async (userId: string, { rejectWithValue }) => {
    try {
      const schedules = await scheduleService.getSchedulesForUser(userId);
      return schedules;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message);
    }
  }
);
