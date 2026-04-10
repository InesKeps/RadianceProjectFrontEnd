import { createSlice } from "@reduxjs/toolkit";
import {
  getAllSoins,
  createSoin,
  updateSoin,
  deleteSoin,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Soin } from "@/types/consultationdatas";

export interface SoinState {
  items: Soin[];
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

const initialState: SoinState = {
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

export const soinSlice = createSlice({
  name: "soin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSoins.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllSoins.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllSoins.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch motifs" };
        }
      });

    builder
      .addCase(createSoin.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createSoin.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createSoin.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });

    builder
      .addCase(updateSoin.pending, (state) => {
        state.status.update = "pending";
        state.error.update = { message: null };
      })
      .addCase(updateSoin.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const id = action.payload?.data.id;
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload.data : item
          );
        }
      })
      .addCase(updateSoin.rejected, (state, action) => {
        state.status.update = "failed";
        if (action.payload) {
          state.error.update = { message: "Failed to update patient" };
        }
      });
    
    builder
      .addCase(deleteSoin.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteSoin.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteSoin.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default soinSlice;
