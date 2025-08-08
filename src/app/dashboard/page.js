"use client";

import { useState, useEffect, useCallback } from "react";
import { useSupabaseAuth } from "@/app/contexts/SupabaseAuthContext";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { dashboardTranslations } from "@/lib/translations/pages/dashboard";
import StatsCard from "@/app/components/dashboard/common/StatsCard";
import PageHeader from "@/app/components/dashboard/common/PageHeader";
import TopBar from "@/app/components/dashboard/home/TopBar";
import QuickActions from "@/app/components/dashboard/home/QuickActions";
import AppointmentsPreview from "@/app/components/dashboard/home/AppointmentsPreview";

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
      <TopBar
        searchPlaceholder={t("searchPlaceholder")}
        userName={userName}
        userRole={t("businessOwner")}
        messagesCount={5}
        notificationsCount={12}
      />

      {/* Dashboard Header */}
      <PageHeader
        greeting={greeting}
        userName={userName}
        performanceText={`${t("businessPerformance")} 23% ${t("betterThanLastMonth")}`}
        primaryButtonText={t("newAppointment")}
        primaryButtonIcon="+"
        primaryButtonAction={() => console.log("New appointment")}
        secondaryButtonText={t("generateReport")}
        secondaryButtonIcon="📊"
        secondaryButtonAction={() => console.log("Generate report")}
        periods={periods}
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            changeLabel={t("vsLastPeriod")}
            trend={stat.trend}
            variant="default"
          />
        ))}
      </div>

      {/* Quick Actions & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Upcoming Appointments */}
        <AppointmentsPreview
          title={t("upcomingAppointments")}
          appointments={[]}
          viewAllText={t("viewAll")}
          viewAllLink="/dashboard/appointments"
          emptyStateText="No upcoming appointments"
        />

        {/* Quick Actions */}
        <QuickActions
          title={t("quickActions")}
          actions={[
            {
              icon: "👥",
              label: "Add New Customer",
              action: () => console.log("Add customer"),
            },
            {
              icon: "📦",
              label: "Add Product/Service",
              action: () => console.log("Add product"),
            },
            {
              icon: "📧",
              label: "Send Campaign",
              action: () => console.log("Send campaign"),
            },
            {
              icon: "💳",
              label: "Process Payment",
              action: () => console.log("Process payment"),
            },
          ]}
        />
      </div>
    </main>
  );
}