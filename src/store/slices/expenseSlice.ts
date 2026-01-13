import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { expenseApi, ExpenseData } from '@/services/expenseApi';

interface Expense extends Omit<ExpenseData, 'id'> {
  id: string;
}

interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}

const initialState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

// Async Thunks
export const fetchExpenses = createAsyncThunk(
  'expenses',
  async (_, { rejectWithValue }) => {
    try {
      return await expenseApi.getExpenses();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch expenses');
    }
  }
);

export const createExpense = createAsyncThunk(
  'expenses/create',
  async (expenseData: Omit<Expense, 'id'>, { rejectWithValue }) => {
    try {
      return await expenseApi.addExpense(expenseData);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create expense');
    }
  }
);

export const updateExpense = createAsyncThunk(
  'expenses/update',
  async ({ id, ...updates }: { id: string } & Partial<Expense>, { rejectWithValue }) => {
    try {
      return await expenseApi.updateExpense(id, updates);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update expense');
    }
  }
);

export const removeExpense = createAsyncThunk(
  'expenses/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await expenseApi.deleteExpense(id);
      return id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete expense');
    }
  }
);

const expenseSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Expenses
    builder.addCase(fetchExpenses.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchExpenses.fulfilled, (state, action: PayloadAction<Expense[]>) => {
      state.loading = false;
      state.expenses = action.payload;
    });
    builder.addCase(fetchExpenses.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Expense
    builder.addCase(createExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
      state.expenses.unshift(action.payload);
    });
    builder.addCase(createExpense.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Update Expense
    builder.addCase(updateExpense.fulfilled, (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(e => e.id === action.payload.id);
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }
    });
    builder.addCase(updateExpense.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete Expense
    builder.addCase(removeExpense.fulfilled, (state, action: PayloadAction<string>) => {
      state.expenses = state.expenses.filter(expense => expense.id !== action.payload);
    });
    builder.addCase(removeExpense.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = expenseSlice.actions;
export default expenseSlice.reducer;
