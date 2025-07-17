"use client";

import { useState, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { analyticsTranslations } from "@/lib/translations/pages/analytics";

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="glass border border-white/20 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-sm text-white/80 uppercase tracking-wider mb-2">
                  {kpi.title}
                </div>
                <div className="text-4xl font-bold gradient-text">{kpi.value}</div>
              </div>
              <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center text-xl">
                {kpi.icon}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                  kpi.trend === "up"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                }`}
              >
                <span>{kpi.trend === "up" ? "↑" : "↓"}</span> {kpi.change}
              </span>
              <span className="text-sm text-white/80">{t("vsLastPeriod")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart & Breakdown */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-8">
        {/* Revenue Trend Chart */}
        <div className="xl:col-span-2 glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-semibold">{t("revenueTrend")}</h3>
              <p className="text-sm text-white/80 mt-1">{t("dailyRevenue")}</p>
            </div>
            <div className="flex gap-2">
              {metrics.map((metric) => (
                <button
                  key={metric.key}
                  onClick={() => setSelectedMetric(metric.key)}
                  className={`px-3 py-1 rounded-lg text-xs transition-all duration-300 ${
                    selectedMetric === metric.key
                      ? "bg-indigo-500/20 border border-indigo-500/50"
                      : "bg-white/5 border border-white/10 hover:bg-white/10"
                  }`}
                >
                  {metric.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Simple Bar Chart */}
          <div className="h-[350px] relative mb-5">
            <div className="absolute left-0 top-0 bottom-10 w-12 flex flex-col justify-between text-xs text-white/80 text-right pr-2">
              <span>$25k</span>
              <span>$20k</span>
              <span>$15k</span>
              <span>$10k</span>
              <span>$5k</span>
              <span>$0</span>
            </div>
            <div className="ml-14 h-[calc(100%-40px)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 bottom-0">
                {[20, 40, 60, 80].map((percent) => (
                  <div
                    key={percent}
                    className="absolute left-0 right-0 h-px bg-white/5"
                    style={{ bottom: `${percent}%` }}
                  />
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-full flex gap-2 items-end p-2">
                {chartData.map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-primary-gradient rounded-t-lg relative cursor-pointer transition-all duration-300 opacity-80 hover:opacity-100"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="ml-14 h-10 flex items-center text-xs text-white/80 p-2">
              {chartDays.map((day, index) => (
                <span key={index} className="flex-1 text-center">
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold">{t("revenueBySource")}</h3>
          </div>
          
          {/* Simple Donut Chart Placeholder */}
          <div className="w-[200px] h-[200px] mx-auto mb-5 relative">
            <div className="absolute inset-0 rounded-full border-[20px] border-white/10"></div>
            <div className="absolute inset-0 rounded-full border-[20px] border-transparent"
                 style={{
                   borderTopColor: "#667eea",
                   borderRightColor: "#764ba2",
                   borderBottomColor: "#f093fb",
                   borderLeftColor: "#4facfe",
                   transform: "rotate(-90deg)"
                 }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold">$148k</div>
              <div className="text-sm text-white/80">{t("total")}</div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            {revenueBySource.map((source, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-white/5 rounded-lg cursor-pointer transition-all duration-300 hover:bg-white/8"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: source.color }}
                  />
                  <span className="text-sm">{source.name}</span>
                </div>
                <span className="font-semibold">
                  ${(source.value / 1000).toFixed(1)}k
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top Products */}
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">{t("topProducts")}</h3>
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md transition-all duration-300 hover:bg-white/10">
              ⋮
            </div>
          </div>
          <div className="space-y-5">
            {topProducts.map((product, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{product.name}</span>
                  <span className="text-sm font-semibold">{product.revenue}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-gradient rounded-full transition-all duration-500"
                    style={{ width: `${product.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Segments */}
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">{t("customerSegments")}</h3>
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md transition-all duration-300 hover:bg-white/10">
              ⋮
            </div>
          </div>
          <div className="space-y-5">
            {customerSegments.map((segment, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{segment.name}</span>
                  <span className="text-sm font-semibold">{segment.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-gradient rounded-full transition-all duration-500"
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marketing Channels */}
        <div className="glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-semibold">{t("marketingChannels")}</h3>
            <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-md transition-all duration-300 hover:bg-white/10">
              ⋮
            </div>
          </div>
          <div className="space-y-5">
            {marketingChannels.map((channel, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">{channel.name}</span>
                  <span className="text-sm font-semibold">{channel.percentage}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-gradient rounded-full transition-all duration-500"
                    style={{ width: `${channel.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}