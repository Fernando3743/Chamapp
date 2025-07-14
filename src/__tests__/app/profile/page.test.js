import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePage from '../../../app/profile/page';
import { useSupabaseAuth } from '../../../app/contexts/SupabaseAuthContext';
import { usePageTranslations } from '../../../hooks/usePageTranslations';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

// Mock the modules
jest.mock('../../../app/contexts/SupabaseAuthContext');
jest.mock('../../../hooks/usePageTranslations');
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

// Mock useAuth to use useSupabaseAuth
global.useAuth = jest.fn(() => useSupabaseAuth());

describe('ProfilePage', () => {
  const mockUpdateProfile = jest.fn();
  const mockUser = {
    id: '123',
    email: 'test@example.com',
  };
  const mockUserProfile = {
    first_name: 'John',
    last_name: 'Doe',
    phone: '+1234567890',
    date_of_birth: '1990-01-01',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    useSupabaseAuth.mockReturnValue({
      user: mockUser,
      userProfile: mockUserProfile,
      updateProfile: mockUpdateProfile,
      loading: false,
      isAuthenticated: true,
    });

    usePageTranslations.mockReturnValue({
      t: (key) => key, // Return the key as the translation
    });
  });

  it('renders user profile information', () => {
    render(<ProfilePage />);

    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('+1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1990-01-01')).toBeInTheDocument();
  });

  it('redirects to signin if not authenticated', () => {
    useSupabaseAuth.mockReturnValue({
      user: null,
      userProfile: null,
      updateProfile: mockUpdateProfile,
      loading: false,
      isAuthenticated: false,
    });

    render(<ProfilePage />);

    expect(mockPush).toHaveBeenCalledWith('/signin');
  });

  it('shows loading state', () => {
    useSupabaseAuth.mockReturnValue({
      user: null,
      userProfile: null,
      updateProfile: mockUpdateProfile,
      loading: true,
      isAuthenticated: false,
    });

    render(<ProfilePage />);

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('enables editing when edit button is clicked', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    const firstNameInput = screen.getByLabelText(/firstNameRequired/i);
    expect(firstNameInput).toBeDisabled();

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    expect(firstNameInput).not.toBeDisabled();
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/save/i)).toBeInTheDocument();
  });

  it('validates required fields', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    const firstNameInput = screen.getByLabelText(/firstNameRequired/i);
    await user.clear(firstNameInput);

    const saveButton = screen.getByText(/save/i);
    await user.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please fix the errors in the form');
      expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
    });

    expect(mockUpdateProfile).not.toHaveBeenCalled();
  });

  it('validates phone number format', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    const phoneInput = screen.getByLabelText(/phoneOptional/i);
    await user.clear(phoneInput);
    await user.type(phoneInput, '123'); // Invalid phone

    const saveButton = screen.getByText(/save/i);
    await user.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter a valid phone number/i)).toBeInTheDocument();
    });
  });

  it('saves profile changes successfully', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockResolvedValueOnce({ error: null });

    render(<ProfilePage />);

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    const firstNameInput = screen.getByLabelText(/firstNameRequired/i);
    const lastNameInput = screen.getByLabelText(/lastNameRequired/i);

    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Jane');
    await user.clear(lastNameInput);
    await user.type(lastNameInput, 'Smith');

    const saveButton = screen.getByText(/save/i);
    await user.click(saveButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        first_name: 'Jane',
        last_name: 'Smith',
        phone: '+1234567890',
        date_of_birth: '1990-01-01',
      });
      expect(toast.success).toHaveBeenCalledWith('Profile updated successfully!');
    });

    // Should exit edit mode
    expect(screen.getByLabelText(/firstNameRequired/i)).toBeDisabled();
  });

  it('handles profile update errors', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockResolvedValueOnce({ 
      error: { message: 'Update failed' } 
    });

    render(<ProfilePage />);

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    const saveButton = screen.getByText(/save/i);
    await user.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to update profile');
    });
  });

  it('cancels editing without saving', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    const firstNameInput = screen.getByLabelText(/firstNameRequired/i);
    await user.clear(firstNameInput);
    await user.type(firstNameInput, 'Jane');

    const cancelButton = screen.getByText(/cancel/i);
    await user.click(cancelButton);

    // Should revert changes
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByLabelText(/firstNameRequired/i)).toBeDisabled();
  });

  it('switches between tabs', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    // Personal tab is active by default
    expect(screen.getByLabelText(/firstNameRequired/i)).toBeInTheDocument();

    // Switch to Security tab
    const securityTab = screen.getByText(/security/i).closest('button');
    await user.click(securityTab);

    expect(screen.getByText(/currentPassword/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/firstNameRequired/i)).not.toBeInTheDocument();

    // Switch to Preferences tab
    const preferencesTab = screen.getByText(/preferences/i).closest('button');
    await user.click(preferencesTab);

    expect(screen.getByText(/preferencesComingSoon/i)).toBeInTheDocument();
  });

  it('toggles password visibility in security tab', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    const securityTab = screen.getByText(/security/i).closest('button');
    await user.click(securityTab);

    const currentPasswordInput = screen.getByLabelText(/currentPassword/i);
    const toggleButtons = screen.getAllByRole('button').filter(
      btn => btn.querySelector('svg')
    );

    expect(currentPasswordInput).toHaveAttribute('type', 'password');

    await user.click(toggleButtons[0]);
    expect(currentPasswordInput).toHaveAttribute('type', 'text');

    await user.click(toggleButtons[0]);
    expect(currentPasswordInput).toHaveAttribute('type', 'password');
  });

  it('validates password update form', async () => {
    const user = userEvent.setup();
    render(<ProfilePage />);

    const securityTab = screen.getByText(/security/i).closest('button');
    await user.click(securityTab);

    const updateButton = screen.getByText(/updatePassword/i);
    await user.click(updateButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Please fix the errors in the form');
      expect(screen.getByText(/current password is required/i)).toBeInTheDocument();
    });
  });

  it('shows loading state when saving', async () => {
    const user = userEvent.setup();
    mockUpdateProfile.mockImplementation(() => 
      new Promise(resolve => setTimeout(resolve, 100))
    );

    render(<ProfilePage />);

    const editButton = screen.getByText(/editProfile/i);
    await user.click(editButton);

    const saveButton = screen.getByText(/save/i);
    await user.click(saveButton);

    expect(screen.getByText(/saving/i)).toBeInTheDocument();
    expect(saveButton).toBeDisabled();
  });
});