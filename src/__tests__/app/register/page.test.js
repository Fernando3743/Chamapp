import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterPage from '../../../app/register/page';
import { useSupabaseAuth } from '../../../app/contexts/SupabaseAuthContext';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Mock the modules
jest.mock('../../../app/contexts/SupabaseAuthContext');
jest.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe('RegisterPage', () => {
  const mockSignUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useSupabaseAuth.mockReturnValue({
      signUp: mockSignUp,
      loading: false,
    });
  });

  it('renders all form fields', () => {
    render(<RegisterPage />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    render(<RegisterPage />);
    
    const submitButton = screen.getByRole('button', { name: /create account/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        'Please fix the errors in the form',
        { duration: 6000 }
      );
    });

    expect(mockSignUp).not.toHaveBeenCalled();
  });

  it('validates email format', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const emailInput = screen.getByLabelText(/email address/i);
    await user.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    });
  });

  it('validates password match', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

    await user.type(passwordInput, 'password123');
    await user.type(confirmPasswordInput, 'password456');
    fireEvent.blur(confirmPasswordInput);

    await waitFor(() => {
      expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
    });
  });

  it('shows password strength indicator', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/^password$/i);

    // Weak password
    await user.type(passwordInput, 'weak');
    expect(screen.getByText(/weak/i)).toBeInTheDocument();

    // Strong password
    await user.clear(passwordInput);
    await user.type(passwordInput, 'StrongP@ssw0rd!');
    expect(screen.getByText(/strong/i)).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    render(<RegisterPage />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    const toggleButtons = screen.getAllByRole('button', { name: '' }).filter(
      btn => btn.querySelector('svg')
    );

    expect(passwordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButtons[0]);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValueOnce({
      data: { user: { id: '123' } },
      error: null,
    });

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'StrongP@ssw0rd!');
    await user.type(screen.getByLabelText(/confirm password/i), 'StrongP@ssw0rd!');
    await user.click(screen.getByRole('checkbox'));

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith(
        'john@example.com',
        'StrongP@ssw0rd!',
        'John',
        'Doe'
      );
      expect(toast.success).toHaveBeenCalledWith(
        'Registration successful! Redirecting...',
        { duration: 3000 }
      );
    });

    // Wait for redirect
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/signin');
    }, { timeout: 2000 });
  });

  it('handles registration errors', async () => {
    const user = userEvent.setup();
    mockSignUp.mockResolvedValueOnce({
      data: null,
      error: { message: 'User already exists' },
    });

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'existing@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'StrongP@ssw0rd!');
    await user.type(screen.getByLabelText(/confirm password/i), 'StrongP@ssw0rd!');
    await user.click(screen.getByRole('checkbox'));

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/user already exists/i)).toBeInTheDocument();
      expect(toast.error).toHaveBeenCalledWith(
        'User already exists',
        { duration: 6000 }
      );
    });

    expect(mockPush).not.toHaveBeenCalled();
  });

  it('disables submit button while loading', async () => {
    useSupabaseAuth.mockReturnValue({
      signUp: mockSignUp,
      loading: true,
    });

    render(<RegisterPage />);

    const submitButton = screen.getByRole('button', { name: /create account/i });
    expect(submitButton).toBeDisabled();
  });

  it('shows loading spinner when submitting', async () => {
    const user = userEvent.setup();
    mockSignUp.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(<RegisterPage />);

    await user.type(screen.getByLabelText(/first name/i), 'John');
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.type(screen.getByLabelText(/email address/i), 'john@example.com');
    await user.type(screen.getByLabelText(/^password$/i), 'StrongP@ssw0rd!');
    await user.type(screen.getByLabelText(/confirm password/i), 'StrongP@ssw0rd!');
    await user.click(screen.getByRole('checkbox'));

    const submitButton = screen.getByRole('button', { name: /create account/i });
    await user.click(submitButton);

    expect(screen.getByRole('button').querySelector('.loading')).toBeInTheDocument();
  });
});