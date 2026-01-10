import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Consultation, ConsultationDto, ConsultationDtoUpdate } from "@/types/patient";

export const getAllConsultations = createAsyncThunk<ApiResponse<Consultation[]>,void,{state: RootState}>(
  "consultation/getAllConsultations",
  async (_,apiThunk) => {
    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/consultations`,
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

export const createConsultation = createAsyncThunk<ApiResponse<Consultation>, ConsultationDto,{state: RootState}>(
  "consultation/createConsultation",
  async (data,apiThunk) => {

    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/consultations/create`,
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
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/consultations/update/${data.id}`,
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
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/consultations/delete/${id}`,
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


