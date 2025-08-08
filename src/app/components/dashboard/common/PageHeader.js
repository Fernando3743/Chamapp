"use client";

import { useState } from "react";

/**
 * Reusable PageHeader component for dashboard pages
 * Includes greeting, performance info, action buttons, and period filter
 */
export default function PageHeader({
  greeting,
  userName,
  performanceText,
  primaryButtonText,
  primaryButtonIcon = "+",
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonIcon = "📊",
  secondaryButtonAction,
  periods = [],
  selectedPeriod,
  onPeriodChange,
  showPeriodFilter = true,
  className = "",
}) {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-5">
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2">
            {greeting}, {userName}! ☀️
          </h1>
          {performanceText && (
            <p className="text-white/70">{performanceText}</p>
          )}
        </div>
        
        {(primaryButtonText || secondaryButtonText) && (
          <div className="flex gap-4 w-full lg:w-auto">
            {primaryButtonText && (
              <button
                onClick={primaryButtonAction}
                className="flex-1 lg:flex-none px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
              >
                <span>{primaryButtonIcon}</span> {primaryButtonText}
              </button>
            )}
            {secondaryButtonText && (
              <button
                onClick={secondaryButtonAction}
                className="flex-1 lg:flex-none px-6 py-3 glass-darker border border-white/20 rounded-xl text-white font-semibold hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span>{secondaryButtonIcon}</span> {secondaryButtonText}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Period Filter */}
      {showPeriodFilter && periods.length > 0 && (
        <div className="flex gap-2 glass border border-white/20 rounded-xl p-1 w-fit">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => onPeriodChange(period.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === period.key
                  ? "bg-indigo-500/20 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}