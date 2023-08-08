import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCred } from "../../../types";
import loginService from "../../../services/authService";
import { AxiosError } from "axios";

export const login = createAsyncThunk(
  "users/login",
  async (loginCred: AuthCred, { rejectWithValue }) => {
    try {
      const data = await loginService.login(loginCred);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.error);
      }
    }
  }
);
