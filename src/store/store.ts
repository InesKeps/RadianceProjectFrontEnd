import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import userSlice from "./users/slice";
import patientSlice from "./patients/slice";
import { logoutAction } from "./auth/actions";
import allergieSlice from "./allergies/slice";
import assuranceSlice from "./assurances/slice";
import antecedentSlice from "./antecedents/slice";
import motifSlice from "./motifs/slice";
import consultationSlice from "./consultations/slice";
import soinSlice from "./soins/slice";
import addedSoinsSlice from "./soins/addedSoinSlice";
import dentSlice from "./dents/slice";
import prescriptionSlice from "./prescriptions/slice";
import addedPrescriptionSlice from "./prescriptions/addedPrescriptionSlice";
import soinConsultationSlice from "./soinsconsultations/slice";
import devisSoinsSlice from "./devis/creerdevisSlice";
import devisSlice from "./devis/slice";
import motifConsultationSlice from "./motifsconsultations/slice";
import rdvSlice from "./rdv/slice";

const appReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [patientSlice.name]: patientSlice.reducer,
  [antecedentSlice.name]: antecedentSlice.reducer,
  [allergieSlice.name]: allergieSlice.reducer,
  [assuranceSlice.name]: assuranceSlice.reducer,
  [consultationSlice.name]: consultationSlice.reducer,
  [motifSlice.name]: motifSlice.reducer,
  [soinSlice.name]: soinSlice.reducer,
  [dentSlice.name]: dentSlice.reducer,
  [soinConsultationSlice.name]: soinConsultationSlice.reducer,
  [motifConsultationSlice.name]: motifConsultationSlice.reducer,
  [devisSlice.name]: devisSlice.reducer,
  [prescriptionSlice.name]: prescriptionSlice.reducer,
  [addedSoinsSlice.name]: addedSoinsSlice.reducer,
  [devisSoinsSlice.name]: devisSoinsSlice.reducer, 
  [addedPrescriptionSlice.name]: addedPrescriptionSlice.reducer,
  [rdvSlice.name]: rdvSlice.reducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (logoutAction.fulfilled.match(action)) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
