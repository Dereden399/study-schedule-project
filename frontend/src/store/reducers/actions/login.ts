import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCred } from "../../../types";
import loginService from "../../../services/authService";

export const login = createAsyncThunk(
  "users/login",
  async (loginCred: AuthCred, { rejectWithValue }) => {
    try {
      const data = await loginService.login(loginCred);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  }
);
