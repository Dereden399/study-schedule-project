import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import { login } from "./actions/login";
import { toast } from "../../App";
import checkToken from "./actions/checkToken";

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
  return (
    action.type.endsWith("rejected") &&
    action.type.includes("users") &&
    !action.type.includes("checkToken")
  );
};

const isPendingAction = (action: AnyAction) => {
  return action.type.endsWith("pending");
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
      .addCase(login.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        console.log(action.payload.token);
        state.token = action.payload.token;
        state.user = {
          username: action.payload.username,
          id: action.payload.id,
        };
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(checkToken.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.loading = false;
        state.token = action.payload.token;
        state.user = {
          username: action.payload.username,
          id: action.payload.id,
        };
      })
      .addCase(checkToken.rejected, (state) => {
        state.loading = false;
        state.token = "";
        state.user = null;
        localStorage.removeItem("token");
      })
      .addMatcher(isRejectedAction, (state, action: PayloadAction<string>) => {
        state.loading = false;
        toast({
          title: "Error",
          description: action.payload,
          duration: 3000,
          isClosable: true,
          status: "error",
          position: "top",
        });
      })
      .addMatcher(isPendingAction, (state) => {
        state.loading = true;
      }),
});

export const { setUser, removeUser } = userReducer.actions;

export default userReducer.reducer;
