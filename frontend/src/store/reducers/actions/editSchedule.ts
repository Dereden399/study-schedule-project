import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import scheduleService from "../../../services/scheduleService";
import { RootState } from "../..";
import { Schedule } from "../../../types";

const editSchedule = createAsyncThunk(
  "schedules/edit",
  async (editedSchedule: Schedule, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      const result = await scheduleService.editSchedule(
        editedSchedule,
        state.user.token
      );
      return result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);

export default editSchedule;
