"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { customersTranslations } from "@/lib/translations/pages/customers";
import StatsCard from "@/app/components/dashboard/common/StatsCard";
import SearchFilters from "@/app/components/dashboard/customers/SearchFilters";
import ViewToggle from "@/app/components/dashboard/customers/ViewToggle";
import CustomerTable from "@/app/components/dashboard/customers/CustomerTable";
import CustomerCard from "@/app/components/dashboard/customers/CustomerCard";

export default function CustomersPage() {
  const router = useRouter();
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
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((c) => c.id));
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
          <SearchFilters 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            showFilterModal={showFilterModal}
            setShowFilterModal={setShowFilterModal}
            t={t}
          />
          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeLabel={stat.changeText}
            trend={stat.positive ? "up" : "down"}
            variant="horizontal"
            iconBgColor="indigo-500/10"
          />
        ))}
      </div>

      {/* Customers Table */}
      {viewMode === "table" && (
        <CustomerTable
          filteredCustomers={filteredCustomers}
          selectedCustomers={selectedCustomers}
          toggleCustomerSelection={toggleCustomerSelection}
          toggleAllCustomers={toggleAllCustomers}
          getStatusColor={getStatusColor}
          t={t}
        />
      )}

      {/* Grid View (Alternative view) */}
      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              getStatusColor={getStatusColor}
              t={t}
            />
          ))}
        </div>
      )}
    </main>
  );
}