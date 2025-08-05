"use client";

import { memo, forwardRef } from "react";

/**
 * Button - A reusable button component with variants and loading state
 * 
 * @param {Object} props
 * @param {string} props.variant - Button variant (primary, secondary, danger)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.fullWidth - Whether button should be full width
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {Function} props.onClick - Click handler
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.ariaLabel - Accessibility label
 */
const Button = memo(forwardRef(({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  children,
  className = "",
  ariaLabel,
  ...rest
}, ref) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl cursor-pointer transition-all duration-300";
  
  const variantClasses = {
    primary: "bg-primary-gradient border-0 text-white hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]",
    secondary: "bg-white/10 border border-[rgba(255,255,255,0.2)] text-white hover:bg-white/15",
    danger: "bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };
  
  const disabledClasses = "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none";
  const loadingClasses = "cursor-wait";
  const fullWidthClasses = fullWidth ? "w-full" : "";
  
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidthClasses}
    ${(disabled || loading) ? disabledClasses : ""}
    ${loading ? loadingClasses : ""}
    ${className}
  `.trim();

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-busy={loading}
      {...rest}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}));

Button.displayName = 'Button';

export default Button;