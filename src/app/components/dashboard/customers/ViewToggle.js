"use client";

/**
 * ViewToggle component - Handles switching between table and grid views
 * Extracted from customers page for better component organization
 */
export default function ViewToggle({ viewMode, setViewMode }) {
  return (
    <div className="flex gap-1 bg-white/5 p-1 rounded-lg">
      <button
        onClick={() => setViewMode("table")}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
          viewMode === "table"
            ? "bg-indigo-500/20 text-white"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        ☰
      </button>
      <button
        onClick={() => setViewMode("grid")}
        className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 ${
          viewMode === "grid"
            ? "bg-indigo-500/20 text-white"
            : "text-white/60 hover:text-white hover:bg-white/10"
        }`}
      >
        ⊞
      </button>
    </div>
  );
}