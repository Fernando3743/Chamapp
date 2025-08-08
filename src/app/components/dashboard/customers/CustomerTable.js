"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BulkActions from "./BulkActions";

/**
 * CustomerTable component - Handles the table view of customers
 * Extracted from customers page for better component organization
 */
export default function CustomerTable({
  filteredCustomers,
  selectedCustomers,
  toggleCustomerSelection,
  toggleAllCustomers,
  getStatusColor,
  t,
}) {
  const router = useRouter();
  const [openActionMenu, setOpenActionMenu] = useState(null);

  return (
    <div className="glass border border-white/20 rounded-2xl overflow-hidden">
      <BulkActions selectedCustomers={selectedCustomers} t={t} />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="w-12 p-4">
                <input
                  type="checkbox"
                  checked={selectedCustomers.length === filteredCustomers.length}
                  onChange={toggleAllCustomers}
                  className="w-5 h-5 bg-white/5 border-2 border-white/20 rounded cursor-pointer"
                />
              </th>
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("customer")}
              </th>
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("status")}
              </th>
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("orders")}
              </th>
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("totalSpent")}
              </th>
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("lastVisit")}
              </th>
              <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-white/60">
                {t("rating")}
              </th>
              <th className="w-12 p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.includes(customer.id)}
                    onChange={() => toggleCustomerSelection(customer.id)}
                    className="w-5 h-5 bg-white/5 border-2 border-white/20 rounded cursor-pointer"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-sm">
                      {customer.initials}
                    </div>
                    <div>
                      <div className="font-semibold">{customer.name}</div>
                      <div className="text-sm text-white/80">
                        {customer.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                      customer.status
                    )}`}
                  >
                    {t(customer.status)}
                  </span>
                </td>
                <td className="p-4">{customer.orders}</td>
                <td className="p-4">${customer.totalSpent.toLocaleString()}</td>
                <td className="p-4">{customer.lastVisit}</td>
                <td className="p-4">
                  <div className="flex gap-0.5 text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <span key={i}>
                        {i < customer.rating ? "⭐" : "☆"}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-4 relative">
                  <button
                    onClick={() =>
                      setOpenActionMenu(
                        openActionMenu === customer.id ? null : customer.id
                      )
                    }
                    className="w-9 h-9 flex items-center justify-center bg-white/5 border border-white/20 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/10"
                  >
                    ⋮
                  </button>
                  
                  {/* Action Menu Dropdown */}
                  {openActionMenu === customer.id && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl overflow-hidden z-10">
                      <button 
                        onClick={() => router.push(`/dashboard/customers/${customer.id}`)}
                        className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <span className="mr-2">👁️</span> {t("viewDetails")}
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <span className="mr-2">✏️</span> {t("edit")}
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <span className="mr-2">💬</span> {t("sendMessage")}
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <span className="mr-2">📋</span> {t("viewOrders")}
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <span className="mr-2">📝</span> {t("addNote")}
                      </button>
                      <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
                        <span className="mr-2">⭐</span> {t("markAsVIP")}
                      </button>
                      <div className="border-t border-white/10"></div>
                      <button className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300">
                        <span className="mr-2">🗑️</span> {t("removeCustomer")}
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-6 border-t border-white/10 flex justify-between items-center">
        <div className="text-sm text-white/80">
          {t("showing")} 1-{filteredCustomers.length} {t("of")} 3,247{" "}
          {t("customers").toLowerCase()}
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:bg-white/10">
            ←
          </button>
          <button className="px-4 py-2 bg-indigo-500/20 border border-indigo-500/50 rounded-lg text-white text-sm">
            1
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:bg-white/10">
            2
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:bg-white/10">
            3
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:bg-white/10">
            ...
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:bg-white/10">
            325
          </button>
          <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-sm transition-all duration-300 hover:bg-white/10">
            →
          </button>
        </div>
      </div>
    </div>
  );
}