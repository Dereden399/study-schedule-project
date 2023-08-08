import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import scheduleReducer from "./reducers/scheduleReducer";
import courseReducer from "./reducers/courseReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    schedule: scheduleReducer,
    course: courseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
