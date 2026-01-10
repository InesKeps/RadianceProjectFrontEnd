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

const appReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [patientSlice.name]: patientSlice.reducer,
  [antecedentSlice.name]: antecedentSlice.reducer,
  [allergieSlice.name]: allergieSlice.reducer,
  [assuranceSlice.name]: assuranceSlice.reducer,
  [consultationSlice.name]: consultationSlice.reducer,
  [motifSlice.name]: motifSlice.reducer,
});

const rootReducer = (state: ReturnType<typeof appReducer> | undefined, action: any) => {
  if (action.type === logoutAction.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
