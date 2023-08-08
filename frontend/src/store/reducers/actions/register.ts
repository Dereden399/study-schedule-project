import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthCred } from "../../../types";
import { AxiosError } from "axios";
import authService from "../../../services/authService";
import { login } from "./login";

export const register = createAsyncThunk(
  "users/register",
  async (registerCred: AuthCred, { rejectWithValue, dispatch }) => {
    try {
      await authService.register(registerCred);
      return await dispatch(login(registerCred));
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.error);
    }
  }
);
