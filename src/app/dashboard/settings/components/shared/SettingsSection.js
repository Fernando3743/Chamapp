"use client";

import { memo } from "react";

/**
 * SettingsSection - A reusable settings section wrapper component
 * 
 * @param {Object} props
 * @param {string} props.title - Section title
 * @param {string} props.description - Section description
 * @param {React.ReactNode} props.children - Section content
 * @param {React.ReactNode} props.actions - Optional action buttons
 * @param {string} props.className - Additional CSS classes
 */
const SettingsSection = memo(({
  title,
  description,
  children,
  actions,
  className = ""
}) => {
  return (
    <div 
      className={`
        bg-glass-gradient backdrop-blur-glass 
        border border-[rgba(255,255,255,0.2)] 
        rounded-xl p-8
        ${className}
      `}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{title}</h2>
          {description && (
            <p className="text-sm text-text-secondary mt-1">{description}</p>
          )}
        </div>
        {actions && (
          <div className="flex gap-3">
            {actions}
          </div>
        )}
      </div>
      
      {children}
    </div>
  );
});

SettingsSection.displayName = 'SettingsSection';

export default SettingsSection;