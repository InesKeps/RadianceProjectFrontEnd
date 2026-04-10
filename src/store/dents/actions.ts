import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Dent, DentDto } from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllDents = createAsyncThunk<ApiResponse<Dent[]>,void,{state: RootState}>(
  "dent/getAllDents",
  async (_,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/dents`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all dents: ", error);
        return apiThunk.rejectWithValue("Failed to get all dents.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all dents: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all dents."
      );
    }
  }
);

export const createDent = createAsyncThunk<ApiResponse<Dent>, DentDto,{state: RootState}>(
  "dent/createDent",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/dents/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create dent: ", error);
        return apiThunk.rejectWithValue("Failed to create dent.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create dent: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create dent."
      );
    }
  }
);

export const updateDent = createAsyncThunk<ApiResponse<Dent>, Dent,{state: RootState}>(
  "dent/updateDent",
  async (data,apiThunk) => {

    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/dents/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update dent: ", error);
        return apiThunk.rejectWithValue("Failed to update dent.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update dent: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update dent."
      );
    }
  }
);

export const deleteDent = createAsyncThunk<ApiResponse<Dent>, number,{state: RootState}>(
  "dent/deleteDent",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/dents/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete dent: ", error);
        return apiThunk.rejectWithValue("Failed to delete dent.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete dent: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete dent."
      );
    }
  }
);



