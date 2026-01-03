import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/slice";
import userSlice from "./users/slice";
import patientSlice from "./patients/slice";
import { logoutAction } from "./auth/actions";
import allergieSlice from "./allergies/slice";
import assuranceSlice from "./assurances/slice";

const appReducer = combineReducers({
  [authSlice.name]: authSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [patientSlice.name]: patientSlice.reducer,
  [allergieSlice.name]: allergieSlice.reducer,
  [assuranceSlice.name]: assuranceSlice.reducer,
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
