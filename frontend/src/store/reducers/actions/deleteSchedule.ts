import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { RootState } from "../..";
import scheduleService from "../../../services/scheduleService";

const deleteSchedule = createAsyncThunk(
  "schedules/delete",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const state = getState() as RootState;
      await scheduleService.deleteSchedule(id, state.user.token);
      return id;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);

export default deleteSchedule;
