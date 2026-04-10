import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Soin, SoinDto } from "@/types/consultationdatas";
import fetchWithAuth from "@/services/fetchwithauth.service";

export const getAllSoins = createAsyncThunk<ApiResponse<Soin[]>,void,{state: RootState}>(
  "soin/getAllSoins",
  async (_,apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soins`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to get all soins: ", error);
        return apiThunk.rejectWithValue("Failed to get all soins.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on get all soins: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on get all soins."
      );
    }
  }
);

export const createSoin = createAsyncThunk<ApiResponse<Soin>, SoinDto,{state: RootState}>(
  "soin/createSoin",
  async (data,apiThunk) => {

    try {
      console.log("error?");
      
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soins/create`,
        {
          method: "POST",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create soin: ", error);
        return apiThunk.rejectWithValue("Failed to create soin.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create soin: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create soin."
      );
    }
  }
);

export const updateSoin = createAsyncThunk<ApiResponse<Soin>, Soin,{state: RootState}>(
  "soin/updateSoin",
  async (data,apiThunk) => {

    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soins/update/${data.id}`,
        {
          method: "PUT",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to update soin: ", error);
        return apiThunk.rejectWithValue("Failed to update soin.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on update soin: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on update soin."
      );
    }
  }
);

export const deleteSoin = createAsyncThunk<ApiResponse<Soin>, number,{state: RootState}>(
  "soin/deleteSoin",
  async (id, apiThunk) => {
    try {

      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/soins/delete/${id}`,
        {
          method: "DELETE",
          headers: {"Content-Type": "application/json",},
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to delete soin: ", error);
        return apiThunk.rejectWithValue("Failed to delete soin.");
      }
      const result = await response.json();

      return result;
    } catch (error) {
      console.log("Error on delete soin: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message || "Error on delete soin."
      );
    }
  }
);



