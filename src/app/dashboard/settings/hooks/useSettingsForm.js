"use client";

import { useState, useCallback, useEffect } from "react";
import { useCSRFToken } from "./useCSRFToken";

/**
 * Custom hook for managing settings form state
 * 
 * @param {Object} options
 * @param {Object} options.initialValues - Initial form values
 * @param {Function} options.validate - Validation function
 * @param {Function} options.onSubmit - Submit handler
 * @param {boolean} options.enableCSRF - Whether to use CSRF token
 * @returns {Object} Form state and handlers
 */
export function useSettingsForm({
  initialValues = {},
  validate,
  onSubmit,
  enableCSRF = true
}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  const { csrfToken } = useCSRFToken();
  const effectiveCSRFToken = enableCSRF ? csrfToken : null;

  // Check if form has been modified
  useEffect(() => {
    const hasChanges = Object.keys(values).some(
      key => values[key] !== initialValues[key]
    );
    setIsDirty(hasChanges);
  }, [values, initialValues]);

  // Handle field change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle field blur
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    
    // Validate single field on blur
    if (validate) {
      const result = validate({ [name]: values[name] });
      if (result.errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: result.errors[name]
        }));
      }
    }
  }, [values, validate]);

  // Validate all fields
  const validateForm = useCallback(() => {
    if (!validate) return true;
    
    const result = validate(values);
    setErrors(result.errors || {});
    return result.isValid;
  }, [values, validate]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e) e.preventDefault();
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add CSRF token to submission if enabled
      const submitData = enableCSRF ? {
        ...values,
        _csrf: effectiveCSRFToken
      } : values;
      
      await onSubmit(submitData);
      
      // Reset dirty state after successful submission
      setIsDirty(false);
    } catch (error) {
      console.error('Form submission error:', error);
      // Handle submission error
      setErrors({
        submit: error.message || 'An error occurred while saving'
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validateForm, onSubmit, effectiveCSRFToken, enableCSRF]);

  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsDirty(false);
  }, [initialValues]);

  // Set field value programmatically
  const setFieldValue = useCallback((name, value) => {
    handleChange(name, value);
  }, [handleChange]);

  // Set field error programmatically
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, []);

  // Get field props for input components
  const getFieldProps = useCallback((name) => ({
    name,
    id: name,
    value: values[name] || '',
    onChange: (e) => handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
    error: touched[name] ? errors[name] : undefined
  }), [values, errors, touched, handleChange, handleBlur]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isDirty,
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setFieldValue,
    setFieldError,
    getFieldProps,
    validateForm
  };
}