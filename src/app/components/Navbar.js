"use client";

import { useRef, useCallback, useEffect, memo, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LanguageSelector from "./LanguageSelector";
import LoginDropdown from "./LoginDropdown";
import ErrorBoundary from "./ErrorBoundary";
import { usePageTranslations } from "../../hooks/usePageTranslations";
import { useMountedPortal, useEscapeKey, useBodyScrollLock, useClickOutside } from "../hooks";
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
import styles from '../styles/components/Navbar.module.css';

const Navbar = memo(function Navbar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const mobileMenuOpen = useAppSelector(selectMobileMenuOpen);
  const { user, isAuthenticated, loading, signOut } = useSupabaseAuth();
  const { t } = usePageTranslations("home");
  const mobileMenuToggleRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const profileMenuRef = useRef(null);
  const isMounted = useMountedPortal();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  // Close mobile menu on escape key
  useEscapeKey(useCallback(() => dispatch(closeMobileMenu()), [dispatch]), mobileMenuOpen);
  
  // Close profile menu on escape key
  useEscapeKey(useCallback(() => setProfileMenuOpen(false), []), profileMenuOpen);
  
  // Lock body scroll when mobile menu is open
  useBodyScrollLock(mobileMenuOpen);
  
  // Close profile menu when clicking outside
  useClickOutside(profileMenuRef, () => setProfileMenuOpen(false));

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

  const handleProfileClick = useCallback(() => {
    setProfileMenuOpen(!profileMenuOpen);
  }, [profileMenuOpen]);

  const handleSignOut = useCallback(async () => {
    setProfileMenuOpen(false);
    await signOut();
    router.push('/');
  }, [signOut, router]);

  return (
    <nav className={styles.headerNav}>
      <div className={styles.headerNavContainer}>
        <div className={styles.headerNavLeft}>
          <Link href="/" className={styles.headerLogo}>
            BusinessHub
          </Link>

          {/* Desktop nav links - hidden on mobile */}
          <div className={`${styles.headerNavLinks} ${styles.headerDesktopOnly}`}>
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

        <div className={styles.headerNavRight}>
          <LanguageSelector />
          {isAuthenticated ? (
            <>
              <Link
                href="/dashboard"
                className={styles.ctaButton}
              >
                Dashboard
              </Link>
              <div className={styles.userMenu} ref={profileMenuRef}>
                <div 
                  className={styles.userAvatar}
                  onClick={handleProfileClick}
                  role="button"
                  tabIndex={0}
                  aria-label="User profile menu"
                  aria-expanded={profileMenuOpen}
                >
                  {user?.user_metadata?.name?.charAt(0).toUpperCase() || 
                   user?.email?.charAt(0).toUpperCase() || 
                   'U'}
                </div>
                
                {/* Profile Dropdown Menu */}
                {profileMenuOpen && (
                  <div className={styles.profileDropdown}>
                    <div className={styles.profileDropdownHeader}>
                      <div className={styles.profileDropdownAvatar}>
                        {user?.user_metadata?.name?.charAt(0).toUpperCase() || 
                         user?.email?.charAt(0).toUpperCase() || 
                         'U'}
                      </div>
                      <div className={styles.profileDropdownInfo}>
                        <div className={styles.profileDropdownName}>
                          {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                        </div>
                        <div className={styles.profileDropdownEmail}>
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <div className={styles.profileDropdownDivider}></div>
                    <Link 
                      href="/dashboard" 
                      className={styles.profileDropdownItem}
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <HomeIcon className={styles.profileDropdownIcon} />
                      <span>Dashboard</span>
                    </Link>
                    <Link 
                      href="/profile" 
                      className={styles.profileDropdownItem}
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      <SettingsIcon className={styles.profileDropdownIcon} />
                      <span>Profile Settings</span>
                    </Link>
                    <div className={styles.profileDropdownDivider}></div>
                    <button 
                      className={styles.profileDropdownItem}
                      onClick={handleSignOut}
                    >
                      <LogInIcon className={styles.profileDropdownIcon} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <LoginDropdown />
              <Link
                href="/register"
                className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}
                style={{ position: "relative" }}
              >
                {t("startYourBusiness") || t("getStarted")}
                <span className={styles.notificationBadge}>{t("new")}</span>
              </Link>
            </>
          )}

          <button
            ref={mobileMenuToggleRef}
            className={`${styles.headerMobileMenuToggle} ${mobileMenuOpen ? styles.active : ""}`}
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
            <div className={`${styles.errorBoundary} ${styles.compact}`}>
              <div className={styles.errorBoundaryContent}>
                <h2>Menu Unavailable</h2>
                <p>Please refresh the page to restore navigation.</p>
              </div>
            </div>
          }
        >
        <div 
          className={styles.mobileSidebarOverlay} 
          onClick={handleCloseMobileMenu}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div 
            ref={mobileMenuRef}
            className={styles.mobileSidebarMenu} 
            onClick={(e) => e.stopPropagation()}
            id="mobile-sidebar-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            {/* Logo Section */}
            <div className={styles.mobileSidebarLogo}>
              <div className={styles.mobileSidebarLogoIcon}>B</div>
              <div className={styles.mobileSidebarLogoText}>BusinessHub</div>
              <button 
                className={styles.mobileSidebarClose}
                onClick={handleCloseMobileMenu}
                aria-label="Close mobile menu"
                type="button"
              >
                ×
              </button>
            </div>

            {/* Navigation Menu */}
            <nav className={styles.mobileSidebarNavMenu}>
              {/* Navigation Section */}
              <div className={styles.mobileSidebarNavSection}>
                <div className={styles.mobileSidebarNavSectionTitle}>Navigation</div>
                <a href="#features" className={`${styles.mobileSidebarNavItem} ${styles.active}`} onClick={handleSmoothScroll}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <HomeIcon />
                  </span>
                  <span>{t("featuresTitle")}</span>
                </a>
                <a href="#solutions" className={styles.mobileSidebarNavItem} onClick={handleSmoothScroll}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <AnalyticsIcon />
                  </span>
                  <span>{t("solutions")}</span>
                </a>
                <a href="#pricing" className={styles.mobileSidebarNavItem} onClick={handleSmoothScroll}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <CalendarIcon />
                  </span>
                  <span>{t("pricing")}</span>
                </a>
                <a href="#testimonials" className={styles.mobileSidebarNavItem} onClick={handleSmoothScroll}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <UsersIcon />
                  </span>
                  <span>{t("testimonials")}</span>
                </a>
                <a href="#faq" className={styles.mobileSidebarNavItem} onClick={handleSmoothScroll}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <HelpCircleIcon />
                  </span>
                  <span>{t("faq")}</span>
                </a>
              </div>

              {/* Account Section */}
              <div className={styles.mobileSidebarNavSection}>
                <div className={styles.mobileSidebarNavSectionTitle}>Account</div>
                {isAuthenticated ? (
                  <Link href="/dashboard" className={styles.mobileSidebarNavItem} onClick={handleCloseMobileMenu}>
                    <span className={styles.mobileSidebarNavIcon}>
                      <HomeIcon />
                    </span>
                    <span>Dashboard</span>
                  </Link>
                ) : (
                  <>
                    <Link href="/signin" className={styles.mobileSidebarNavItem} onClick={handleCloseMobileMenu}>
                      <span className={styles.mobileSidebarNavIcon}>
                        <LogInIcon />
                      </span>
                      <span>{t("signIn")}</span>
                    </Link>
                    <Link href="/register" className={styles.mobileSidebarNavItem} onClick={handleCloseMobileMenu}>
                      <span className={styles.mobileSidebarNavIcon}>
                        <UserPlusIcon />
                      </span>
                      <span>{t("startYourBusiness") || t("getStarted")}</span>
                      <span className={styles.mobileSidebarNavBadge}>{t("new")}</span>
                    </Link>
                  </>
                )}
              </div>

              {/* Settings Section */}
              <div className={styles.mobileSidebarNavSection}>
                <div className={styles.mobileSidebarNavSectionTitle}>Settings</div>
                <a href="#" className={styles.mobileSidebarNavItem} onClick={handleCloseMobileMenu}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <SettingsIcon />
                  </span>
                  <span>Settings</span>
                </a>
                <a href="#" className={styles.mobileSidebarNavItem} onClick={handleCloseMobileMenu}>
                  <span className={styles.mobileSidebarNavIcon}>
                    <BellIcon />
                  </span>
                  <span>Notifications</span>
                  <span className={styles.mobileSidebarNavBadge}>3</span>
                </a>
              </div>
            </nav>

            {/* User Profile */}
            {isAuthenticated && user && (
              <div className={styles.mobileSidebarUserProfile}>
                <div className={styles.mobileSidebarProfileInfo} onClick={handleCloseMobileMenu}>
                  <div className={styles.mobileSidebarProfileAvatar}>
                    {user?.user_metadata?.name?.charAt(0).toUpperCase() || 
                     user?.email?.charAt(0).toUpperCase() || 
                     'U'}
                  </div>
                  <div className={styles.mobileSidebarProfileDetails}>
                    <div className={styles.mobileSidebarProfileName}>
                      {user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'}
                    </div>
                    <div className={styles.mobileSidebarProfileRole}>
                      {user?.user_metadata?.role || 'Member'}
                    </div>
                  </div>
                  <div className={styles.mobileSidebarProfileDropdown}>▼</div>
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