'use client';

import { AuthProvider } from './contexts/AuthContext';
import { SupabaseAuthProvider } from './contexts/SupabaseAuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import ReduxProvider from './components/providers/ReduxProvider';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }) {
  return (
    <ReduxProvider>
      <SupabaseAuthProvider>
        <AuthProvider>
          <LanguageProvider>
            {children}
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </LanguageProvider>
        </AuthProvider>
      </SupabaseAuthProvider>
    </ReduxProvider>
  );
}