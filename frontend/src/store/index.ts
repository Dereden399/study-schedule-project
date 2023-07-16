import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import scheduleReducer from "./reducers/scheduleReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
  },
});
