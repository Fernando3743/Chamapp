"use client";

/**
 * SearchFilters component - Handles search input and filter controls
 * Extracted from customers page for better component organization
 */
export default function SearchFilters({
  searchQuery,
  setSearchQuery,
  showFilterModal,
  setShowFilterModal,
  t,
}) {
  return (
    <div className="flex gap-4 items-center flex-wrap">
      <div className="flex-1 min-w-[300px] relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full py-3 pl-12 pr-5 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 transition-all duration-300 focus:outline-none focus:bg-white/10 focus:border-indigo-500/50"
          placeholder={t("searchPlaceholder")}
        />
      </div>
      <button
        onClick={() => setShowFilterModal(!showFilterModal)}
        className="px-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white transition-all duration-300 flex items-center gap-2 hover:bg-white/10"
      >
        <span>⚙️</span> {t("filters")}
        <span className="bg-primary-gradient text-white text-xs px-2 py-0.5 rounded-full font-semibold">
          3
        </span>
      </button>
    </div>
  );
}