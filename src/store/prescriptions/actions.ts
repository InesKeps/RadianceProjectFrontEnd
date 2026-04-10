import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse } from "../../types/base";
import type { Prescription, PrescriptionDto, PrescriptionDtoUpdate } from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getConsultationPrescriptions = createAsyncThunk<ApiResponse<Prescription[]>,number,{state: RootState}>(
  "prescription/getConsultationPrescriptions",
  async (id,apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/prescriptions/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get consultation prescriptions: ", error);
        return apiThunk.rejectWithValue("Failed to get consultation prescriptions.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get consultation prescriptions: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get consultation prescriptions."
      );
    }
  }
);

export const createPrescription = createAsyncThunk<ApiResponse<Prescription>, PrescriptionDto,{state: RootState}>(
  "prescription/createPrescription",
  async (data,apiThunk) => {

    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/prescriptions/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create prescription: ", error);
        return apiThunk.rejectWithValue("Failed to create prescription.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create prescription: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create prescription."
      );
    }
  }
);

export const updatePrescription = createAsyncThunk<ApiResponse<Prescription>,PrescriptionDtoUpdate,{state: RootState}>(
  "prescription/updatePrescription", 
  async (data, apiThunk) => {
    
  try {

    const response = await fetchWithAuth(
      `${import.meta.env.VITE_API_URL}/prescriptions/update/${data.id}`,
      {
        method: "PUT",
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.log("Failed to update prescription: ", error);
      return apiThunk.rejectWithValue("Failed to update prescription.");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error on updating prescription: ", error);
    return apiThunk.rejectWithValue(
      (error as { message: string }).message || "Error on updating prescription."
    );
  }
});


export const deletePrescription = createAsyncThunk<ApiResponse<Prescription>, number,{state: RootState}>(
  "prescription/deletePrescription",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/prescriptions/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete prescription: ", error);
        return apiThunk.rejectWithValue("Failed to delete prescription.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete prescription: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete prescription."
      );
    }
  }
);
