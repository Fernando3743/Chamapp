'use client';

import React, { useState } from 'react';
import { Search, Bell, MessageSquare } from 'lucide-react';

const TopBar = React.memo(({ user }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const getInitials = (user) => {
    if (!user) return '?';
    const name = user?.user_metadata?.name || user?.email || 'User';
    
    // If it's an email, use the first letter
    if (name.includes('@')) {
      return name.charAt(0).toUpperCase();
    }
    
    // Otherwise split the name and get initials
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="dashboard-topbar">
      {/* Search Bar */}
      <div className="dashboard-search">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Top Bar Actions */}
      <div className="topbar-actions">
        <button className="icon-button">
          <Bell className="w-5 h-5" />
          <span className="notification-dot"></span>
        </button>
        
        <button className="icon-button">
          <MessageSquare className="w-5 h-5" />
        </button>
        
        <div className="icon-button">
          <div className="user-avatar">
            {getInitials(user)}
          </div>
        </div>
      </div>
    </div>
  );
});

TopBar.displayName = 'TopBar';

export default TopBar;