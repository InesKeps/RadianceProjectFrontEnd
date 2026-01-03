import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { ApiResponse } from "../../types/base";
import type { Allergie, AllergieDto } from "@/types/historique";


export const createAllergie = createAsyncThunk<ApiResponse<Allergie>, AllergieDto,{state: RootState}>(
  "user/createAllergie",
  async (data,apiThunk) => {

    try {
      const token = apiThunk.getState().auth.userInfo?.token;

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/allergies/create`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.log("Failed to create allergie: ", error);
        return apiThunk.rejectWithValue("Failed to create allergie.");
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      console.log("Error on create allergie: ", error);
      return apiThunk.rejectWithValue(
        (error as { message: string }).message ||
          "Error on create allergie."
      );
    }
  }
);
