"use client";

/**
 * BulkActions component - Handles bulk action controls when customers are selected
 * Extracted from customers page for better component organization
 */
export default function BulkActions({ selectedCustomers, t }) {
  if (selectedCustomers.length === 0) {
    return null;
  }

  return (
    <div className="p-6 border-b border-white/10 flex justify-between items-center">
      <div className="text-sm text-white/80">
        {selectedCustomers.length} selected
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs transition-all duration-300 hover:bg-white/10">
          📧 {t("sendEmail")}
        </button>
        <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs transition-all duration-300 hover:bg-white/10">
          🏷️ {t("addTags")}
        </button>
        <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs transition-all duration-300 hover:bg-white/10">
          🗑️ {t("delete")}
        </button>
      </div>
    </div>
  );
}