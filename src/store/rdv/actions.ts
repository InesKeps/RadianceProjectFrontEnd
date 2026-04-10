import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { RDV, RDVDto, RDVUpdateDto } from "@/types/rdv";
import fetchWithAuth from "@/services/fetchwithauth.service";

// Lister tous les RDV
export const getAllRDV = createAsyncThunk<ApiResponse<RDV[]>, void, { state: RootState }>(
  "rdv/getAllRDV",
  async (_, apiThunk) => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/rdv`, {
        method: "GET",
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all RDV: ", error);
        return apiThunk.rejectWithValue("Failed to get all RDV.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on get all RDV: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on get all RDV."
      );
    }
  }
);

// Créer un RDV
export const createRDV = createAsyncThunk<ApiResponse<RDV>, RDVDto, { state: RootState }>(
  "rdv/createRDV",
  async (data, apiThunk) => {
    try {

      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/rdv/create`, {
        method: "POST",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create RDV: ", error);
        return apiThunk.rejectWithValue("Failed to create RDV.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create RDV: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on create RDV."
      );
    }
  }
);

// Mettre à jour un RDV
export const updateRDV = createAsyncThunk<ApiResponse<RDV>, RDVUpdateDto, { state: RootState }>(
  "rdv/updateRDV",
  async (data, apiThunk) => {
    try {

      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/rdv/update/${data.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update RDV: ", error);
        return apiThunk.rejectWithValue("Failed to update RDV.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update RDV: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on update RDV."
      );
    }
  }
);

// Supprimer un RDV
export const deleteRDV = createAsyncThunk<ApiResponse<RDV>, number, { state: RootState }>(
  "rdv/deleteRDV",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/rdv/delete/${id}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json",},
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete RDV: ", error);
        return apiThunk.rejectWithValue("Failed to delete RDV.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on delete RDV: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete RDV."
      );
    }
  }
);
