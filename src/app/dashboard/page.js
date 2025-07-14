'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';
import OverviewPage from '../components/dashboard/OverviewPage';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const router = useRouter();
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return; // Still loading
    if (!isAuthenticated) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <OverviewPage />;
      case 'analytics':
        return <div className="dashboard-page">Analytics Page (Coming Soon)</div>;
      case 'customers':
        return <div className="dashboard-page">Customers Page (Coming Soon)</div>;
      case 'calendar':
        return <div className="dashboard-page">Calendar Page (Coming Soon)</div>;
      case 'settings':
        return <div className="dashboard-page">Settings Page (Coming Soon)</div>;
      default:
        return <OverviewPage />;
    }
  };

  if (loading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <div className="loading w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <AnimatedBackground />
      
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleSidebar}>
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>

      {/* Sidebar */}
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Bar */}
        <TopBar user={user} />

        {/* Page Content */}
        {renderPage()}
      </main>
    </div>
  );
}