import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProfitQuery, ProfitState } from "../../../types/profit-types";

const initialState: ProfitState = {
  profits: [],
};

export const profitSlice = createSlice({
  name: "profit",
  initialState,
  reducers: {
    setProfits: (state, action: PayloadAction<ProfitQuery[]>) => {
      state.profits = action.payload;
    },
  },
});

export const { setProfits } = profitSlice.actions;
export const selectUser = (state: RootState) => state.league;
export default profitSlice.reducer;
