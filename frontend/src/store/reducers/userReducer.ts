import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { login } from "./actions/login";
import { register } from "./actions/register";
import { toast } from "../../App";

interface UserState {
  user: User | null;
  loading: boolean;
  token: string;
}

const initialState: UserState = {
  user: null,
  loading: false,
  token: "",
};

const isRejectedAction = (action: AnyAction) => {
  return action.type.endsWith("rejected");
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    removeUser: (state) => {
      state.user = null;
      state.token = "";
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
        state.token = action.payload.token;
        state.user = {
          username: action.payload.username,
          id: action.payload.id,
        };
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addMatcher(isRejectedAction, (state, action: PayloadAction<string>) => {
        state.loading = false;
        console.log(action.payload);
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

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
