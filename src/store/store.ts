import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import currencyReducer from "./slices/currencySlice";
import settingsReducer from "./slices/settingsSlice";
import expenseReducer from "./slices/expenseSlice";
import incomeReducer from "./slices/incomeSlice";
import userReducer from "./slices/userSlice";

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // Add any reducers you want to persist here
  whitelist: ['currency', 'settings', 'user'],
};

const rootReducer = combineReducers({
  currency: currencyReducer,
  settings: settingsReducer,
  expenses: expenseReducer,
  incomes: incomeReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Types (VERY important for TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
