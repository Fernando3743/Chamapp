// Redux Store Configuration
import { configureStore } from '@reduxjs/toolkit';
import uiSlice from './slices/uiSlice';
import authSlice from './slices/authSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Type definitions for TypeScript users:
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;