import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { SupabaseAuthProvider, useSupabaseAuth } from '../../app/contexts/SupabaseAuthContext';
import { createClient } from '@supabase/supabase-js';

// Mock component to test the hook
const TestComponent = () => {
  const auth = useSupabaseAuth();
  return (
    <div>
      <div data-testid="loading">{auth.loading.toString()}</div>
      <div data-testid="isAuthenticated">{auth.isAuthenticated.toString()}</div>
      <div data-testid="user">{JSON.stringify(auth.user)}</div>
      <div data-testid="session">{JSON.stringify(auth.session)}</div>
    </div>
  );
};

describe('SupabaseAuthContext', () => {
  let mockSupabase;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSupabase = createClient();
  });

  it('provides auth context to children', () => {
    const { getByTestId } = render(
      <SupabaseAuthProvider>
        <TestComponent />
      </SupabaseAuthProvider>
    );

    expect(getByTestId('loading')).toHaveTextContent('true');
    expect(getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(getByTestId('user')).toHaveTextContent('null');
  });

  it('updates auth state when session changes', async () => {
    const mockSession = {
      user: { id: '123', email: 'test@example.com' },
      access_token: 'token',
    };

    mockSupabase.auth.getSession.mockResolvedValueOnce({
      data: { session: mockSession },
      error: null,
    });

    mockSupabase.auth.getUser.mockResolvedValueOnce({
      data: { user: mockSession.user },
      error: null,
    });

    const { getByTestId } = render(
      <SupabaseAuthProvider>
        <TestComponent />
      </SupabaseAuthProvider>
    );

    await waitFor(() => {
      expect(getByTestId('loading')).toHaveTextContent('false');
      expect(getByTestId('isAuthenticated')).toHaveTextContent('true');
      expect(getByTestId('user')).toHaveTextContent(JSON.stringify(mockSession.user));
    });
  });

  it('handles sign in correctly', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };
    const mockSession = { user: mockUser, access_token: 'token' };

    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: mockUser, session: mockSession },
      error: null,
    });

    const TestSignIn = () => {
      const { signIn } = useSupabaseAuth();
      return (
        <button onClick={() => signIn('test@example.com', 'password')}>
          Sign In
        </button>
      );
    };

    const { getByText } = render(
      <SupabaseAuthProvider>
        <TestSignIn />
      </SupabaseAuthProvider>
    );

    await act(async () => {
      getByText('Sign In').click();
    });

    expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('handles sign up correctly', async () => {
    const mockUser = { id: '123', email: 'test@example.com' };

    mockSupabase.auth.signUp.mockResolvedValueOnce({
      data: { user: mockUser },
      error: null,
    });

    mockSupabase.from().upsert.mockResolvedValueOnce({
      data: null,
      error: null,
    });

    const TestSignUp = () => {
      const { signUp } = useSupabaseAuth();
      return (
        <button 
          onClick={() => signUp('test@example.com', 'password', 'John', 'Doe')}
        >
          Sign Up
        </button>
      );
    };

    const { getByText } = render(
      <SupabaseAuthProvider>
        <TestSignUp />
      </SupabaseAuthProvider>
    );

    await act(async () => {
      getByText('Sign Up').click();
    });

    expect(mockSupabase.auth.signUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
  });

  it('handles sign out correctly', async () => {
    mockSupabase.auth.signOut.mockResolvedValueOnce({
      error: null,
    });

    const TestSignOut = () => {
      const { signOut } = useSupabaseAuth();
      return <button onClick={() => signOut()}>Sign Out</button>;
    };

    const { getByText } = render(
      <SupabaseAuthProvider>
        <TestSignOut />
      </SupabaseAuthProvider>
    );

    await act(async () => {
      getByText('Sign Out').click();
    });

    expect(mockSupabase.auth.signOut).toHaveBeenCalled();
  });

  it('handles errors during authentication', async () => {
    const mockError = { message: 'Invalid credentials' };

    mockSupabase.auth.signInWithPassword.mockResolvedValueOnce({
      data: { user: null, session: null },
      error: mockError,
    });

    const TestErrorHandling = () => {
      const { signIn, error } = useSupabaseAuth();
      return (
        <>
          <button onClick={() => signIn('test@example.com', 'wrong')}>
            Sign In
          </button>
          <div data-testid="error">{error}</div>
        </>
      );
    };

    const { getByText, getByTestId } = render(
      <SupabaseAuthProvider>
        <TestErrorHandling />
      </SupabaseAuthProvider>
    );

    await act(async () => {
      getByText('Sign In').click();
    });

    await waitFor(() => {
      expect(getByTestId('error')).toHaveTextContent('Invalid credentials');
    });
  });
});