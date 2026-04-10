import { createSlice } from "@reduxjs/toolkit";
import type { AuthInfo } from "../../types/user";
import type { ApiError, statusType } from "../../types/base";
import { loginAction, refreshAction, logoutAction } from "./actions";
import Utils from "../../helpers/Utils";

export interface AuthState {
  userInfo: AuthInfo | null;
  status: {
    login: statusType;
    refresh: statusType;
    logout: statusType;
  };
  error: {
    login: ApiError;
    refresh: ApiError;
    logout: ApiError;
  };
}

const userInfo = Utils.getAuthInfo();

const initialState: AuthState = {
  userInfo: userInfo ? userInfo : null,
  status: {
    login: "idle",
    refresh: "idle",
    logout: "idle",
  },
  error: {
    login: { message: null },
    refresh: { message: null },
    logout: { message: null },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status.login = "pending";
        state.error.login = { message: null };
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status.login = "succeeded";
        if (action.payload) {
          const { userToLogin } = action.payload.data;
          state.userInfo = {
            userToLogin: userToLogin,
          };
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status.login = "failed";
        if (action.payload) {
          state.error.login = { message: "login failed!" };
        }
      })

      .addCase(refreshAction.pending, (state) => {
        state.status.refresh = "pending";
        state.error.refresh = { message: null };
      })
      .addCase(refreshAction.fulfilled, (state, action) => {
        state.status.refresh = "succeeded";
        if (action.payload) {
          const { userToLogin } = action.payload.data;
          state.userInfo = { userToLogin };
        }
      })
      .addCase(refreshAction.rejected, (state) => {
        state.status.refresh = "failed";
        state.error.refresh = { message: "refresh failed!" };
        state.userInfo = null;
      })

      .addCase(logoutAction.pending, (state) => {
        state.status.logout = "pending";
        state.error.logout = { message: null };
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status.logout = "succeeded";
        state.userInfo = null;
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.status.logout = "failed";
        if (action.payload) {
          state.error.logout = { message: "logout failed!" };
        }
        state.userInfo = null;
      });
  },
});

export default authSlice;
