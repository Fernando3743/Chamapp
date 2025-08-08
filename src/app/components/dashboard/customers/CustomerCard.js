"use client";

import { useRouter } from "next/navigation";

/**
 * CustomerCard component - Individual customer card for grid view
 * Extracted from customers page for better component organization
 */
export default function CustomerCard({ customer, getStatusColor, t }) {
  const router = useRouter();

  return (
    <div className="glass border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20">
      <div className="flex items-start justify-between mb-4">
        <div className="w-14 h-14 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-lg">
          {customer.initials}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
            customer.status
          )}`}
        >
          {t(customer.status)}
        </span>
      </div>
      <h3 className="font-semibold text-lg mb-1">{customer.name}</h3>
      <p className="text-sm text-white/80 mb-4">{customer.email}</p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-white/60">{t("orders")}:</span>
          <span>{customer.orders}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">{t("totalSpent")}:</span>
          <span>${customer.totalSpent.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">{t("lastVisit")}:</span>
          <span>{customer.lastVisit}</span>
        </div>
      </div>
      <div className="flex gap-0.5 text-yellow-400 mt-3">
        {[...Array(5)].map((_, i) => (
          <span key={i}>{i < customer.rating ? "⭐" : "☆"}</span>
        ))}
      </div>
      <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
        <button 
          onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
          className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs transition-all duration-300 hover:bg-white/10">
          {t("viewDetails")}
        </button>
        <button className="flex-1 px-3 py-2 bg-primary-gradient rounded-lg text-white text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
          {t("sendMessage")}
        </button>
      </div>
    </div>
  );
}