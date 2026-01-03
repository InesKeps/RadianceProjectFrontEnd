import { createSlice } from "@reduxjs/toolkit";
import type { AuthInfo } from "../../types/user";
import type { ApiError, statusType } from "../../types/base";
import { loginAction, refreshAction } from "./actions";
import Utils from "../../helpers/Utils";

export interface AuthState {
  userInfo: AuthInfo | null;
  status: {
    login: statusType;
    refresh: statusType;
  };
  error: {
    login: ApiError;
    refresh: ApiError;
  };
}

const userInfo = Utils.getAuthInfo();

const initialState: AuthState = {
  userInfo: userInfo ? userInfo : null,
  status: {
    login: "idle",
    refresh: "idle",
  },
  error: {
    login: { message: null },
    refresh: { message: null },
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Utils.clearAuthInfo();
      state.userInfo = null;
      state.status.login = "idle";
      state.error.login = { message: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.status.login = "pending";
        state.error.login = { message: null };
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status.login = "succeeded";
        if (action.payload) {
          const { userToLogin, token, refreshToken } = action.payload.data;
          state.userInfo = {
            userToLogin: userToLogin,
            token: token,
            refreshToken: refreshToken,
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
          const { userToLogin, token, refreshToken } = action.payload.data;
          state.userInfo = { userToLogin, token, refreshToken };
          Utils.setAuthInfo(state.userInfo);
        }
      })
      .addCase(refreshAction.rejected, (state) => {
        state.status.refresh = "failed";
        state.error.refresh = { message: "refresh failed!" };
        state.userInfo = null;
      });
  },
});

export default authSlice;
