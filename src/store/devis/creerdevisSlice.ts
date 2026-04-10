import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiError, statusType } from "@/types/base";

export interface SoinDevis {
  idSoin: number;
  codification: string;
  nomSoin: string;
  tarif: number;
  idDent: number;
  numero: number;
  nomDent: string;
}

export interface SoinDevisState {
  items: SoinDevis[];
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

const initialState: SoinDevisState = {
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

export const devisSoinsSlice = createSlice({
  name: "devisSoins",
  initialState,
  reducers: {
    addSoin: (state, action: PayloadAction<SoinDevis>) => {
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

export const { addSoin, removeSoin, clearSoins } = devisSoinsSlice.actions;
export default devisSoinsSlice;
