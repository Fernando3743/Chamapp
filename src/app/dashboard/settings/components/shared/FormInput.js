"use client";

import { memo, forwardRef } from "react";
import { sanitizeInput } from "../../utils/sanitization";

/**
 * FormInput - A reusable form input component with validation and sanitization
 * 
 * @param {Object} props
 * @param {string} props.label - Input label
 * @param {string} props.type - Input type (text, email, tel, password, etc.)
 * @param {string} props.name - Input name attribute
 * @param {string} props.id - Input ID
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onBlur - Blur handler
 * @param {string} props.placeholder - Input placeholder
 * @param {string} props.error - Error message
 * @param {string} props.hint - Hint text below input
 * @param {boolean} props.required - Whether input is required
 * @param {boolean} props.disabled - Whether input is disabled
 * @param {string} props.autoComplete - Autocomplete attribute
 * @param {Object} props.validation - Validation rules
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.sanitize - Whether to sanitize input (default: true)
 */
const FormInput = memo(forwardRef(({
  label,
  type = "text",
  name,
  id,
  value = "",
  onChange,
  onBlur,
  placeholder,
  error,
  hint,
  required = false,
  disabled = false,
  autoComplete,
  validation,
  className = "",
  sanitize = true,
  ...rest
}, ref) => {
  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Apply sanitization for text inputs
    if (sanitize && (type === "text" || type === "email")) {
      newValue = sanitizeInput(newValue);
    }
    
    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: newValue
        }
      });
    }
  };

  const inputClasses = `
    w-full px-4 py-3 bg-white/5 border rounded-xl text-white text-sm 
    transition-all duration-300 focus:outline-none focus:bg-white/8
    ${error ? 'border-red-400/50 focus:border-red-400' : 'border-[rgba(255,255,255,0.2)] focus:border-blue-400/50'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${className}
  `;

  return (
    <div className="form-group">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium mb-3"
        >
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      <input
        ref={ref}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        className={inputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...rest}
      />
      
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400 mt-2" role="alert">
          {error}
        </p>
      )}
      
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-text-secondary mt-2">
          {hint}
        </p>
      )}
    </div>
  );
}));

FormInput.displayName = 'FormInput';

export default FormInput;