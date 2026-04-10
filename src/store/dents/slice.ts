import { createSlice } from "@reduxjs/toolkit";
import {
  getAllDents,
  createDent,
  updateDent,
  deleteDent,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Dent } from "@/types/consultationdatas";

export interface DentState {
  items: Dent[];
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

const initialState: DentState = {
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

export const dentSlice = createSlice({
  name: "dent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDents.pending, (state) => {
        state.status.getAll = "pending";
        state.error.getAll = { message: null };
      })
      .addCase(getAllDents.fulfilled, (state, action) => {
        state.status.getAll = "succeeded";
        if (action.payload) {
          state.items = action.payload.data;
        }
      })
      .addCase(getAllDents.rejected, (state, action) => {
        state.status.getAll = "failed";
        if (action.payload) {
          state.error.getAll = { message: "Failed to fetch motifs" };
        }
      });

    builder
      .addCase(createDent.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createDent.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createDent.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });

    builder
      .addCase(updateDent.pending, (state) => {
        state.status.update = "pending";
        state.error.update = { message: null };
      })
      .addCase(updateDent.fulfilled, (state, action) => {
        state.status.update = "succeeded";
        const id = action.payload?.data.id;
        if (action.payload) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload.data : item
          );
        }
      })
      .addCase(updateDent.rejected, (state, action) => {
        state.status.update = "failed";
        if (action.payload) {
          state.error.update = { message: "Failed to update patient" };
        }
      });
    
    builder
      .addCase(deleteDent.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteDent.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteDent.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "Failed to delete patient" };
        }
      });
  },
});

export default dentSlice;
