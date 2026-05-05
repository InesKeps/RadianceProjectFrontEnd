import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Motif, MotifDto } from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllMotifs = createAsyncThunk<ApiResponse<Motif[]>,void,{state: RootState}>(
  "motif/getAllMotifs",
  async (_,apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/motifs`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to get all motifs.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all motifs."
      );
    }
  }
);

export const createMotif = createAsyncThunk<ApiResponse<Motif>, MotifDto,{state: RootState}>(
  "motif/createMotif",
  async (data,apiThunk) => {

    try {
      
      const response = await fetchWithAuth( `${import.meta.env.VITE_API_URL}/motifs/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to create motif.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create motif."
      );
    }
  }
);

export const updateMotif = createAsyncThunk<ApiResponse<Motif>, Motif,{state: RootState}>(
  "motif/updateMotif",
  async (data,apiThunk) => {

    try {

      const response = await fetchWithAuth( `${import.meta.env.VITE_API_URL}/motifs/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to update motif.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update motif."
      );
    }
  }
);

export const deleteMotif = createAsyncThunk<ApiResponse<Motif>, number,{state: RootState}>(
  "motif/deleteMotif",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/motifs/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to delete motif.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete motif."
      );
    }
  }
);



