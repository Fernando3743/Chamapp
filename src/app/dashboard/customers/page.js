"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { customersTranslations } from "@/lib/translations/pages/customers";

export default function CustomersPage() {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      customersTranslations[key]?.[language] ||
      customersTranslations[key]?.en ||
      key,
    [language]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [viewMode, setViewMode] = useState("table"); // table or grid
  const [openActionMenu, setOpenActionMenu] = useState(null);

  // Mock customer data
  const customersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@email.com",
      status: "active",
      orders: 42,
      totalSpent: 3842,
      lastVisit: "2 days ago",
      rating: 5,
      initials: "JD",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      status: "active",
      orders: 28,
      totalSpent: 2156,
      lastVisit: "1 week ago",
      rating: 4,
      initials: "SJ",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@company.com",
      status: "inactive",
      orders: 15,
      totalSpent: 987,
      lastVisit: "2 months ago",
      rating: 5,
      initials: "MC",
    },
    {
      id: 4,
      name: "Emma Davis",
      email: "emma.davis@email.com",
      status: "pending",
      orders: 8,
      totalSpent: 542,
      lastVisit: "1 week ago",
      rating: 3,
      initials: "ED",
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      status: "vip",
      orders: 156,
      totalSpent: 12847,
      lastVisit: "yesterday",
      rating: 5,
      initials: "AR",
    },
    {
      id: 6,
      name: "Lisa Wang",
      email: "lisa.wang@email.com",
      status: "active",
      orders: 67,
      totalSpent: 5423,
      lastVisit: "today",
      rating: 5,
      initials: "LW",
    },
  ];

  // Customer stats
  const stats = [
    {
      icon: "👥",
      value: "3,247",
      label: t("totalCustomers"),
      change: "↑ 12%",
      changeText: t("fromLastMonth"),
      positive: true,
    },
    {
      icon: "✨",
      value: "248",
      label: t("newThisMonth"),
      change: "↑ 8%",
      changeText: t("growthRate"),
      positive: true,
    },
    {
      icon: "💎",
      value: "89%",
      label: t("retentionRate"),
      change: "↑ 3%",
      changeText: t("improvement"),
      positive: true,
    },
    {
      icon: "💰",
      value: "$284",
      label: t("avgCustomerValue"),
      change: "↑ $24",
      changeText: t("increase"),
      positive: true,
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/30";
      case "inactive":
        return "bg-red-500/10 text-red-400 border-red-500/30";
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border-yellow-500/30";
      case "vip":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/30";
    }
  };

  const toggleCustomerSelection = (customerId) => {
    setSelectedCustomers((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId]
    );
  };

  const toggleAllCustomers = () => {
    if (selectedCustomers.length === customersData.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(customersData.map((c) => c.id));
    }
  };

  const filteredCustomers = customersData.filter((customer) =>
    searchQuery
      ? customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  return (
    <main className="p-8">
      {/* Page Header */}
      <div className="glass border border-white/20 rounded-2xl p-8 mb-8">
        <div className="flex justify-between items-center mb-6 flex-wrap gap-5">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t("customers")}</h1>
            <p className="text-white/80">{t("manageCustomers")}</p>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2 hover:bg-white/15">
              <span>📥</span> {t("import")}
            </button>
            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2 hover:bg-white/15">
              <span>📤</span> {t("export")}
            </button>
            <button className="px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
              <span>+</span> {t("addCustomer")}
            </button>
          </div>
        </div>

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
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass border border-white/20 rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="w-15 h-15 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-3xl">
              {stat.icon}
            </div>
            <div className="flex-1">
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-white/80">{stat.label}</div>
              <div className="text-xs font-semibold mt-1 text-green-400">
                {stat.change} {stat.changeText}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customers Table */}
      {viewMode === "table" && (
        <div className="glass border border-white/20 rounded-2xl overflow-hidden">
          {selectedCustomers.length > 0 && (
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
          )}

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="w-12 p-4">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.length === customersData.length}
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
                          <button className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300">
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
      )}

      {/* Grid View (Alternative view) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="glass border border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
            >
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
                <button className="flex-1 px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white text-xs transition-all duration-300 hover:bg-white/10">
                  {t("viewDetails")}
                </button>
                <button className="flex-1 px-3 py-2 bg-primary-gradient rounded-lg text-white text-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
                  {t("sendMessage")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}