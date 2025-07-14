"use client";

import { useRef, useCallback, useEffect, memo } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import LanguageSelector from "./LanguageSelector";
import LoginDropdown from "./LoginDropdown";
import ErrorBoundary from "./ErrorBoundary";
import { usePageTranslations } from "../../hooks/usePageTranslations";
import { useMountedPortal, useEscapeKey, useBodyScrollLock } from "../hooks";
import { useSupabaseAuth } from "../contexts/SupabaseAuthContext";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { 
  selectMobileMenuOpen, 
  closeMobileMenu, 
  toggleMobileMenu 
} from "../store/slices/uiSlice";
import { 
  HomeIcon, 
  AnalyticsIcon, 
  CalendarIcon, 
  UsersIcon, 
  HelpCircleIcon, 
  LogInIcon, 
  UserPlusIcon, 
  SettingsIcon, 
  BellIcon 
} from "./icons";

const Navbar = memo(function Navbar() {
  const dispatch = useAppDispatch();
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen);
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const { t } = usePageTranslations("home");
  const mobileMenuToggleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isMounted = useMountedPortal();

  // Close mobile menu on escape key
  useEscapeKey(useCallback(() => dispatch(closeMobileMenu()), [dispatch]), mobileMenuOpen);
  
  // Lock body scroll when mobile menu is open
  useBodyScrollLock(mobileMenuOpen);

  // Focus management for accessibility
  useEffect(() => {
    if (mobileMenuOpen) {
      // Focus the first focusable element in the menu
      setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector('button, a');
        firstFocusable?.focus();
      }, 100);
    } else {
      // Return focus to menu toggle button when closing
      mobileMenuToggleRef.current?.focus();
    }
  }, [mobileMenuOpen]);

  const handleSmoothScroll = useCallback((e) => {
    e.preventDefault();
    const targetId = e.target.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    dispatch(closeMobileMenu());
  }, [dispatch]);

  const handleCloseMobileMenu = useCallback(() => {
    dispatch(closeMobileMenu());
  }, [dispatch]);

  const handleToggleMobileMenu = useCallback(() => {
    dispatch(toggleMobileMenu());
  }, [dispatch]);

  return (
    <nav className="header-nav">
      <div className="header-nav-container">
        <div className="header-nav-left">
          <Link href="/" className="header-logo">
            BusinessHub
          </Link>

          {/* Desktop nav links - hidden on mobile */}
          <div className="header-nav-links header-desktop-only">
            <a href="#features" onClick={handleSmoothScroll}>
              {t("featuresTitle")}
            </a>
            <a href="#solutions" onClick={handleSmoothScroll}>
              {t("solutions")}
            </a>
            <a href="#pricing" onClick={handleSmoothScroll}>
              {t("pricing")}
            </a>
            <a href="#testimonials" onClick={handleSmoothScroll}>
              {t("testimonials")}
            </a>
            <a href="#faq" onClick={handleSmoothScroll}>
              {t("faq")}
            </a>
          </div>
        </div>

        <div className="header-nav-right">
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className="cta-button"
              >
                Dashboard
              </Link>
              <div className="user-menu">
                <div className="user-avatar">
                  {user?.user_metadata?.name?.charAt(0).toUpperCase() || 
                   user?.email?.charAt(0).toUpperCase() || 
                   'U'}
                </div>
              </div>
            </>
          ) : (
            <>
              <LoginDropdown />
              <Link
                href="/register"
                className="cta-button primary-cta"
                style={{ position: "relative" }}
              >
                {t("startYourBusiness") || t("getStarted")}
                <span className="notification-badge">{t("new")}</span>
              </Link>
            </>
          )}

          <button
            ref={mobileMenuToggleRef}
            className={`header-mobile-menu-toggle ${mobileMenuOpen ? "active" : ""}`}
            onClick={handleToggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-sidebar-menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile sidebar menu - rendered as portal with error boundary */}
      {isMounted && mobileMenuOpen && createPortal(
        <ErrorBoundary 
          fallback={
            <div className="error-boundary compact">
              <div className="error-boundary-content">
                <h2>Menu Unavailable</h2>
                <p>Please refresh the page to restore navigation.</p>
              </div>
            </div>
          }
        >
        <div 
          className="mobile-sidebar-overlay" 
          onClick={handleCloseMobileMenu}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div 
            ref={mobileMenuRef}
            className="mobile-sidebar-menu" 
            onClick={(e) => e.stopPropagation()}
            id="mobile-sidebar-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            {/* Logo Section */}
            <div className="mobile-sidebar-logo">
              <div className="mobile-sidebar-logo-icon">B</div>
              <div className="mobile-sidebar-logo-text">BusinessHub</div>
              <button 
                className="mobile-sidebar-close"
                onClick={handleCloseMobileMenu}
                aria-label="Close mobile menu"
                type="button"
              >
                ×
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className="mobile-sidebar-nav-menu">
              {/* Navigation Section */}
              <div className="mobile-sidebar-nav-section">
                <div className="mobile-sidebar-nav-section-title">Navigation</div>
                <a href="#features" className="mobile-sidebar-nav-item active" onClick={handleSmoothScroll}>
                  <span className="mobile-sidebar-nav-icon">
                    <HomeIcon />
                  </span>
                  <span>{t("featuresTitle")}</span>
                </a>
                <a href="#solutions" className="mobile-sidebar-nav-item" onClick={handleSmoothScroll}>
                  <span className="mobile-sidebar-nav-icon">
                    <AnalyticsIcon />
                  </span>
                  <span>{t("solutions")}</span>
                </a>
                <a href="#pricing" className="mobile-sidebar-nav-item" onClick={handleSmoothScroll}>
                  <span className="mobile-sidebar-nav-icon">
                    <CalendarIcon />
                  </span>
                  <span>{t("pricing")}</span>
                </a>
                <a href="#testimonials" className="mobile-sidebar-nav-item" onClick={handleSmoothScroll}>
                  <span className="mobile-sidebar-nav-icon">
                    <UsersIcon />
                  </span>
                  <span>{t("testimonials")}</span>
                </a>
                <a href="#faq" className="mobile-sidebar-nav-item" onClick={handleSmoothScroll}>
                  <span className="mobile-sidebar-nav-icon">
                    <HelpCircleIcon />
                  </span>
                  <span>{t("faq")}</span>
                </a>
              </div>

              {/* Account Section */}
              <div className="mobile-sidebar-nav-section">
                <div className="mobile-sidebar-nav-section-title">Account</div>
                {isAuthenticated ? (
                  <Link href="/dashboard" className="mobile-sidebar-nav-item" onClick={handleCloseMobileMenu}>
                    <span className="mobile-sidebar-nav-icon">
                      <HomeIcon />
                    </span>
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <>
                    <Link href="/signin" className="mobile-sidebar-nav-item" onClick={handleCloseMobileMenu}>
                      <span className="mobile-sidebar-nav-icon">
                        <LogInIcon />
                      </span>
                      <span>{t("signIn")}</span>
                    </Link>
                    <Link href="/register" className="mobile-sidebar-nav-item" onClick={handleCloseMobileMenu}>
                      <span className="mobile-sidebar-nav-icon">
                        <UserPlusIcon />
                      </span>
                      <span>{t("startYourBusiness") || t("getStarted")}</span>
                      <span className="mobile-sidebar-nav-badge">{t("new")}</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Settings Section */}
              <div className="mobile-sidebar-nav-section">
                <div className="mobile-sidebar-nav-section-title">Settings</div>
                <a href="#" className="mobile-sidebar-nav-item" onClick={handleCloseMobileMenu}>
                  <span className="mobile-sidebar-nav-icon">
                    <SettingsIcon />
                  </span>
                  <span>Settings</span>
                </a>
                <a href="#" className="mobile-sidebar-nav-item" onClick={handleCloseMobileMenu}>
                  <span className="mobile-sidebar-nav-icon">
                    <BellIcon />
                  </span>
                  <span>Notifications</span>
                  <span className="mobile-sidebar-nav-badge">3</span>
                </a>
              </div>
            </nav>

            {/* User Profile */}
            {isAuthenticated && user && (
              <div className="mobile-sidebar-user-profile">
                <div className="mobile-sidebar-profile-info" onClick={handleCloseMobileMenu}>
                  <div className="mobile-sidebar-profile-avatar">
                    {user?.user_metadata?.name?.charAt(0).toUpperCase() || 
                     user?.email?.charAt(0).toUpperCase() || 
                     'U'}
                  </div>
                  <div className="mobile-sidebar-profile-details">
                    <div className="mobile-sidebar-profile-name">
                      {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                    </div>
                    <div className="mobile-sidebar-profile-role">
                      {user?.user_metadata?.role || 'Member'}
                    </div>
                  </div>
                  <div className="mobile-sidebar-profile-dropdown">▼</div>
                </div>
              </div>
            )}
          </div>
        </div>
        </ErrorBoundary>,
        document.body
      )}
    </nav>
  );
});

export default Navbar;