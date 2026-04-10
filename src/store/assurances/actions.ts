import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { Assurance, AssuranceDto, AssuranceDtoUpdate } from "../../types/patientdata";
import type { ApiResponse } from "../../types/base";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllAssurances = createAsyncThunk<ApiResponse<Assurance[]>,void,{state: RootState}>(
  "assurance/getAllAssurances",
  async (_,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/assurances`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all assurances: ", error);
        return apiThunk.rejectWithValue("Failed to get all assurances.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all patients: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all patients."
      );
    }
  }
);

export const createAssurance = createAsyncThunk<ApiResponse<Assurance>, AssuranceDto,{state: RootState}>(
  "assurance/createAssurance",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/assurances/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create assurance: ", error);
        return apiThunk.rejectWithValue("Failed to create assurance.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create assurance: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create assurance."
      );
    }
  }
);

export const updateAssurance = createAsyncThunk<ApiResponse<Assurance>, AssuranceDtoUpdate,{state: RootState}>(
  "assurance/updateAssurance",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/assurances/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update assurance: ", error);
        return apiThunk.rejectWithValue("Failed to update assurance.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update assurance: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update assurance."
      );
    }
  }
);

export const deleteAssurance = createAsyncThunk<ApiResponse<Assurance>, number,{state: RootState}>(
  "user/deleteAssurance",
  async (id, apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/assurances/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete assurance: ", error);
        return apiThunk.rejectWithValue("Failed to delete assurance.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete assurance: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete assurance."
      );
    }
  }
);


