import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

export interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
}

interface UserState {
  user: UserData | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchUserData = createAsyncThunk<UserData, void, { rejectValue: string }>(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/me', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return rejectWithValue(errorData.message || 'Failed to fetch user data');
      }

      const userData = await response.json();
      return {
        id: userData.id,
        name: userData.name || 'User',
        email: userData.email,
        image: userData.image || undefined,
      };
    } catch (error) {
      console.error('Error fetching user data:', error);
      return rejectWithValue('Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData | null>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

// Selectors
export const selectUser = (state: { user: UserState }) => state.user.user;
export const selectUserLoading = (state: { user: UserState }) => state.user.loading;
export const selectUserError = (state: { user: UserState }) => state.user.error;
