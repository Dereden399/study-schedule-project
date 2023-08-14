import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course } from "../../types";
import getCourses from "./actions/getCourses";
import addCourse from "./actions/addCourse";
import editCourse from "./actions/editCourse";
import deleteCourse from "./actions/deleteCourse";
import { toast } from "../../App";

interface CourseState {
  courses: Course[];
}

const initialState: CourseState = {
  courses: [],
};

const isRejectedAction = (action: AnyAction) => {
  return action.type.endsWith("rejected") && action.type.includes("courses");
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
      state.courses = state.courses.filter((x) => x.id != action.payload);
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getCourses.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.courses = action.payload;
      })
      .addCase(addCourse.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.courses.push(action.payload);
        toast({
          title: "Success",
          description: "New course added",
          duration: 3000,
          isClosable: true,
          status: "success",
          position: "top",
        });
      })
      .addCase(editCourse.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.courses = state.courses.map((x) =>
          x.id === action.payload?.id ? action.payload : x
        );
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.courses = state.courses.filter((x) => x.id !== action.payload);
        toast({
          title: "Success",
          description: "Deleted course",
          duration: 3000,
          isClosable: true,
          status: "success",
          position: "top",
        });
      })
      .addMatcher(isRejectedAction, (_, action: PayloadAction<string>) => {
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

export default courseReducer.reducer;
