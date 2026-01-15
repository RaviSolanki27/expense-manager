import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: string;
  category?: string;
  date: string;
  accountId: string;
  userId: string;
  account: {
    id: string;
    name: string;
    type: string;
  };
}

interface TransactionsState {
  transactions: Transaction[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    type: string;
    accountId: string;
    startDate: string;
    endDate: string;
    category: string;
  };
}

const initialState: TransactionsState = {
  transactions: [],
  status: 'idle',
  error: null,
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  },
  filters: {
    type: '',
    accountId: '',
    startDate: '',
    endDate: '',
    category: '',
  },
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { page, limit } = state.transactions.pagination;
    const { type, accountId, startDate, endDate, category } = state.transactions.filters;

    const queryParams = new URLSearchParams();
    if (type) queryParams.append('type', type);
    if (accountId) queryParams.append('accountId', accountId);
    if (startDate) queryParams.append('startDate', startDate);
    if (endDate) queryParams.append('endDate', endDate);
    if (category) queryParams.append('category', category);
    queryParams.append('page', page.toString());
    queryParams.append('limit', limit.toString());

    const response = await fetch(`/api/transactions?${queryParams.toString()}`, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch transactions');
    }

    return await response.json();
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<TransactionsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; // Reset to first page when filters change
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.pagination.limit = action.payload;
      state.pagination.page = 1; // Reset to first page when limit changes
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
      state.pagination = { ...initialState.pagination, total: state.pagination.total };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload.data;
        state.pagination = {
          ...state.pagination,
          total: action.payload.pagination.total,
          totalPages: action.payload.pagination.totalPages,
        };
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch transactions';
      });
  },
});

export const { setFilters, setPage, setLimit, resetFilters } = transactionsSlice.actions;

export const selectAllTransactions = (state: RootState) => state.transactions.transactions;
export const selectTransactionStatus = (state: RootState) => state.transactions.status;
export const selectTransactionError = (state: RootState) => state.transactions.error;
export const selectPagination = (state: RootState) => state.transactions.pagination;
export const selectFilters = (state: RootState) => state.transactions.filters;

export default transactionsSlice.reducer;
