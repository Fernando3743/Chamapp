/**
 * Validation utilities for settings forms
 */

/**
 * Validate user account information
 * @param {Object} data - Form data
 * @returns {Object} Validation result with isValid and errors
 */
export function validateAccountInfo(data) {
  const errors = {};
  
  // First name validation
  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'First name is required';
  } else if (data.firstName.length > 100) {
    errors.firstName = 'First name must be less than 100 characters';
  }
  
  // Last name validation
  if (!data.lastName || data.lastName.trim() === '') {
    errors.lastName = 'Last name is required';
  } else if (data.lastName.length > 100) {
    errors.lastName = 'Last name must be less than 100 characters';
  }
  
  // Email validation
  if (!data.email || data.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!validateEmail(data.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation (optional)
  if (data.phone && !validatePhone(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate business information
 * @param {Object} data - Form data
 * @returns {Object} Validation result
 */
export function validateBusinessInfo(data) {
  const errors = {};
  
  // Business name validation
  if (!data.businessName || data.businessName.trim() === '') {
    errors.businessName = 'Business name is required';
  } else if (data.businessName.length > 255) {
    errors.businessName = 'Business name must be less than 255 characters';
  }
  
  // Business type validation
  if (!data.businessType || data.businessType === '') {
    errors.businessType = 'Business type is required';
  }
  
  // Phone validation
  if (!data.businessPhone || data.businessPhone.trim() === '') {
    errors.businessPhone = 'Business phone is required';
  } else if (!validatePhone(data.businessPhone)) {
    errors.businessPhone = 'Please enter a valid phone number';
  }
  
  // Address validation
  if (!data.businessAddress || data.businessAddress.trim() === '') {
    errors.businessAddress = 'Business address is required';
  }
  
  // City validation
  if (!data.city || data.city.trim() === '') {
    errors.city = 'City is required';
  }
  
  // State validation
  if (!data.state || data.state.trim() === '') {
    errors.state = 'State is required';
  }
  
  // Description validation
  if (data.businessDescription && data.businessDescription.length > 1000) {
    errors.businessDescription = 'Description must be less than 1000 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate password change
 * @param {Object} data - Password form data
 * @returns {Object} Validation result
 */
export function validatePasswordChange(data) {
  const errors = {};
  
  // Current password validation
  if (!data.currentPassword) {
    errors.currentPassword = 'Current password is required';
  }
  
  // New password validation
  if (!data.newPassword) {
    errors.newPassword = 'New password is required';
  } else if (data.newPassword.length < 8) {
    errors.newPassword = 'Password must be at least 8 characters long';
  } else if (data.newPassword === data.currentPassword) {
    errors.newPassword = 'New password must be different from current password';
  }
  
  // Confirm password validation
  if (!data.confirmNewPassword) {
    errors.confirmNewPassword = 'Please confirm your new password';
  } else if (data.newPassword !== data.confirmNewPassword) {
    errors.confirmNewPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Validate payment method
 * @param {Object} data - Payment form data
 * @returns {Object} Validation result
 */
export function validatePaymentMethod(data) {
  const errors = {};
  
  // Card number validation (basic)
  if (!data.cardNumber || data.cardNumber.trim() === '') {
    errors.cardNumber = 'Card number is required';
  } else if (!/^\d{13,19}$/.test(data.cardNumber.replace(/\s/g, ''))) {
    errors.cardNumber = 'Please enter a valid card number';
  }
  
  // Expiry date validation
  if (!data.expiryDate || data.expiryDate.trim() === '') {
    errors.expiryDate = 'Expiry date is required';
  } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
    errors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
  }
  
  // CVV validation
  if (!data.cvv || data.cvv.trim() === '') {
    errors.cvv = 'CVV is required';
  } else if (!/^\d{3,4}$/.test(data.cvv)) {
    errors.cvv = 'Please enter a valid CVV';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Helper functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone) {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}