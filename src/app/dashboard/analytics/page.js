"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { analyticsTranslations } from "@/lib/translations/pages/analytics";
import { 
  KPICard, 
  RevenueChart, 
  RevenueDonutChart, 
  PerformanceMetrics 
} from "@/app/components/dashboard/analytics";

export default function AnalyticsPage() {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      analyticsTranslations[key]?.[language] ||
      analyticsTranslations[key]?.en ||
      key,
    [language]
  );

  const [selectedPeriod, setSelectedPeriod] = useState("last7Days");
  const [selectedMetric, setSelectedMetric] = useState("revenue");

  const dateRanges = [
    { key: "today", label: t("today") },
    { key: "yesterday", label: t("yesterday") },
    { key: "last7Days", label: t("last7Days") },
    { key: "last30Days", label: t("last30Days") },
    { key: "last90Days", label: t("last90Days") },
  ];

  const metrics = [
    { key: "revenue", label: t("revenue") },
    { key: "orders", label: t("orders") },
    { key: "customers", label: t("customers") },
  ];

  // Mock data for KPIs
  const kpiData = [
    {
      title: t("totalRevenue"),
      value: "$148,235",
      change: "+22.4%",
      trend: "up",
      icon: "💰",
    },
    {
      title: t("totalOrders"),
      value: "1,847",
      change: "+15.3%",
      trend: "up",
      icon: "📦",
    },
    {
      title: t("conversionRate"),
      value: "3.82%",
      change: "+0.45%",
      trend: "up",
      icon: "🎯",
    },
    {
      title: t("avgOrderValue"),
      value: "$80.25",
      change: "-3.2%",
      trend: "down",
      icon: "💎",
    },
  ];

  // Mock data for revenue by source
  const revenueBySource = [
    { name: t("directSales"), value: 59300, percentage: 40, color: "#667eea" },
    { name: t("onlineStore"), value: 44500, percentage: 30, color: "#764ba2" },
    { name: t("marketplace"), value: 29600, percentage: 20, color: "#f093fb" },
    { name: t("other"), value: 14800, percentage: 10, color: "#4facfe" },
  ];

  // Mock data for top products
  const topProducts = [
    { name: t("premiumPackage"), revenue: "$42.5k", percentage: 85 },
    { name: t("standardService"), revenue: "$31.2k", percentage: 62 },
    { name: t("basicPlan"), revenue: "$28.7k", percentage: 57 },
    { name: t("addonFeatures"), revenue: "$18.3k", percentage: 36 },
  ];

  // Mock data for customer segments
  const customerSegments = [
    { name: t("newCustomers"), percentage: 32 },
    { name: t("returningCustomers"), percentage: 45 },
    { name: t("vipCustomers"), percentage: 18 },
    { name: t("atRisk"), percentage: 5 },
  ];

  // Mock data for marketing channels
  const marketingChannels = [
    { name: t("socialMedia"), percentage: 38 },
    { name: t("emailMarketing"), percentage: 28 },
    { name: t("organic"), percentage: 22 },
    { name: t("paidAds"), percentage: 12 },
  ];

  // Mock chart data
  const chartData = [65, 78, 52, 88, 92, 75, 70];
  const chartDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <main className="p-8">
      {/* Page Header */}
      <div className="glass border border-white/20 rounded-2xl p-8 mb-8">
        <div className="flex justify-between items-center flex-wrap gap-5">
          <div>
            <h1 className="text-4xl mb-2 font-bold">{t("analyticsInsights")}</h1>
            <p className="text-white/80 text-base">{t("trackPerformance")}</p>
          </div>
          <div className="flex gap-4 items-center flex-wrap">
            {/* Date Range Selector */}
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/20">
              {dateRanges.map((range) => (
                <button
                  key={range.key}
                  onClick={() => setSelectedPeriod(range.key)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    selectedPeriod === range.key
                      ? "text-white bg-indigo-500/20"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <button className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-sm flex items-center gap-2 hover:bg-white/10 transition-all duration-300">
              <span>📅</span> {t("customRange")}
            </button>
            <button className="px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 text-sm flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30">
              <span>📊</span> {t("exportReport")}
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <KPICard kpiData={kpiData} />

      {/* Revenue Chart & Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
        <RevenueChart 
          selectedMetric={selectedMetric}
          setSelectedMetric={setSelectedMetric}
          metrics={metrics}
          chartData={chartData}
          chartDays={chartDays}
        />
        <RevenueDonutChart revenueBySource={revenueBySource} />
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics 
        topProducts={topProducts}
        customerSegments={customerSegments}
        marketingChannels={marketingChannels}
      />
    </main>
  );
}