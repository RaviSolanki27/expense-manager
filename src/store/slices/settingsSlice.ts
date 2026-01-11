import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  currency: string;
  showDecimals: boolean;
}

const initialState: SettingsState = {
  currency: 'USD', // Default currency
  showDecimals: true, // Show decimals by default
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setCurrency: (state, action: PayloadAction<string>) => {
      state.currency = action.payload;
    },
    setShowDecimals: (state, action: PayloadAction<boolean>) => {
      state.showDecimals = action.payload;
    },
  },
});

export const { setCurrency, setShowDecimals } = settingsSlice.actions;
export default settingsSlice.reducer;
