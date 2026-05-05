import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Allergie, AllergieDto, AllergieDtoUpdate } from "@/types/patientdata";
import fetchWithAuth from "@/services/fetchwithauth.service";


export const getAllAllergies = createAsyncThunk<ApiResponse<Allergie[]>,void,{state: RootState}>(
  "allergie/getAllAllergies",
  async (_,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/allergies`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to get all allergies.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
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
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/allergies/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to create allergie.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
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
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/allergies/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to update allergie.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
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
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/allergies/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",}
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to delete allergie.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete allergie."
      );
    }
  }
);



