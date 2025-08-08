"use client";

/**
 * Reusable StatsCard component for dashboard statistics
 * Follows the glassmorphism design system with consistent hover effects
 */
export default function StatsCard({
  icon,
  label,
  value,
  change,
  changeLabel,
  trend = "up", // "up" or "down"
  iconBgColor = "indigo-500/10",
  showMoreMenu = true,
  className = "",
  variant = "default", // "default" or "horizontal"
}) {
  const getTrendColor = () => {
    return trend === "up" ? "text-green-400" : "text-red-400";
  };

  const getTrendIcon = () => {
    return trend === "up" ? "↑" : "↓";
  };

  // Default vertical layout
  if (variant === "default") {
    return (
      <div
        className={`glass border border-white/20 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 group ${className}`}
      >
        {/* Hover gradient line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-primary-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Header section with icon and menu */}
        <div className="flex justify-between items-start mb-5">
          <div className={`w-12 h-12 bg-${iconBgColor} rounded-xl flex items-center justify-center text-2xl`}>
            {icon}
          </div>
          {showMoreMenu && (
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg hover:bg-white/10 transition-colors duration-300">
              ⋮
            </div>
          )}
        </div>
        
        {/* Content section */}
        <div className="text-sm text-white/70 mb-2">{label}</div>
        <div className="text-3xl font-bold mb-3">{value}</div>
        
        {/* Change indicator */}
        {change && (
          <div className="flex items-center gap-2 text-sm">
            <span className={`flex items-center gap-1 font-semibold ${getTrendColor()}`}>
              {getTrendIcon()} {change}
            </span>
            {changeLabel && (
              <span className="text-white/60">{changeLabel}</span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Horizontal layout (like customers page)
  if (variant === "horizontal") {
    return (
      <div
        className={`glass border border-white/20 rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 ${className}`}
      >
        <div className={`w-15 h-15 bg-${iconBgColor} rounded-2xl flex items-center justify-center text-3xl`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1">{value}</div>
          <div className="text-sm text-white/80">{label}</div>
          {change && (
            <div className={`text-xs font-semibold mt-1 ${getTrendColor()}`}>
              {getTrendIcon()} {change} {changeLabel && changeLabel}
            </div>
          )}
        </div>
      </div>
    );
  }

  return null;
}