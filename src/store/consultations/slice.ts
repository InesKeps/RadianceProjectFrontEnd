import { createSlice } from "@reduxjs/toolkit";
import {
  getAllConsultations,
  createConsultation,
  updateConsultation,
  deleteConsultation,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Consultation } from "@/types/patient";

export interface ConsultationState {
  items: Consultation[];
  status: {
    getAll: statusType;
    create: statusType;
    update: statusType;
    delete: statusType;
  };
  error: {
    getAll: ApiError;
    create: ApiError;
    update: ApiError;
    delete: ApiError;
  };
}

const initialState: ConsultationState = {
  items: [],
  status: {
    getAll: "idle",
    create: "idle",
    update: "idle",
    delete: "idle",
  },
  error: {
    getAll: { message: null },
    create: { message: null },
    update: { message: null },
    delete: { message: null },
  },
};

export const consultationSlice = createSlice({
  name: "consultation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllConsultations.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllConsultations.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllConsultations.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to getAll assurances" };
        }
      });

    builder
      .addCase(createConsultation.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createConsultation.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createConsultation.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create assurance" };
        }
      });

    builder
      .addCase(updateConsultation.pending, (state) => {
        state.status.update = "pending";
        state.error.update = { message: null };
      })
      .addCase(updateConsultation.fulfilled, (state, action) => {
        const id = action.payload?.data.id;
        state.status.update = "succeeded";
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload.data : item
          );
        }
      })
      .addCase(updateConsultation.rejected, (state, action) => {
        state.status.update = "failed";
        if (action.payload) {
          state.error.update = { message: "failed to update user" };
        }
      });

    builder
      .addCase(deleteConsultation.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteConsultation.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteConsultation.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default consultationSlice;
