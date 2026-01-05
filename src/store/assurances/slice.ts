import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAssurances,
  createAssurance,
  updateAssurance,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Assurance, PatientDetails } from "../../types/historique";

export interface AssuranceState {
  items: Assurance[];
  status: {
    getAll: statusType;
    create: statusType;
    update: statusType;
  };
  error: {
    getAll: ApiError;
    create: ApiError;
    update: ApiError;
  };
}

const initialState: AssuranceState = {
  items: [],
  status: {
    getAll: "idle",
    create: "idle",
    update: "idle",
  },
  error: {
    getAll: { message: null },
    create: { message: null },
    update: { message: null },
  },
};

export const assuranceSlice = createSlice({
  name: "assurance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAssurances.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllAssurances.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllAssurances.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to getAll assurances" };
        }
      });

    builder
      .addCase(createAssurance.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createAssurance.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createAssurance.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create assurance" };
        }
      });

    builder
      .addCase(updateAssurance.pending, (state) => {
        state.status.update = "pending";
        state.error.update = { message: null };
      })
      .addCase(updateAssurance.fulfilled, (state, action) => {
        const id = action.payload?.data.id;
        state.status.update = "succeeded";
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload.data : item
          );
        }
      })
      .addCase(updateAssurance.rejected, (state, action) => {
        state.status.update = "failed";
        if (action.payload) {
          state.error.update = { message: "failed to update user" };
        }
      });
  },
});

export default assuranceSlice;
