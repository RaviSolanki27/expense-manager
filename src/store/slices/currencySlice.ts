import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrencyCode = "INR" | "USD" | "EUR";

interface CurrencyState {
  code: CurrencyCode;
  locale: string;
}

const initialState: CurrencyState = {
  code: "INR",
  locale: "en-IN",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency(state, action: PayloadAction<CurrencyState>) {
      state.code = action.payload.code;
      state.locale = action.payload.locale;
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
