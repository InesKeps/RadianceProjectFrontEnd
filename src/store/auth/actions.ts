import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../types/base";
import type { AuthInfo, LoginDto } from "../../types/user";
import Utils from "../../helpers/Utils";


// LOGIN
export const loginAction = createAsyncThunk<ApiResponse<AuthInfo>, LoginDto>(
  "auth/loginAction",
  async (data, apiThunk) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to login user: ", error);
        return apiThunk.rejectWithValue("Failed to login user.");
      }

      const result = await response.json();
      if (result.data) {
        Utils.setAuthInfo(result.data);
      }
      return result;
    } catch (error) {
      console.log("Error on login request: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Failed to login user due to network error."
      );
    }
  }
);

// REFRESH
export const refreshAction = createAsyncThunk<ApiResponse<AuthInfo>>(
  "auth/refreshAction",
  async (_, apiThunk) => {
    try {
      const authInfo = Utils.getAuthInfo();
      if (!authInfo?.refreshToken) {
        return apiThunk.rejectWithValue("No refresh token");
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken: authInfo.refreshToken }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to refresh token: ", error);
        return apiThunk.rejectWithValue("Failed to refresh token.");
      }

      const result = await response.json();
      if (result.data) {
        Utils.setAuthInfo(result.data);
      }
      return result;
    } catch (error) {
      console.log("Error on refresh request: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Failed to refresh token due to network error."
      );
    }
  }
);

// LOGOUT
export const logoutAction = createAction("auth/logoutAction", () => {
  Utils.clearAuthInfo();
  return { payload: null };
});