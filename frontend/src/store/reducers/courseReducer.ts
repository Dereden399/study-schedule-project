import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../types";

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [
    {
      id: "1",
      name: "Happy Birthday",
      startDate: new Date("2023-07-18"),
      endDate: new Date("2023-07-19"),
      info: "Yay",
    },
    {
      id: "2",
      name: "Course 1",
      startDate: new Date("2023-09-03T10:15:00"),
      endDate: new Date("2023-09-03T12:00:00"),
      info: "Not Yay",
    },
  ],
};

export const courseReducer = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    clearCourses: (state) => {
      state.courses = [];
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.courses.filter((x) => x.id != action.payload);
    },
  },
});

export default courseReducer.reducer;
