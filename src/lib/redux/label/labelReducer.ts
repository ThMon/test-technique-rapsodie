import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { LabelQuery, LabelState } from "../../../types/label-types";

const initialState: LabelState = {
  labels: [],
  selectedLabel: null,
};

export const labelSlice = createSlice({
  name: "label",
  initialState,
  reducers: {
    setLabels: (state, action: PayloadAction<LabelQuery[]>) => {
      state.labels = action.payload;
    },
    selectLabel: (state, action: PayloadAction<LabelQuery>) => {
      state.selectedLabel = action.payload;
    },
  },
});

export const { setLabels, selectLabel } = labelSlice.actions;
export const selectUser = (state: RootState) => state.league;
export default labelSlice.reducer;
