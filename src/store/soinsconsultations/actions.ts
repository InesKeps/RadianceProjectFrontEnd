import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse } from "../../types/base";
import type { ConsultationSoin, ConsultationSoinDto} from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getSoinsStats = createAsyncThunk<ApiResponse<{ soin: string; codification: string; count: number }[]>,void,{ state: RootState }>(
  "consultation/getSoinsStats",
  async (_, apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soinsconsultations/stats`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to get soins stats.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return apiThunk.rejectWithValue("Error on get soins stats.");
    }
  }
);

export const getAllSoinsConsultation = createAsyncThunk<ApiResponse<ConsultationSoin[]>,number,{state: RootState}>(
  "consultation/getAllConsultations",
  async (id,apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soinsconsultations/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all soins consultation: ", error);
        return apiThunk.rejectWithValue("Failed to get all soins consultation.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all soins consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all soins consultation."
      );
    }
  }
);

export const createSoinConsultation = createAsyncThunk<ApiResponse<ConsultationSoin>,ConsultationSoinDto, { state: RootState }>(
  "consultation/createSoinConsultation",
  async (data, apiThunk) => {
    try {
      console.log(data);
      
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soinsconsultations/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to add soin to consultation: ", error);
        return apiThunk.rejectWithValue("Failed to add soin to consultation.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create soin consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create soin consultation."
      );
    }
  }
);

export const deleteSoinConsultation = createAsyncThunk<ApiResponse<ConsultationSoin>, number, { state: RootState }>(
  "consultation/deleteSoinConsultation",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soinsconsultations/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to add soin to consultation: ", error);
        return apiThunk.rejectWithValue("Failed to add soin to consultation.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create soin consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create soin consultation."
      );
    }
  }
);




