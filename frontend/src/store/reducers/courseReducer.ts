import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../types";

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [
    {
      id: "1",
      title: "Happy Birthday",
      start: new Date("2023-07-18T00:00:00"),
      end: new Date("2023-07-19T00:00:00"),
      info: "Yay",
      allDay: true,
    },
    {
      id: "2",
      title: "Course 1",
      start: new Date("2023-09-03T10:15:00"),
      end: new Date("2023-09-03T12:00:00"),
      info: "Not Yay",
      allDay: false,
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
