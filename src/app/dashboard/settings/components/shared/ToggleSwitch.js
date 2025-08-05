"use client";

import { memo, useCallback } from "react";

/**
 * ToggleSwitch - A reusable toggle switch component with accessibility support
 * 
 * @param {Object} props
 * @param {boolean} props.checked - Whether the toggle is checked
 * @param {Function} props.onChange - Callback when toggle state changes
 * @param {string} props.label - Label for the toggle
 * @param {string} props.description - Optional description text
 * @param {boolean} props.disabled - Whether the toggle is disabled
 * @param {string} props.name - Name attribute for the input
 * @param {string} props.id - ID for the toggle
 * @param {string} props.ariaLabel - Accessibility label
 */
const ToggleSwitch = memo(({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
  name,
  id,
  ariaLabel
}) => {
  const handleChange = useCallback((e) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  }, [disabled, onChange]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChange({ target: { checked: !checked } });
    }
  }, [checked, handleChange]);

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-4 gap-4">
      <div className="flex-1">
        <label htmlFor={id} className="text-sm font-medium cursor-pointer">
          {label}
        </label>
        {description && (
          <p className="text-xs text-text-secondary mt-1">{description}</p>
        )}
      </div>
      <div
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel || label}
        tabIndex={disabled ? -1 : 0}
        className={`
          relative w-12 h-6 rounded-full cursor-pointer transition-all duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${checked ? 'bg-primary-gradient' : 'bg-white/20'}
        `}
        onClick={() => !disabled && handleChange({ target: { checked: !checked } })}
        onKeyDown={handleKeyDown}
      >
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="sr-only"
          aria-label={ariaLabel || label}
        />
        <div
          className={`
            absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300
            ${checked ? 'left-6' : 'left-0.5'}
          `}
        />
      </div>
    </div>
  );
});

ToggleSwitch.displayName = 'ToggleSwitch';

export default ToggleSwitch;