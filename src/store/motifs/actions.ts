import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Motif, MotifDto } from "@/types/data";

export const getAllMotifs = createAsyncThunk<ApiResponse<Motif[]>,void,{state: RootState}>(
  "motif/getAllMotifs",
  async (_,apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/motifs`,
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
        console.log("Failed to get all motifs: ", error);
        return apiThunk.rejectWithValue("Failed to get all motifs.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all motifs: ", error);
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
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/motifs/create`,
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
        console.log("Failed to create motif: ", error);
        return apiThunk.rejectWithValue("Failed to create motif.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create motif: ", error);
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
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/motifs/update/${data.id}`,
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
        console.log("Failed to update motif: ", error);
        return apiThunk.rejectWithValue("Failed to update motif.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update motif: ", error);
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
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/motifs/delete/${id}`,
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
        console.log("Failed to delete motif: ", error);
        return apiThunk.rejectWithValue("Failed to delete motif.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete motif: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete motif."
      );
    }
  }
);



