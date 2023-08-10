import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "../../types";
import { getSchedules } from "./actions/getSchedules";
import { toast } from "../../App";
import addSchedule from "./actions/addSchedule";
import deleteSchedule from "./actions/deleteSchedule";
import editSchedule from "./actions/editSchedule";

interface ScheduleState {
  schedules: Array<Schedule>;
  loading: boolean;
}

const initialState: ScheduleState = {
  schedules: [],
  loading: false,
};

const isRejectedAction = (action: AnyAction) => {
  return action.type.endsWith("rejected") && action.type.includes("schedules");
};

export const scheduleReducer = createSlice({
  name: "schedule",
  initialState,
  reducers: {
    setSchedules: (state, action: PayloadAction<Array<Schedule>>) => {
      state.schedules = action.payload;
    },
    clearSchedules: (state) => {
      state.schedules = [];
    },
    addSchedule: (state, action: PayloadAction<Schedule>) => {
      state.schedules.push(action.payload);
    },
    removeSchedule: (state, action: PayloadAction<{ id: string }>) => {
      state.schedules = state.schedules.filter(
        (x) => x.id != action.payload.id
      );
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getSchedules.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSchedules.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload) return;
        state.schedules = action.payload;
      })
      .addCase(addSchedule.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.schedules.push(action.payload);
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.schedules = state.schedules.filter((x) => x.id != action.payload);
      })
      .addCase(editSchedule.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.schedules = state.schedules.map((x) =>
          x.id === action.payload?.id ? action.payload : x
        );
      })
      .addMatcher(isRejectedAction, (state, action: PayloadAction<string>) => {
        state.loading = false;
        toast({
          title: "Error",
          description: action.payload,
          duration: 3000,
          isClosable: true,
          status: "error",
          position: "top",
        });
      }),
});

export default scheduleReducer.reducer;
