import { createSlice } from "@reduxjs/toolkit";
import {
  createAllergie,
} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Allergie } from "@/types/historique";

export interface AllergieState {
  items: Allergie[];
  status: {
    create: statusType;
  };
  error: {
    create: ApiError;
  };
}

const initialState: AllergieState = {
  items: [],
  status: {
    create: "idle",
  },
  error: {
    create: { message: null },
  },
};

export const allergieSlice = createSlice({
  name: "allergie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAllergie.pending, (state) => {
        state.status.create = "pending";
        state.error.create = { message: null };
      })
      .addCase(createAllergie.fulfilled, (state, action) => {
        state.status.create = "succeeded";
        if (action.payload) {
          state.items.unshift(action.payload.data);
        }
      })
      .addCase(createAllergie.rejected, (state, action) => {
        state.status.create = "failed";
        if (action.payload) {
          state.error.create = { message: "Failed to create patient" };
        }
      });

  },
});

export default allergieSlice;
