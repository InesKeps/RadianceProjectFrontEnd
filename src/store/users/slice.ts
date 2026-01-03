import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, createUser, deleteUser, updateUser} from "./actions";
import type { ApiError, statusType } from "../../types/base";
import type { User } from "../../types/user";

export interface UserState {
  items: User[]
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

const initialState: UserState = {
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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
      builder
        .addCase(getAllUsers.pending, (state) => {
          state.status.getAll = "pending";
          state.error.getAll = { message: null };
        })
        .addCase(getAllUsers.fulfilled, (state, action) => {
          state.status.getAll = "succeeded";
          if(action.payload){
            state.items = action.payload.data;
          }
        })
        .addCase(getAllUsers.rejected, (state, action) => {
          state.status.getAll = "failed";
          if(action.payload){
            // state.error.login = { message: action.payload };
          }
        });

      builder
        .addCase(createUser.pending, (state) => {
          state.status.create = "pending";
          state.error.create = { message: null };
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.status.create = "succeeded";
          if(action.payload){
            state.items.unshift(action.payload.data)
          }
        })
        .addCase(createUser.rejected, (state, action) => {
          state.status.create = "failed";
          if(action.payload){
            state.error.create = { message: "create user failed" };
          }
        });

      builder
        .addCase(updateUser.pending, (state) => {
          state.status.update = "pending";
          state.error.update = { message: null };
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          const id = action.payload?.data.id;
          state.status.update = "succeeded";
          if (action.payload) {
            state.items = state.items.map((item) =>
              item.id === id ? action.payload.data : item
            );
          }
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.status.update = "failed";
          if (action.payload) {
            state.error.update = { message: "failed to update user" };
          }
        });

        builder
      .addCase(deleteUser.pending, (state) => {
        state.status.delete = "pending";
        state.error.delete = { message: null };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status.delete = "succeeded";
        if (action.payload) {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.data.id
          );
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status.delete = "failed";
        if (action.payload) {
          state.error.delete = { message: "failed to delete user"};
        }
      });
    },
});

export default userSlice;
