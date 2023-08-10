import { createAsyncThunk } from "@reduxjs/toolkit";
import { Schedule } from "../../../types";
import { AxiosError } from "axios";
import scheduleService from "../../../services/scheduleService";
import { RootState } from "../..";

const addSchedule = createAsyncThunk(
  "schedules/add",
  async (schedule: Omit<Schedule, "id">, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const data = await scheduleService.addSchedule(
        schedule,
        state.user.token
      );
      return data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message);
    }
  }
);

export default addSchedule;
