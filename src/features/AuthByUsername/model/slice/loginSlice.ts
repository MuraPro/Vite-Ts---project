import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { LoginSchema } from "../types/loginSchema";

const initialState: LoginSchema = {
  isLoading: false,
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      if (action.payload === "") {
        state.error = undefined;
      }
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
      if (action.payload === "") {
        state.error = undefined;
      }
    },
    clearValue(state) {
      state.username = "";
      state.password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Unknown error";
      });
  },
});

export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
