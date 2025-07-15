"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSupabaseAuth } from "../contexts/SupabaseAuthContext";
import AnimatedBackground from "../components/AnimatedBackground";
import SidebarNew from "../components/dashboard/SidebarNew";
import TopBarNew from "../components/dashboard/TopBarNew";
import OverviewPage from "../components/dashboard/OverviewPage";
import AnalyticsPage from "../components/dashboard/AnalyticsPage";
import AppointmentsPage from "../components/dashboard/AppointmentsPage";
import CustomersPage from "../components/dashboard/CustomersPage";
import ProductsPage from "../components/dashboard/ProductsPage";
import TransactionsPage from "../components/dashboard/TransactionsPage";
import SettingsPage from "../components/dashboard/SettingsPage";
import CustomerDetailsPage from "../components/dashboard/CustomerDetailsPage";
import StaffPage from "../components/dashboard/StaffPage";
import CalendarPage from "../components/dashboard/CalendarPage";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const router = useRouter();
  const [activePage, setActivePage] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (loading) return; // Still loading
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [isAuthenticated, loading, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case "overview":
        return <OverviewPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "customers":
        return selectedCustomer ? (
          <CustomerDetailsPage
            customerId={selectedCustomer.id}
            onBack={() => setSelectedCustomer(null)}
          />
        ) : (
          <CustomersPage
            onCustomerSelect={(customer) => setSelectedCustomer(customer)}
          />
        );
      case "appointments":
        return <AppointmentsPage />;
      case "calendar":
        return <CalendarPage />;
      case "products":
        return <ProductsPage />;
      case "transactions":
        return <TransactionsPage />;
      case "staff":
        return <StaffPage />;
      case "marketing":
        return (
          <div className={styles.dashboardPage}>Marketing Page (Coming Soon)</div>
        );
      case "email-campaigns":
        return (
          <div className={styles.dashboardPage}>
            Email Campaigns Page (Coming Soon)
          </div>
        );
      case "sms-marketing":
        return (
          <div className={styles.dashboardPage}>SMS Marketing Page (Coming Soon)</div>
        );
      case "reviews":
        return <div className={styles.dashboardPage}>Reviews Page (Coming Soon)</div>;
      case "reports":
        return <div className={styles.dashboardPage}>Reports Page (Coming Soon)</div>;
      case "settings":
        return <SettingsPage />;
      case "profile":
        router.push("/profile");
        return null;
      case "notifications":
        return (
          <div className={styles.dashboardPage}>Notifications Page (Coming Soon)</div>
        );
      case "billing":
        return <div className={styles.dashboardPage}>Billing Page (Coming Soon)</div>;
      case "security":
        return (
          <div className={styles.dashboardPage}>Security Page (Coming Soon)</div>
        );
      default:
        return <OverviewPage />;
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <AnimatedBackground />

      {/* Mobile Menu Toggle */}
      <button className={styles.mobileMenuToggle} onClick={toggleSidebar}>
        <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <SidebarNew
        activePage={activePage}
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className={styles.dashboardMain}>
        {/* Top Bar */}
        <TopBarNew />

        {/* Page Content */}
        {renderPage()}
      </main>
    </div>
  );
}
