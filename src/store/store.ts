import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currencySlice";
import settingsReducer from "./slices/settingsSlice";
import expenseReducer from "./slices/expenseSlice";
import incomeReducer from "./slices/incomeSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    settings: settingsReducer,
    expenses: expenseReducer,
    incomes: incomeReducer,
  },
});

// Types (VERY important for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
