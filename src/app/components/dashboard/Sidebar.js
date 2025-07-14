'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../../contexts/SupabaseAuthContext';
import { 
  Home,
  BarChart2,
  Users,
  Calendar,
  Building,
  CreditCard,
  FileText,
  Settings,
  LogOut,
  X
} from 'lucide-react';

const navItems = [
  {
    section: 'Main',
    items: [
      { id: 'overview', label: 'Overview', icon: Home },
      { id: 'analytics', label: 'Analytics', icon: BarChart2 },
      { id: 'customers', label: 'Customers', icon: Users, badge: '284' },
      { id: 'calendar', label: 'Calendar', icon: Calendar },
    ]
  },
  {
    section: 'Business',
    items: [
      { id: 'services', label: 'Services', icon: Building },
      { id: 'payments', label: 'Payments', icon: CreditCard },
      { id: 'reports', label: 'Reports', icon: FileText },
    ]
  },
  {
    section: 'Account',
    items: [
      { id: 'settings', label: 'Settings', icon: Settings },
    ]
  }
];

const Sidebar = React.memo(({ activePage, setActivePage, isOpen, onClose }) => {
  const router = useRouter();
  const { signOut } = useSupabaseAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Mobile close button */}
        <button 
          className="sidebar-mobile-close"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        <div className="sidebar-logo">BusinessHub</div>
        
        <nav>
          {navItems.map((section, sectionIndex) => (
            <div key={sectionIndex} className="nav-section">
              <div className="nav-section-title">{section.section}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Sign Out */}
          <div className="nav-section">
            <button 
              className="nav-item"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return (
    prevProps.activePage === nextProps.activePage &&
    prevProps.isOpen === nextProps.isOpen &&
    prevProps.setActivePage === nextProps.setActivePage &&
    prevProps.onClose === nextProps.onClose
  );
});

Sidebar.displayName = 'Sidebar';

export default Sidebar;