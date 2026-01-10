import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Allergie, AllergieDto, AllergieDtoUpdate } from "@/types/historique";


export const getAllAllergies = createAsyncThunk<ApiResponse<Allergie[]>,void,{state: RootState}>(
  "allergie/getAllAllergies",
  async (_,apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allergies`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all allergies: ", error);
        return apiThunk.rejectWithValue("Failed to get all allergies.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all allergies: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all allergies."
      );
    }
  }
);

export const createAllergie = createAsyncThunk<ApiResponse<Allergie>, AllergieDto,{state: RootState}>(
  "allergie/createAllergie",
  async (data,apiThunk) => {

    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allergies/create`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create allergie: ", error);
        return apiThunk.rejectWithValue("Failed to create allergie.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create allergie: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create allergie."
      );
    }
  }
);

export const updateAllergie = createAsyncThunk<ApiResponse<Allergie>, AllergieDtoUpdate,{state: RootState}>(
  "allergie/updateAllergie",
  async (data,apiThunk) => {

    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allergies/update/${data.id}`,
        {
          method: "PUT",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update allergie: ", error);
        return apiThunk.rejectWithValue("Failed to update allergie.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update allergie: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update allergie."
      );
    }
  }
);

export const deleteAllergie = createAsyncThunk<ApiResponse<Allergie>, number,{state: RootState}>(
  "allergie/deleteAllergie",
  async (id, apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allergies/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
        },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete allergie: ", error);
        return apiThunk.rejectWithValue("Failed to delete allergie.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete allergie: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete allergie."
      );
    }
  }
);



