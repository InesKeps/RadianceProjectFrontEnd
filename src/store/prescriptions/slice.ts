import { createSlice } from "@reduxjs/toolkit";
import { 
  getConsultationPrescriptions, 
  createPrescription, 
  deletePrescription, 
  updatePrescription} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { Prescription } from "@/types/consultationdatas";

export interface UserState {
  items: Prescription[]
  status: {
      getPrescription: statusType;
      create: statusType;
      update: statusType;
      delete: statusType;
    };
    error: {
      getPrescription: ApiError;
      create: ApiError;
      update: ApiError;
      delete: ApiError;
    };
}

const initialState: UserState = {
  items: [],
  status: {
    getPrescription: "idle",
    create: "idle",
    update: "idle",
    delete: "idle",
  },
  error: {
    getPrescription: { message: null },
    create: { message: null },
    update: { message: null },
    delete: { message: null },
  },
};

export const prescriptionSlice = createSlice({
  name: "prescription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(getConsultationPrescriptions.pending, (state) => {
          state.status.getPrescription = "pending";
          state.error.getPrescription = { message: null };
          state.items = []; // Reset items when loading new consultation prescriptions
        })
        .addCase(getConsultationPrescriptions.fulfilled, (state, action) => {
          state.status.getPrescription = "succeeded";
          if(action.payload){
            state.items = action.payload.data;
          }
        })
        .addCase(getConsultationPrescriptions.rejected, (state, action) => {
          state.status.getPrescription = "failed";
          if(action.payload){
            state.error.getPrescription = { message: "failet to get prescriptions" };
          }
        });

      builder
        .addCase(createPrescription.pending, (state) => {
          state.status.create = "pending";
          state.error.create = { message: null };
        })
        .addCase(createPrescription.fulfilled, (state, action) => {
          state.status.create = "succeeded";
          if(action.payload){
            state.items.unshift(action.payload.data)
          }
        })
        .addCase(createPrescription.rejected, (state, action) => {
          state.status.create = "failed";
          if(action.payload){
            state.error.create = { message: "create user failed" };
          }
        });

      builder
        .addCase(updatePrescription.pending, (state) => {
          state.status.update = "pending";
          state.error.update = { message: null };
        })
        .addCase(updatePrescription.fulfilled, (state, action) => {
          const id = action.payload?.data.id;
          state.status.update = "succeeded";
          if (action.payload) {
            state.items = state.items.map((item) =>
              item.id === id ? action.payload.data : item
            );
          }
        })
        .addCase(updatePrescription.rejected, (state, action) => {
          state.status.update = "failed";
          if (action.payload) {
            state.error.update = { message: "failed to update user" };
          }
        });

        builder
      .addCase(deletePrescription.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deletePrescription.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deletePrescription.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "failed to delete user"};
        }
      });
    },
});

export default prescriptionSlice;
