import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { LeagueQuery, LeagueState } from "../../../types/league-types";

const initialState: LeagueState = {
  leagues: [],
  selectedLeague: null,
};

export const leagueSlice = createSlice({
  name: "league",
  initialState,
  reducers: {
    setLeagues: (state, action: PayloadAction<LeagueQuery[]>) => {
      state.leagues = action.payload;
    },
    selectLeague: (state, action: PayloadAction<LeagueQuery>) => {
      state.selectedLeague = action.payload;
    },
  },
});

export const { setLeagues, selectLeague } = leagueSlice.actions;
export const selectUser = (state: RootState) => state.league;
export default leagueSlice.reducer;
