import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { ApiResponse } from "../../types/base";
import type { ConsultationMotif, ConsultationMotifDto} from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getMotifsStats = createAsyncThunk<ApiResponse<{ motif: string; count: number }[]>,void,{ state: RootState }>(
  "consultation/getMotifsStats",
  async (_, apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/motifsconsultations/stats`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        return apiThunk.rejectWithValue("Failed to get motifs stats.");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return apiThunk.rejectWithValue("Error on get motifs stats.");
    }
  }
);

export const getAllMotifsConsultation = createAsyncThunk<ApiResponse<ConsultationMotif[]>,number,{state: RootState}>(
  "motifsconsultations/getAllMotifsConsultation",
  async (id,apiThunk) => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/motifsconsultations/${id}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all motifs consultation: ", error);
        return apiThunk.rejectWithValue("Failed to get all motifs consultation.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all motifs consultation: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all motifs consultation."
      );
    }
  }
);

export const createMotifConsultation = createAsyncThunk<ApiResponse<ConsultationMotif>, ConsultationMotifDto, { state: RootState } >( 
  "motifsconsultations/createMotifConsultation", 
  async (data, apiThunk) => { 
    
    try {
      const response = await fetchWithAuth(
         `${import.meta.env.VITE_API_URL}/motifsconsultations/create`, 
        { 
          method: "POST", 
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data), 
        } ); 
        
        if (!response.ok) { 
          const error = await response.json(); 
          console.log("Failed to add motif to consultation: ", error); 
          return apiThunk.rejectWithValue("Failed to add motif to consultation."); 
        } const result = await response.json(); return result; 
      } catch (error) { 
        console.log("Error on create motif consultation: ", error); 
        return apiThunk.rejectWithValue( 
          (error as { message: string }).message || 
          "Error on create motif consultation." 
        ); 
      } 
    } 
);

export const deleteMotifConsultation = createAsyncThunk<ApiResponse<ConsultationMotif>, ConsultationMotifDto, { state: RootState } >( 
  "motifsconsultations/deleteMotifConsultation", 
  async (data, apiThunk) => { 
    
    try {
      const response = await fetchWithAuth( `${import.meta.env.VITE_API_URL}/motifsconsultations/delete`, 
        { 
          method: "DELETE", 
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data), 
        } ); 
        
        if (!response.ok) { 
          const error = await response.json(); 
          console.log("Failed to delete motif from consultation: ", error); 
          return apiThunk.rejectWithValue("Failed to delete motif from consultation."); 
        } const result = await response.json(); return result; 
      } catch (error) { 
        console.log("Error on delete motif from consultation: ", error); 
        return apiThunk.rejectWithValue( 
          (error as { message: string }).message || 
          "Error delete motif from consultation." 
        ); 
      } 
    } 
);





