import { configureStore } from "@reduxjs/toolkit";
import league from "./league/leagueReducer";
import label from "./label/labelReducer";
import profit from "./profit/profitReducer";
import signature from "./signature/signatureReducer";

export const store = configureStore({
  reducer: {
    league,
    label,
    profit,
    signature,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
