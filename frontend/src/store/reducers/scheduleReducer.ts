import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Schedule } from "../../types";

interface ScheduleState {
  schedules: Array<Schedule>;
}

const initialState: ScheduleState = {
  schedules: [
    { name: "Schedule 1", id: "1" },
    {
      name: "Wow so intersting",
      id: "2",
      description: "description here...",
    },
  ],
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
      state.schedules.filter((x) => x.id != action.payload.id);
    },
  },
});

export default scheduleReducer.reducer;
