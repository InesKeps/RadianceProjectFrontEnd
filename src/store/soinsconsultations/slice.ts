import { createSlice } from "@reduxjs/toolkit";
import {
  getSoinsStats,
  getAllSoinsConsultation,
  createSoinConsultation,
  deleteSoinConsultation,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { ConsultationSoin } from "@/types/consultationdatas";

export interface SoinConsultationState {
  items: ConsultationSoin[];
  stats: { soin: string; codification: string; count: number }[];
  status: {
    getAll: statusType;
    create: statusType;
    delete: statusType;
    stats: statusType;
  };
  error: {
    getAll: ApiError;
    create: ApiError;
    delete: ApiError;
    stats: ApiError;
  };
}

const initialState: SoinConsultationState = {
  items: [],
  stats: [],
  status: {
    getAll: "idle",
    create: "idle",
    delete: "idle",
    stats: "idle",
  },
  error: {
    getAll: { message: null },
    create: { message: null },
    delete: { message: null },
    stats: { message: null },
  },
};

export const soinConsultationSlice = createSlice({
  name: "soinsconsultation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder 
      .addCase(getSoinsStats.pending, (state) => { 
        state.status.stats = "pending"; 
        state.error.stats = { message: null }; 
      }) 
      .addCase(getSoinsStats.fulfilled, (state, action) => { 
        state.status.stats = "succeeded"; 
        if (action.payload) { 
          state.stats = action.payload.data;
        } 
      }) 
      .addCase(getSoinsStats.rejected, (state, action) => {
        state.status.stats = "failed"; 
        if (action.payload) { 
          state.error.stats = { message: "Failed to fetch soins stats" }; 
        } 
      });
      
    builder
      .addCase(getAllSoinsConsultation.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
        state.items = []; // Reset items when loading new consultation soins
      })
      .addCase(getAllSoinsConsultation.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllSoinsConsultation.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch soins consultations" };
        }
      });

    builder
      .addCase(createSoinConsultation.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createSoinConsultation.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createSoinConsultation.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });
    
    builder
      .addCase(deleteSoinConsultation.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteSoinConsultation.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteSoinConsultation.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default soinConsultationSlice;
