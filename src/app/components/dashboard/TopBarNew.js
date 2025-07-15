'use client';

import React, { useState, useCallback } from 'react';
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext';
import {
  Search,
  MessageSquare,
  Bell,
  Zap,
  ChevronDown
} from 'lucide-react';
import styles from '../../styles/components/dashboard/TopBarNew.module.css';

const TopBarNew = React.memo(() => {
  const { user, userProfile } = useSupabaseAuth();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (userProfile?.first_name && userProfile?.last_name) {
      return `${userProfile.first_name[0]}${userProfile.last_name[0]}`.toUpperCase();
    }
    return user?.email ? user.email[0].toUpperCase() : 'U';
  };

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  }, [searchQuery]);

  return (
    <div className={styles.topBar}>
      {/* Search Bar */}
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <Search className={`${styles.searchIcon} w-5 h-5`} />
        <input
          type="text"
          placeholder="Search customers, appointments, or transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>

      {/* Top Actions */}
      <div className={styles.topActions}>
        {/* Notifications */}
        <button className={styles.notificationBtn}>
          <Bell className="w-5 h-5" />
          <span className={styles.notificationBadge}>12</span>
        </button>

        {/* Settings */}
        <button className={styles.settingsBtn}>
          <Zap className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {getUserInitials()}
          </div>
          <div className={styles.userDetails}>
            <div className={styles.userName}>
              {userProfile?.first_name && userProfile?.last_name
                ? `${userProfile.first_name} ${userProfile.last_name}`
                : user?.email?.split('@')[0] || 'User'}
            </div>
            <div className={styles.userRole}>Business Owner</div>
          </div>
        </div>
      </div>
    </div>
  );
});

TopBarNew.displayName = 'TopBarNew';

export default TopBarNew;