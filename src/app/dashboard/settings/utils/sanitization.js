/**
 * Sanitization utilities for user input
 */

/**
 * Sanitize text input to prevent XSS attacks
 * @param {string} input - Raw input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  
  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Escape special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  return sanitized;
}

/**
 * Sanitize phone number input
 * @param {string} phone - Raw phone input
 * @returns {string} Sanitized phone number
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  
  // Keep only digits, spaces, parentheses, hyphens, and plus sign
  return phone.replace(/[^\d\s\-\(\)\+]/g, '');
}

/**
 * Sanitize URL input
 * @param {string} url - Raw URL input
 * @returns {string} Sanitized URL
 */
export function sanitizeUrl(url) {
  if (typeof url !== 'string') return '';
  
  try {
    const urlObj = new URL(url);
    // Only allow http and https protocols
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return urlObj.toString();
    }
  } catch {
    // If not a valid URL, return empty string
    return '';
  }
  
  return '';
}

/**
 * Sanitize email input
 * @param {string} email - Raw email input
 * @returns {string} Sanitized email
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  
  // Basic email sanitization - remove spaces and convert to lowercase
  return email.trim().toLowerCase();
}

/**
 * Sanitize numeric input
 * @param {string} input - Raw numeric input
 * @returns {string} Sanitized numeric string
 */
export function sanitizeNumeric(input) {
  if (typeof input !== 'string') return '';
  
  // Keep only digits and decimal point
  return input.replace(/[^\d.]/g, '');
}