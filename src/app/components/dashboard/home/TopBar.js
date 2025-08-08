"use client";

import Link from "next/link";

/**
 * TopBar component for dashboard home page
 * Includes search bar, notifications, and user profile
 */
export default function TopBar({
  searchPlaceholder = "Search...",
  userName = "User",
  userRole = "Business Owner",
  messagesCount = 0,
  notificationsCount = 0,
  className = "",
}) {
  return (
    <div className={`glass border border-white/20 rounded-2xl p-5 mb-8 flex flex-col lg:flex-row justify-between items-center gap-5 ${className}`}>
      {/* Search Bar */}
      <div className="flex-1 max-w-lg relative w-full lg:w-auto">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60">
          🔍
        </span>
        <input
          type="text"
          className="w-full pl-12 pr-5 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:bg-white/8 focus:border-indigo-500/50 transition-all duration-300"
          placeholder={searchPlaceholder}
        />
      </div>
      
      {/* Right Side - Notifications & Profile */}
      <div className="flex items-center gap-4">
        {/* Messages */}
        <div className="w-10 h-10 glass-darker border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-300 relative">
          <span>💬</span>
          {messagesCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
              {messagesCount}
            </span>
          )}
        </div>
        
        {/* Notifications */}
        <div className="w-10 h-10 glass-darker border border-white/20 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all duration-300 relative">
          <span>🔔</span>
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold">
              {notificationsCount}
            </span>
          )}
        </div>
        
        {/* User Profile */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-3 px-4 py-2 glass-darker border border-white/20 rounded-xl cursor-pointer hover:bg-white/8 transition-all duration-300"
        >
          <div className="w-8 h-8 bg-primary-gradient rounded-full flex items-center justify-center font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:flex flex-col">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-xs text-white/60">{userRole}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}