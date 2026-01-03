import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPatients,
  getPatientDetails,
  createPatient,
  updatePatient,
  deletePatient,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Patient, PatientDetails } from "../../types/patient";

export interface PatientState {
  items: Patient[];
  selectedPatient: PatientDetails | null;
  status: {
    getAll: statusType;
    details: statusType;
    create: statusType;
    update: statusType;
    delete: statusType;
  };
  error: {
    getAll: ApiError;
    details: ApiError;
    create: ApiError;
    update: ApiError;
    delete: ApiError;
  };
}

const initialState: PatientState = {
  items: [],
  selectedPatient: null,
  status: {
    getAll: "idle",
    details: "idle",
    create: "idle",
    update: "idle",
    delete: "idle",
  },
  error: {
    getAll: { message: null },
    details: { message: null },
    create: { message: null },
    update: { message: null },
    delete: { message: null },
  },
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    clearSelectedPatient: (state) => {
      state.selectedPatient = null;
      state.status.details = "idle";
      state.error.details = { message: null };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPatients.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllPatients.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllPatients.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch patients" };
        }
      });

    builder
      .addCase(getPatientDetails.pending, (state) => {
        state.status.details = "pending";
        state.error.details = { message: null };
      })
      .addCase(getPatientDetails.fulfilled, (state, action) => {
        state.status.details = "succeeded";
        if (action.payload) {
          state.selectedPatient = action.payload.data;
        }
      })
      .addCase(getPatientDetails.rejected, (state, action) => {
        state.status.details = "failed";
        if (action.payload) {
          state.error.details = { message: "Failed to fetch patient details" };
        }
      });

    builder
      .addCase(createPatient.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });

    builder
      .addCase(updatePatient.pending, (state) => {
        state.status.update = "pending";
        state.error.update = { message: null };
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const id = action.payload?.data.id;
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload.data : item
          );
          if (state.selectedPatient?.id === id) {
            state.selectedPatient = action.payload.data as PatientDetails;
          }
        }
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.status.update = "failed";
        if (action.payload) {
          state.error.update = { message: "Failed to update patient" };
        }
      });

    builder
      .addCase(deletePatient.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
          if (state.selectedPatient?.id === action.payload.data.id) {
            state.selectedPatient = null;
          }
        }
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export const { clearSelectedPatient } = patientSlice.actions;

export default patientSlice;
