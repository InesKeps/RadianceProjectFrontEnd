import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { Patient, PatientDetails, PatientDto, PatientDtoUpdate } from "../../types/patient";
import type { ApiResponse } from "../../types/base";
import type { PatientDetailsDto } from "@/types/historique";

export const getAllPatients = createAsyncThunk<ApiResponse<Patient[]>,void,{state: RootState}>(
  "user/getAllPatients",
  async (_,apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/patients`,
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
        console.log("Failed to get all patients: ", error);
        return apiThunk.rejectWithValue("Failed to get all patients.");
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

export const getPatientDetails = createAsyncThunk<ApiResponse<PatientDetails>,number,{ state: RootState }>(
  "patient/getPatientDetails",
  async (id, apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/patients/details/${id}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get patient details: ", error);
        return apiThunk.rejectWithValue("Failed to get patient details.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on get patient details."
      );
    }
  }
);

export const createPatient = createAsyncThunk<ApiResponse<Patient>, PatientDto,{state: RootState}>(
  "user/createPatient",
  async (data,apiThunk) => {

    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/patients/create`,
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
        console.log("Failed to create patient: ", error);
        return apiThunk.rejectWithValue("Failed to create patient.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create patient: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create patient."
      );
    }
  }
);

export const createPatientwithdetails = createAsyncThunk<ApiResponse<PatientDetails>, PatientDetailsDto, { state: RootState }>(
  "patient/createPatientwithdetails",
  async (data, apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      console.log(data);
      

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/patients/createdetails`,
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
        console.log("Failed to create patient with details: ", error);
        return apiThunk.rejectWithValue("Failed to create patient with details.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create patient with details: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on create patient with details."
      );
    }
  }
);


export const updatePatient = createAsyncThunk<ApiResponse<Patient>,PatientDtoUpdate,{state: RootState}>(
  "user/updatePatient", 
  async (data, apiThunk) => {
    
  try {
    const token = apiThunk.getState().auth.userInfo?.token;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/patients/update/${data.id}`,
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
      console.log("Failed to update patient: ", error);
      return apiThunk.rejectWithValue("Failed to update patient.");
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.log("Error on updating patient: ", error);
    return apiThunk.rejectWithValue(
      (error as { message: string }).message || "Error on updating patient."
    );
  }
});


export const deletePatient = createAsyncThunk<ApiResponse<Patient>, number,{state: RootState}>(
  "user/deletePatient",
  async (id, apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/patients/delete/${id}`,
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
        console.log("Failed to delete patient: ", error);
        return apiThunk.rejectWithValue("Failed to delete patient.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete patient: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete patient."
      );
    }
  }
);
