// Authentication State Slice - Managing user authentication state
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // This would integrate with your Supabase auth or API
      // For now, it's a placeholder structure
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Login failed');
      }
      
      if (!data.success) {
        return rejectWithValue(data.message || 'Login failed');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message || 'Logout failed');
      }
      
      if (!data.success) {
        return rejectWithValue(data.message || 'Logout failed');
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Network error occurred');
    }
  }
);

const initialState = {
  // User data
  user: null,
  isAuthenticated: false,
  
  // Loading states
  isLoading: false,
  isLoginLoading: false,
  isLogoutLoading: false,
  
  // Error handling
  error: null,
  loginError: null,
  
  // Session management
  sessionExpiry: null,
  lastActivity: null,
  
  // User preferences
  preferences: {
    language: 'en',
    theme: 'dark',
    notifications: true,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear errors
    clearError: (state) => {
      state.error = null;
      state.loginError = null;
    },
    
    // Clear auth state (for logout)
    clearAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loginError = null;
      state.sessionExpiry = null;
      state.lastActivity = null;
    },
    
    // Update user preferences
    updateUserPreferences: (state, action) => {
      state.preferences = {
        ...state.preferences,
        ...action.payload,
      };
    },
    
    // Update last activity for session management
    updateLastActivity: (state) => {
      state.lastActivity = Date.now();
    },
    
    // Set session expiry
    setSessionExpiry: (state, action) => {
      state.sessionExpiry = action.payload;
    },
    
    // Set user data (for manual auth state management)
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login user async thunk
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
        state.loginError = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.sessionExpiry = action.payload.session?.expires_at || null;
        state.lastActivity = Date.now();
        state.loginError = null;
        // Store the access token if needed
        if (action.payload.token) {
          state.accessToken = action.payload.token;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })
      
    // Logout user async thunk
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLogoutLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLogoutLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.sessionExpiry = null;
        state.lastActivity = null;
        state.error = null;
        state.loginError = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLogoutLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearError,
  clearAuthState,
  updateUserPreferences,
  updateLastActivity,
  setSessionExpiry,
  setUser,
} = authSlice.actions;

// Selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectIsLoginLoading = (state) => state.auth.isLoginLoading;
export const selectIsLogoutLoading = (state) => state.auth.isLogoutLoading;
export const selectError = (state) => state.auth.error;
export const selectLoginError = (state) => state.auth.loginError;
export const selectUserPreferences = (state) => state.auth.preferences;
export const selectSessionExpiry = (state) => state.auth.sessionExpiry;
export const selectLastActivity = (state) => state.auth.lastActivity;

export default authSlice.reducer;