import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
  date: string;
}

interface ExpenseState {
  expenses: Expense[];
}

const initialState: ExpenseState = {
  expenses: [
    { id: 1, description: 'Groceries', amount: 150, category: 'Food', date: '2024-01-10' },
    { id: 2, description: 'Rent', amount: 1200, category: 'Housing', date: '2024-01-01' },
    { id: 3, description: 'Utilities', amount: 200, category: 'Bills', date: '2024-01-05' },
  ]
};

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Omit<Expense, 'id'>>) => {
      const newId = state.expenses.length > 0 
        ? Math.max(...state.expenses.map(e => e.id)) + 1 
        : 1;
      state.expenses.push({
        id: newId,
        ...action.payload
      });
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    },
    deleteExpense: (state, action: PayloadAction<number>) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    },
  },
});

export const { addExpense, updateExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
