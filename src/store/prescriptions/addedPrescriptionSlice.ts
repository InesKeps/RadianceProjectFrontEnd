import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ApiError, statusType } from "@/types/base";

export interface AddedPrescription {
  nomMedicament: string;
  grammage: string;
  forme: string;
  posologie: string;
  duree : string;
  quantite : string;
}

export interface AddedPrescriptionState {
  items: AddedPrescription[];
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

const initialState: AddedPrescriptionState = {
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

export const addedPrescriptionSlice = createSlice({
  name: "addedPrescription",
  initialState,
  reducers: {
    addPrescription: (state, action: PayloadAction<AddedPrescription>) => {
      state.status.add = "succeeded";
      const exists = state.items.some(
        s => s.nomMedicament === action.payload.nomMedicament
      );
      if (!exists) {
        state.items.push(action.payload);
      } else {
        state.error.add = { message: "Ce médicament a déja été ajouté." };
      }
    },
    removePrescription: (state, action: PayloadAction<{ nomMedicament: String }>) => {
      state.status.remove = "succeeded";
      state.items = state.items.filter(
        s => !(s.nomMedicament === action.payload.nomMedicament)
      );
    },
    clearPrescriptions: (state) => {
      state.status.clear = "succeeded";
      state.items = [];
    },
  },
});

export const { addPrescription, removePrescription, clearPrescriptions } = addedPrescriptionSlice.actions;
export default addedPrescriptionSlice;
