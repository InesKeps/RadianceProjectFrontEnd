import { createSlice } from "@reduxjs/toolkit";
import {
  getAllAntecedents,
  createAntecedent,
  updateAntecedent,
  deleteAntecedent,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Antecedent } from "../../types/patientdata";

export interface AntecedentState {
  items: Antecedent[];
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

const initialState: AntecedentState = {
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

export const antecedentSlice = createSlice({
  name: "antecedent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllAntecedents.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllAntecedents.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllAntecedents.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch patients" };
        }
      });

    builder
      .addCase(createAntecedent.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createAntecedent.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createAntecedent.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });

    builder
      .addCase(updateAntecedent.pending, (state) => {
        state.status.update = "pending";
        state.error.update = { message: null };
      })
      .addCase(updateAntecedent.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const id = action.payload?.data.id;
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload.data : item
          );
        }
      })
      .addCase(updateAntecedent.rejected, (state, action) => {
        state.status.update = "failed";
        if (action.payload) {
          state.error.update = { message: "Failed to update patient" };
        }
      });

    builder
      .addCase(deleteAntecedent.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteAntecedent.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteAntecedent.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default antecedentSlice;
