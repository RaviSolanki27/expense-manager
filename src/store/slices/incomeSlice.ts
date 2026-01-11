import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Income {
  id: number;
  description: string;
  amount: number;
  source: string;
  date: string;
}

interface IncomeState {
  incomes: Income[];
}

const initialState: IncomeState = {
  incomes: [
    { id: 1, description: 'Salary', amount: 3000, source: 'Job', date: '2024-01-01' },
    { id: 2, description: 'Freelance', amount: 500, source: 'Side Project', date: '2024-01-15' },
  ]
};

const incomeSlice = createSlice({
  name: 'incomes',
  initialState,
  reducers: {
    addIncome: (state, action: PayloadAction<Omit<Income, 'id'>>) => {
      const newId = state.incomes.length > 0 
        ? Math.max(...state.incomes.map(i => i.id)) + 1 
        : 1;
      state.incomes.push({
        id: newId,
        ...action.payload
      });
    },
    updateIncome: (state, action: PayloadAction<Income>) => {
      const index = state.incomes.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.incomes[index] = action.payload;
      }
    },
    deleteIncome: (state, action: PayloadAction<number>) => {
      state.incomes = state.incomes.filter(income => income.id !== action.payload);
    },
  },
});

export const { addIncome, updateIncome, deleteIncome } = incomeSlice.actions;
export default incomeSlice.reducer;
