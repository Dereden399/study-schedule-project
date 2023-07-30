import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { login } from "./actions/login";

interface UserState {
  user: User | null;
  loading: boolean;
}

const initialState: UserState = {
  user: null,
  loading: false,
};

const isRejectedAction = (action: AnyAction) => {
  return action.type.endsWith("rejected");
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
  extraReducers: (builder) =>
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        console.log(action.payload.token);
        state.user = {
          username: action.payload.username,
          id: action.payload.id,
        };
      })
      .addMatcher(isRejectedAction, (state, action: PayloadAction<string>) => {
        state.loading = false;
        console.log(action.payload);
      }),
});

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
