import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { Antecedent, AntecedentDto, AntecedentDtoUpdate } from "../../types/patientdata";
import type { ApiResponse } from "../../types/base";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllAntecedents = createAsyncThunk<ApiResponse<Antecedent[]>,void,{state: RootState}>(
  "assurance/getAllAntecedents",
  async (_,apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/antecedents`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all antecedents: ", error);
        return apiThunk.rejectWithValue("Failed to get all antecedents.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all antecedents: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all antecedents."
      );
    }
  }
);

export const createAntecedent = createAsyncThunk<ApiResponse<Antecedent>, AntecedentDto,{state: RootState}>(
  "assurance/createAntecedent",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/antecedents/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create antecedent: ", error);
        return apiThunk.rejectWithValue("Failed to create antecedent.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create antecedent: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create antecedent."
      );
    }
  }
);

export const updateAntecedent = createAsyncThunk<ApiResponse<Antecedent>, AntecedentDtoUpdate,{state: RootState}>(
  "assurance/updateAntecedent",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/antecedents/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update antecedent: ", error);
        return apiThunk.rejectWithValue("Failed to update antecedent.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update antecedent: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update antecedent."
      );
    }
  }
);

export const deleteAntecedent = createAsyncThunk<ApiResponse<Antecedent>, number,{state: RootState}>(
  "user/deleteAntecedent",
  async (id, apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/antecedents/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete antecedent: ", error);
        return apiThunk.rejectWithValue("Failed to delete antecedent.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete antecedent: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete antecedent."
      );
    }
  }
);


