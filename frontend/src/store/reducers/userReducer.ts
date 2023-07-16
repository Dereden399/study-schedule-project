import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default userReducer.reducer;
