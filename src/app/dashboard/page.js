"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSupabaseAuth } from "@/app/contexts/SupabaseAuthContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { dashboardTranslations } from "@/lib/translations/pages/dashboard";

export default function DashboardPage() {
  const { user } = useSupabaseAuth();
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      dashboardTranslations[key]?.[language] ||
      dashboardTranslations[key]?.en ||
      key,
    [language]
  );

  const [selectedPeriod, setSelectedPeriod] = useState("thisWeek");
  const [greeting, setGreeting] = useState("");

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t("goodMorning"));
    } else if (hour < 18) {
      setGreeting(t("goodAfternoon"));
    } else {
      setGreeting(t("goodEvening"));
    }
  }, [t]);

  const userName = user?.user_metadata?.firstName || user?.user_metadata?.first_name || "there";

  const stats = [
    {
      icon: "💰",
      label: t("totalRevenue"),
      value: "$124,563",
      change: "+14.5%",
      trend: "up",
      color: "primary",
    },
    {
      icon: "👥",
      label: t("newCustomers"),
      value: "1,234",
      change: "+23.1%",
      trend: "up",
      color: "green",
    },
    {
      icon: "📅",
      label: t("appointments"),
      value: "847",
      change: "+12.7%",
      trend: "up",
      color: "blue",
    },
    {
      icon: "📈",
      label: t("growthRate"),
      value: "23.5%",
      change: "+4.3%",
      trend: "up",
      color: "purple",
    },
  ];

  const periods = [
    { key: "today", label: t("today") },
    { key: "thisWeek", label: t("thisWeek") },
    { key: "thisMonth", label: t("thisMonth") },
    { key: "thisYear", label: t("thisYear") },
    { key: "custom", label: t("custom") },
  ];

  return (
    <main className="p-8">
      {/* Top Bar */}
      <div className="glass border border-white/20 rounded-2xl p-5 mb-8 flex flex-col lg:flex-row justify-between items-center gap-5">
        <div className="flex-1 max-w-lg relative w-full lg:w-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
            🔍
          </span>
          <input
            type="text"
            className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
            placeholder={t("searchPlaceholder")}
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 glass-darker border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-300 relative">
            <span>💬</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
              5
            </span>
          </div>
          <div className="w-10 h-10 glass-darker border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-300 relative">
            <span>🔔</span>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
              12
            </span>
          </div>
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-3 px-4 py-2 glass-darker border border-white/20 rounded-xl cursor-pointer hover:bg-white/8 transition-all duration-300"
          >
            <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="hidden sm:flex flex-col">
              <div className="text-sm font-semibold">{userName}</div>
              <div className="text-xs text-white/60">{t("businessOwner")}</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 mb-5">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {greeting}, {userName}! ☀️
            </h1>
            <p className="text-white/70">
              {t("businessPerformance")} 23% {t("betterThanLastMonth")}
            </p>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <button className="flex-1 lg:flex-none px-6 py-3 bg-primary-gradient rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-2">
              <span>+</span> {t("newAppointment")}
            </button>
            <button className="flex-1 lg:flex-none px-6 py-3 glass-darker border border-white/20 rounded-xl text-white font-semibold hover:bg-white/15 transition-all duration-300 flex items-center justify-center gap-2">
              <span>📊</span> {t("generateReport")}
            </button>
          </div>
        </div>

        {/* Period Filter */}
        <div className="flex gap-2 glass border border-white/20 rounded-xl p-1 w-fit">
          {periods.map((period) => (
            <button
              key={period.key}
              onClick={() => setSelectedPeriod(period.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedPeriod === period.key
                  ? "bg-indigo-500/20 text-white"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="glass border border-white/20 rounded-2xl p-6 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/20 group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex justify-between items-start mb-5">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-2xl">
                {stat.icon}
              </div>
              <div className="w-8 h-8 flex items-center justify-center cursor-pointer rounded-lg hover:bg-white/10 transition-colors duration-300">
                ⋮
              </div>
            </div>
            <div className="text-sm text-white/70 mb-2">{stat.label}</div>
            <div className="text-3xl font-bold mb-3">{stat.value}</div>
            <div className="flex items-center gap-2 text-sm">
              <span
                className={`flex items-center gap-1 font-semibold ${
                  stat.trend === "up" ? "text-green-400" : "text-red-400"
                }`}
              >
                {stat.trend === "up" ? "↑" : "↓"} {stat.change}
              </span>
              <span className="text-white/60">{t("vsLastPeriod")}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 glass border border-white/20 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-semibold">{t("upcomingAppointments")}</h2>
            <Link
              href="/dashboard/appointments"
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {t("viewAll")} →
            </Link>
          </div>
          {/* Appointment list would go here */}
          <div className="text-center py-12 text-white/60">
            <span className="text-4xl mb-4 block">📅</span>
            <p>No upcoming appointments</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-5">{t("quickActions")}</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 glass-darker border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
              <span>👥</span> Add New Customer
            </button>
            <button className="w-full px-4 py-3 glass-darker border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
              <span>📦</span> Add Product/Service
            </button>
            <button className="w-full px-4 py-3 glass-darker border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
              <span>📧</span> Send Campaign
            </button>
            <button className="w-full px-4 py-3 glass-darker border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-3">
              <span>💳</span> Process Payment
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}