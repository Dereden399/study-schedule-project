import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import authService from "../../../services/authService";

const checkToken = createAsyncThunk(
  "users/checkToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const user = await authService.check(token);
      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message);
      }
    }
  }
);

export default checkToken;
