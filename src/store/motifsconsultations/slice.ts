import { createSlice } from "@reduxjs/toolkit";
import {
  getMotifsStats,
  getAllMotifsConsultation,
  createMotifConsultation,
  deleteMotifConsultation,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { ConsultationMotif } from "@/types/consultationdatas";

export interface MotifConsultationState {
  items: ConsultationMotif[];
  stats: { motif: string; count: number }[];
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

const initialState: MotifConsultationState = {
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

export const motifConsultationSlice = createSlice({
  name: "motifconsultation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMotifsStats.pending, (state) => {
        state.status.stats = "pending";
        state.error.stats = { message: null };
      })
      .addCase(getMotifsStats.fulfilled, (state, action) => {
        state.status.stats = "succeeded";
        if (action.payload) {
          state.stats = action.payload.data;
        }
      })
      .addCase(getMotifsStats.rejected, (state, action) => {
        state.status.stats = "failed";
        if (action.payload) {
          state.error.stats = { message: "Failed to fetch motifs stats" };
        }
      });

    builder
      .addCase(getAllMotifsConsultation.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllMotifsConsultation.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllMotifsConsultation.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch motifs consultations" };
        }
      });

    builder
      .addCase(createMotifConsultation.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createMotifConsultation.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createMotifConsultation.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });
    
    builder
      .addCase(deleteMotifConsultation.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteMotifConsultation.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteMotifConsultation.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default motifConsultationSlice;
