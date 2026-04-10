import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ApiResponse } from "../../types/base";
import type { AuthInfo, LoginDto } from "../../types/user";
import Utils from "../../helpers/Utils";
import fetchWithAuth from "@/services/fetchwithauth.service";


// LOGIN
export const loginAction = createAsyncThunk<ApiResponse<AuthInfo>, LoginDto>(
  "auth/loginAction",
  async (data, apiThunk) => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to login user: ", error);
        return apiThunk.rejectWithValue("Failed to login user.");
      }

      const result = await response.json();
      if (result.data) {
        Utils.setAuthInfo(result.data); // Only user info, no token
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
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/users/refresh`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to refresh token: ", error);
        return apiThunk.rejectWithValue("Failed to refresh token.");
      }

      const result = await response.json();
      if (result.data) {
        // Only user info, tokens are in httpOnly cookies
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
export const logoutAction = createAsyncThunk<ApiResponse<null>>(
  "auth/logoutAction",
  async (_, apiThunk) => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/users/logout`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to logout: ", error);
        // Even if fails, proceed to clear local
      }

      Utils.clearAuthInfo();
      return {
        meta: { status: 200, message: "Logged out" },
        data: null,
        error: null,
      };
    } catch (error) {
      console.log("Error on logout request: ", error);
      Utils.clearAuthInfo();
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Failed to logout due to network error."
      );
    }
  }
);