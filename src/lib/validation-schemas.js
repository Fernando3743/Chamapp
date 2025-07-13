// Shared validation schemas for both client and server
export const userRegistrationSchema = {
  firstName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/
  },
  lastName: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-ZÀ-ÿ\s]+$/
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    maxLength: 255
  },
  password: {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/ // At least 1 lowercase, 1 uppercase, 1 number
  },
  phone: {
    required: false,
    pattern: /^\+?[\d\s\-\(\)]{10,}$/,
    maxLength: 20
  },
  dateOfBirth: {
    required: false,
    pattern: /^\d{4}-\d{2}-\d{2}$/
  }
};

export const validateUserRegistration = (data) => {
  const errors = {};

  // Validate each field according to schema
  Object.keys(userRegistrationSchema).forEach(field => {
    const rules = userRegistrationSchema[field];
    const value = data[field];

    // Required field validation
    if (rules.required && (!value || value.trim().length === 0)) {
      errors[field] = `${field} is required`;
      return;
    }

    // Skip further validation if field is empty and not required
    if (!value && !rules.required) return;

    // Min length validation
    if (rules.minLength && value.length < rules.minLength) {
      errors[field] = `${field} must be at least ${rules.minLength} characters`;
    }

    // Max length validation
    if (rules.maxLength && value.length > rules.maxLength) {
      errors[field] = `${field} must not exceed ${rules.maxLength} characters`;
    }

    // Pattern validation
    if (rules.pattern && !rules.pattern.test(value)) {
      errors[field] = `${field} format is invalid`;
    }
  });

  // Password confirmation
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Sanitize input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .slice(0, 1000); // Limit length
};