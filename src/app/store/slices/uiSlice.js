// UI State Slice - Managing UI-related state across the app
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Navigation state
  mobileMenuOpen: false,
  currentLanguage: 'en',
  
  // Modal and overlay state
  loginDropdownOpen: false,
  
  // Loading states
  isPageLoading: false,
  
  // Theme and appearance
  theme: 'dark', // glassmorphism design is dark-themed
  
  // Notification state
  notifications: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Mobile menu actions
    openMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    
    // Login dropdown actions
    openLoginDropdown: (state) => {
      state.loginDropdownOpen = true;
    },
    closeLoginDropdown: (state) => {
      state.loginDropdownOpen = false;
    },
    toggleLoginDropdown: (state) => {
      state.loginDropdownOpen = !state.loginDropdownOpen;
    },
    
    // Language actions
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
    
    // Loading actions
    setPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    
    // Theme actions
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    
    // Notification actions
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  openMobileMenu,
  closeMobileMenu,
  toggleMobileMenu,
  openLoginDropdown,
  closeLoginDropdown,
  toggleLoginDropdown,
  setLanguage,
  setPageLoading,
  setTheme,
  addNotification,
  removeNotification,
  clearAllNotifications,
} = uiSlice.actions;

// Selectors
export const selectMobileMenuOpen = (state) => state.ui.mobileMenuOpen;
export const selectLoginDropdownOpen = (state) => state.ui.loginDropdownOpen;
export const selectCurrentLanguage = (state) => state.ui.currentLanguage;
export const selectIsPageLoading = (state) => state.ui.isPageLoading;
export const selectTheme = (state) => state.ui.theme;
export const selectNotifications = (state) => state.ui.notifications;

export default uiSlice.reducer;