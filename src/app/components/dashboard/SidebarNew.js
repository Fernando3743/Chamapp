'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext';
import { ChevronDown, X } from 'lucide-react';
import styles from '../../styles/components/dashboard/SidebarNew.module.css';

const SidebarNew = React.memo(({ activePage, setActivePage, isOpen, onClose }) => {
  const router = useRouter();
  const { user, userProfile } = useSupabaseAuth();
  const [collapsed, setCollapsed] = useState(false);

  // Get user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    }
    return user?.email ? user.email[0].toUpperCase() : 'U';
  };

  // Get user name
  const getUserName = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name} ${userProfile.last_name}`;
    }
    return user?.email?.split('@')[0] || 'User';
  };

  const menuItems = [
    {
      section: 'Main',
      items: [
        { id: 'overview', label: 'Dashboard', icon: '🏠' },
        { id: 'analytics', label: 'Analytics', icon: '📊' },
        { id: 'orders', label: 'Orders', icon: '📋', badge: '12' },
        { id: 'customers', label: 'Customers', icon: '👥' }
      ]
    },
    {
      section: 'Business',
      items: [
        { id: 'products', label: 'Products', icon: '📦' },
        { id: 'appointments', label: 'Appointments', icon: '📅' },
        { id: 'calendar', label: 'Calendar', icon: '🗓️' },
        { id: 'transactions', label: 'Transactions', icon: '💳' },
        { id: 'staff', label: 'Staff', icon: '👷' },
        { id: 'marketing', label: 'Marketing', icon: '📱' }
      ]
    },
    {
      section: 'Settings',
      items: [
        { id: 'settings', label: 'Settings', icon: '⚙️' },
        { id: 'notifications', label: 'Notifications', icon: '🔔', badge: '3' }
      ]
    }
  ];

  const handleMenuClick = useCallback((itemId) => {
    setActivePage(itemId);
    // Close sidebar on mobile after navigation
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      onClose();
    }
  }, [setActivePage, onClose]);

  const handleProfileClick = useCallback(() => {
    router.push('/profile');
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      onClose();
    }
  }, [router, onClose]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className={styles.sidebarOverlay}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
        {/* Logo */}
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>B</div>
          <div className={styles.logoText}>BusinessHub</div>
        </div>

        {/* Navigation */}
        <nav className={styles.navMenu}>
          {menuItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className={styles.navSection}>
              <div className={styles.navSectionTitle}>{section.section}</div>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  className={activePage === item.id ? styles.navItemActive : styles.navItem}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                  {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* User Profile */}
        <div className={styles.userProfile}>
          <div className={styles.profileInfo} onClick={handleProfileClick}>
            <div className={styles.profileAvatar}>{getUserInitials()}</div>
            <div className={styles.profileDetails}>
              <div className={styles.profileName}>{getUserName()}</div>
              <div className={styles.profileRole}>Admin</div>
            </div>
            <div className={styles.profileDropdown}>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

SidebarNew.displayName = 'SidebarNew';

export default SidebarNew;