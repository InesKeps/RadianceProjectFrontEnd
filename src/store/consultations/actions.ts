import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { ConsultationDto, ConsultationDtoUpdate} from "@/types/consultationdatas";
import type { Consultation } from "@/types/patient";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllConsultations = createAsyncThunk<ApiResponse<Consultation[]>,void,{state: RootState}>(
  "consultation/getAllConsultations",
  async (_,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/consultations`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all consultations: ", error);
        return apiThunk.rejectWithValue("Failed to get all consultations.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all consultations: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all consultations."
      );
    }
  }
);

export const getDetailsConsultation = createAsyncThunk<ApiResponse<Consultation>,number,{state: RootState}>(
  "consultation/getDetailsConsultation",
  async (id,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/consultations/details/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get details consultation: ", error);
        return apiThunk.rejectWithValue("Failed to get details consultation.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get details consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get details consultation."
      );
    }
  }
);

export const getPatientConsultations = createAsyncThunk<ApiResponse<Consultation[]>,number,{state: RootState}>(
  "consultation/getPatientConsultations",
  async (id,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/consultations/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get patient consultations: ", error);
        return apiThunk.rejectWithValue("Failed to get patient consultations.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get patient consultations: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get patient consultations."
      );
    }
  }
);

export const createConsultation = createAsyncThunk<ApiResponse<Consultation>, ConsultationDto,{state: RootState}>(
  "consultation/createConsultation",
  async (data,apiThunk) => {

    try {
      console.log(data);
      
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/consultations/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create consultation: ", error);
        return apiThunk.rejectWithValue("Failed to create consultation.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create consultation."
      );
    }
  }
);

export const updateConsultation = createAsyncThunk<ApiResponse<Consultation>, ConsultationDtoUpdate,{state: RootState}>(
  "consultation/updateConsultation",
  async (data,apiThunk) => {

    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/consultations/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update consultation: ", error);
        return apiThunk.rejectWithValue("Failed to update consultation.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update consultation."
      );
    }
  }
);

export const deleteConsultation = createAsyncThunk<ApiResponse<Consultation>, number,{state: RootState}>(
  "consultation/deleteConsultation",
  async (id, apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/consultations/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
          credentials: "include",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete consultation: ", error);
        return apiThunk.rejectWithValue("Failed to delete consultation.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete consultation."
      );
    }
  }
);


