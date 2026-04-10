import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { User, UserDto, UserDtoUpdate } from "../../types/user";
import type { ApiResponse } from "../../types/base";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllUsers = createAsyncThunk<ApiResponse<User[]>,void,{state: RootState}>(
  "user/getAllUsers",
  async (_,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all users: ", error);
        return apiThunk.rejectWithValue("Failed to get all users.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all users: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all users."
      );
    }
  }
);

export const createUser = createAsyncThunk<ApiResponse<User>, UserDto,{state: RootState}>(
  "user/createUser",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/users`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create User: ", error);
        return apiThunk.rejectWithValue("Failed to create User.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create User: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create User."
      );
    }
  }
);

export const updateUser = createAsyncThunk<ApiResponse<User>,UserDtoUpdate,{state: RootState}>(
  "user/updateUser", 
  async (data, apiThunk) => {
    
  try {
    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/users/update/${data.id}`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("Failed to update user: ", error);
      return apiThunk.rejectWithValue("Failed to update user.");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error on updating user: ", error);
    return apiThunk.rejectWithValue(
      (error as { message: string }).message || "Error on updating user."
    );
  }
});


export const deleteUser = createAsyncThunk<ApiResponse<User>, number,{state: RootState}>(
  "user/deleteUser",
  async (id, apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete user: ", error);
        return apiThunk.rejectWithValue("Failed to delete user.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete user: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete user."
      );
    }
  }
);
