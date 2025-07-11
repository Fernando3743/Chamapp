/**
 * Validation utility functions for business registration
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validateZipCode = (zipCode) => {
  const zipRegex = /^\d{5}(-\d{4})?$/;
  return zipRegex.test(zipCode);
};

export const validateUrl = (url) => {
  if (!url) return true; // Optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateUserRegistration = (formData) => {
  const errors = {};

  // Required fields validation
  const requiredFields = {
    firstName: 'First name is required',
    lastName: 'Last name is required',
    email: 'Email is required',
    password: 'Password is required',
    confirmPassword: 'Confirm password is required'
  };

  // Check required fields
  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = message;
    }
  });

  // Email validation
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  // Phone validation (optional)
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // Password validation
  if (formData.password && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters long';
  }

  // Confirm password validation
  if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Name length validation
  if (formData.firstName && formData.firstName.length > 100) {
    errors.firstName = 'First name must be less than 100 characters';
  }

  if (formData.lastName && formData.lastName.length > 100) {
    errors.lastName = 'Last name must be less than 100 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateBusinessRegistration = (formData) => {
  const errors = {};

  // Required fields validation
  const requiredFields = {
    businessName: 'Business name is required',
    businessType: 'Business type is required',
    description: 'Business description is required',
    address: 'Address is required',
    city: 'City is required',
    state: 'State is required',
    zipCode: 'ZIP code is required',
    phone: 'Phone number is required',
    email: 'Business email is required',
    ownerName: 'Owner name is required',
    ownerEmail: 'Owner email is required',
    password: 'Password is required',
    confirmPassword: 'Confirm password is required'
  };

  // Check required fields
  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = message;
    }
  });

  // Email validation
  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid business email address';
  }

  if (formData.ownerEmail && !validateEmail(formData.ownerEmail)) {
    errors.ownerEmail = 'Please enter a valid owner email address';
  }

  // Phone validation
  if (formData.phone && !validatePhone(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  // ZIP code validation
  if (formData.zipCode && !validateZipCode(formData.zipCode)) {
    errors.zipCode = 'Please enter a valid ZIP code (e.g., 12345 or 12345-6789)';
  }

  // Website validation (optional)
  if (formData.website && !validateUrl(formData.website)) {
    errors.website = 'Please enter a valid website URL';
  }

  // Password validation
  if (formData.password && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters long';
  }

  // Confirm password validation
  if (formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  // Business name length validation
  if (formData.businessName && formData.businessName.length > 255) {
    errors.businessName = 'Business name must be less than 255 characters';
  }

  // Description length validation
  if (formData.description && formData.description.length > 1000) {
    errors.description = 'Description must be less than 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const getFieldError = (fieldName, errors) => {
  return errors[fieldName] || '';
};

export const hasFieldError = (fieldName, errors) => {
  return Boolean(errors[fieldName]);
};