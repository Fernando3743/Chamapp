'use client';

// Redux Demo Component - Shows how to use Redux in your app
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  selectMobileMenuOpen,
  selectCurrentLanguage,
  selectNotifications,
  toggleMobileMenu,
  setLanguage,
  addNotification,
  removeNotification,
  clearAllNotifications
} from '../store/slices/uiSlice';
// Auth slice has been removed - using SupabaseAuthContext instead

export default function ReduxDemo() {
  const dispatch = useAppDispatch();
  
  // UI State
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen);
  const currentLanguage = useAppSelector(selectCurrentLanguage);
  const notifications = useAppSelector(selectNotifications);
  
  // Auth State - now handled by SupabaseAuthContext
  const user = null;
  const isAuthenticated = false;
  const userPreferences = { theme: 'dark' };

  const handleAddNotification = () => {
    dispatch(addNotification({
      type: 'success',
      title: 'Demo Notification',
      message: 'This is a test notification from Redux!',
    }));
  };

  const handleToggleLanguage = () => {
    const newLang = currentLanguage === 'en' ? 'es' : 'en';
    dispatch(setLanguage(newLang));
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '12px',
      padding: '20px',
      color: 'white',
      fontSize: '12px',
      maxWidth: '300px',
      zIndex: 9999
    }}>
      <h3>Redux Demo Panel</h3>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>UI State:</strong><br />
        Mobile Menu: {mobileMenuOpen ? 'Open' : 'Closed'}<br />
        Language: {currentLanguage}<br />
        Notifications: {notifications.length}
      </div>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Auth State:</strong><br />
        Authenticated: {isAuthenticated ? 'Yes' : 'No'}<br />
        User: {user ? user.name : 'None'}<br />
        Theme: {userPreferences.theme}
      </div>
      
      <div>
        <button 
          onClick={() => dispatch(toggleMobileMenu())}
          style={{ 
            margin: '2px', 
            padding: '4px 8px', 
            fontSize: '10px',
            background: 'rgba(102, 126, 234, 0.3)',
            border: '1px solid rgba(102, 126, 234, 0.5)',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Toggle Menu
        </button>
        
        <button 
          onClick={handleToggleLanguage}
          style={{ 
            margin: '2px', 
            padding: '4px 8px', 
            fontSize: '10px',
            background: 'rgba(102, 126, 234, 0.3)',
            border: '1px solid rgba(102, 126, 234, 0.5)',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Toggle Lang
        </button>
        
        <button 
          onClick={handleAddNotification}
          style={{ 
            margin: '2px', 
            padding: '4px 8px', 
            fontSize: '10px',
            background: 'rgba(102, 126, 234, 0.3)',
            border: '1px solid rgba(102, 126, 234, 0.5)',
            borderRadius: '4px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Add Notification
        </button>
        
        {notifications.length > 0 && (
          <button 
            onClick={() => dispatch(clearAllNotifications())}
            style={{ 
              margin: '2px', 
              padding: '4px 8px', 
              fontSize: '10px',
              background: 'rgba(239, 68, 68, 0.3)',
              border: '1px solid rgba(239, 68, 68, 0.5)',
              borderRadius: '4px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Clear All
          </button>
        )}
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '10px', opacity: 0.7 }}>
        Open Redux DevTools (F12) to see state changes in real-time!
      </div>
    </div>
  );
}