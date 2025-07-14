// Input sanitization utilities to prevent XSS and injection attacks

// HTML entities that should be escaped
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
};

// Escape HTML entities to prevent XSS
export function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char]);
}

// Sanitize user input for display
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input;
  
  // Remove any script tags and their content
  let sanitized = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove any on* event handlers
  sanitized = sanitized.replace(/\son\w+\s*=\s*"[^"]*"/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*'[^']*'/gi, '');
  sanitized = sanitized.replace(/\son\w+\s*=\s*[^\s>]*/gi, '');
  
  // Remove javascript: protocol
  sanitized = sanitized.replace(/javascript:/gi, '');
  
  // Escape HTML entities
  return escapeHtml(sanitized);
}

// Validate and sanitize email
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  
  // Convert to lowercase and trim
  email = email.toLowerCase().trim();
  
  // Remove any potentially dangerous characters first
  email = email.replace(/[<>"']/g, '');
  
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '';
  }
  
  return email;
}

// Sanitize phone number
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  
  // Remove all non-numeric characters except + and -
  return phone.replace(/[^0-9+\-\s()]/g, '');
}

// Sanitize name fields (first name, last name, etc.)
export function sanitizeName(name) {
  if (typeof name !== 'string') return '';
  
  // Trim whitespace
  name = name.trim();
  
  // Remove any HTML tags
  name = name.replace(/<[^>]*>/g, '');
  
  // Allow only letters, spaces, hyphens, and apostrophes
  name = name.replace(/[^a-zA-Z\s\-']/g, '');
  
  // Limit length to prevent overflow
  return name.slice(0, 100);
}

// Sanitize generic text input
export function sanitizeText(text, maxLength = 1000) {
  if (typeof text !== 'string') return '';
  
  // Trim whitespace
  text = text.trim();
  
  // Remove null bytes
  text = text.replace(/\0/g, '');
  
  // Limit length
  text = text.slice(0, maxLength);
  
  // Escape HTML entities
  return escapeHtml(text);
}

// Sanitize URL
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    
    return parsed.toString();
  } catch {
    return '';
  }
}

// Sanitize object recursively
export function sanitizeObject(obj, sanitizers = {}) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const sanitized = Array.isArray(obj) ? [] : {};
  
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      
      // Apply specific sanitizer if available
      if (sanitizers[key]) {
        sanitized[key] = sanitizers[key](value);
      } else if (typeof value === 'string') {
        sanitized[key] = sanitizeText(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = sanitizeObject(value, sanitizers);
      } else {
        sanitized[key] = value;
      }
    }
  }
  
  return sanitized;
}

// Create a sanitizer for specific form data
export function createFormSanitizer(fieldSanitizers) {
  return (formData) => {
    const sanitized = {};
    
    for (const field in formData) {
      if (formData.hasOwnProperty(field)) {
        const sanitizer = fieldSanitizers[field] || sanitizeText;
        sanitized[field] = sanitizer(formData[field]);
      }
    }
    
    return sanitized;
  };
}

// Common form sanitizers
export const authFormSanitizer = createFormSanitizer({
  email: sanitizeEmail,
  password: (pwd) => pwd, // Don't modify passwords
  firstName: sanitizeName,
  lastName: sanitizeName,
  phone: sanitizePhone,
});

export const profileFormSanitizer = createFormSanitizer({
  firstName: sanitizeName,
  lastName: sanitizeName,
  phone: sanitizePhone,
  bio: (text) => sanitizeText(text, 500),
  website: sanitizeUrl,
});