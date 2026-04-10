import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse } from "../../types/base";
import type { DevisSoins, DevisSoinsDto} from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllSoinsDevis = createAsyncThunk<ApiResponse<DevisSoins[]>,number,{state: RootState}>(
  "devis/getAllSoinsDevis",
  async (id,apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/devis/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all soins devis: ", error);
        return apiThunk.rejectWithValue("Failed to get all soins devis.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all soins devis: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all soins devis."
      );
    }
  }
);

export const createSoinDevis = createAsyncThunk<ApiResponse<DevisSoins>,DevisSoinsDto, { state: RootState }>(
  "devis/createSoinDevis",
  async (data, apiThunk) => {
    try {
      
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/devis/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to add soin to devis: ", error);
        return apiThunk.rejectWithValue("Failed to add soin to devis.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on add soin to devis: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on add soin to devis."
      );
    }
  }
);

export const deleteSoinDevis = createAsyncThunk<ApiResponse<DevisSoins>, number, { state: RootState }>(
  "devis/deleteSoinDevis",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/devis/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete soin on devis: ", error);
        return apiThunk.rejectWithValue("Failed to delete soin on devis.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Failed to delete soin on devis: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Failed to delete soin on devis."
      );
    }
  }
);




