import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSoinsDevis,
  createSoinDevis,
  deleteSoinDevis,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { DevisSoins } from "@/types/consultationdatas";

export interface DevisState {
  items: DevisSoins[];
  status: {
    getAll: statusType;
    create: statusType;
    delete: statusType;
  };
  error: {
    getAll: ApiError;
    create: ApiError;
    delete: ApiError;
  };
}

const initialState: DevisState = {
  items: [],
  status: {
    getAll: "idle",
    create: "idle",
    delete: "idle",
  },
  error: {
    getAll: { message: null },
    create: { message: null },
    delete: { message: null },
  },
};

export const devisSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSoinsDevis.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
        state.items = []; // Reset items when loading new consultation devis
      })
      .addCase(getAllSoinsDevis.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllSoinsDevis.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch soins devis" };
        }
      });

    builder
      .addCase(createSoinDevis.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createSoinDevis.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createSoinDevis.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to add soin to devis" };
        }
      });
    
    builder
      .addCase(deleteSoinDevis.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteSoinDevis.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteSoinDevis.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default devisSlice;
