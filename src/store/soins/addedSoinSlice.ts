import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiError, statusType } from "@/types/base";

export interface AddedSoin {
  idSoin: number;
  codification: string;
  nomSoin: string;
  tarif: number;
  idDent: number;
  numero: number;
  nomDent: string;
}

export interface AddedSoinState {
  items: AddedSoin[];
  status: {
    add: statusType;
    remove: statusType;
    clear: statusType;
  };
  error: {
    add: ApiError;
    remove: ApiError;
    clear: ApiError;
  };
}

const initialState: AddedSoinState = {
  items: [],
  status: {
    add: "idle",
    remove: "idle",
    clear: "idle",
  },
  error: {
    add: { message: null },
    remove: { message: null },
    clear: { message: null },
  },
};

export const addedSoinSlice = createSlice({
  name: "addedSoin",
  initialState,
  reducers: {
    addSoin: (state, action: PayloadAction<AddedSoin>) => {
      state.status.add = "succeeded";
      const exists = state.items.some(
        s => s.idSoin === action.payload.idSoin && s.idDent === action.payload.idDent
      );
      if (!exists) {
        state.items.push(action.payload);
      } else {
        state.error.add = { message: "Ce soin est déjà ajouté pour cette dent" };
      }
    },
    removeSoin: (state, action: PayloadAction<{ idSoin: number; idDent: number }>) => {
      state.status.remove = "succeeded";
      state.items = state.items.filter(
        s => !(s.idSoin === action.payload.idSoin && s.idDent === action.payload.idDent)
      );
    },
    clearSoins: (state) => {
      state.status.clear = "succeeded";
      state.items = [];
    },
  },
});

export const { addSoin, removeSoin, clearSoins } = addedSoinSlice.actions;
export default addedSoinSlice;
