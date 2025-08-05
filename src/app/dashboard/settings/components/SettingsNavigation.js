"use client";

import { memo, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import { NAVIGATION_ITEMS } from "../constants";

/**
 * SettingsNavigation - Navigation component for settings sections
 * 
 * @param {Object} props
 * @param {string} props.activeSection - Currently active section
 * @param {Function} props.onSectionChange - Callback when section changes
 */
const SettingsNavigation = memo(({ activeSection, onSectionChange }) => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    onSectionChange(sectionId);
  }, [onSectionChange]);

  return (
    <nav 
      className="bg-glass-gradient backdrop-blur-glass border border-[rgba(255,255,255,0.2)] rounded-xl p-5 h-fit sticky top-5 lg:block flex overflow-x-auto"
      role="navigation"
      aria-label="Settings navigation"
    >
      {NAVIGATION_ITEMS.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={`
            nav-item flex items-center gap-3 px-4 py-3 mb-1 rounded-lg 
            text-text-secondary hover:bg-white/5 hover:text-white 
            transition-all duration-300 whitespace-nowrap lg:whitespace-normal
            ${activeSection === item.id ? 'active bg-white/10 text-white' : ''}
          `}
          onClick={(e) => handleNavClick(e, item.id)}
          aria-current={activeSection === item.id ? 'page' : undefined}
          role="link"
        >
          <span className="text-lg w-5 text-center" aria-hidden="true">
            {item.icon}
          </span>
          <span className="text-sm font-medium">{t(item.labelKey)}</span>
        </a>
      ))}
    </nav>
  );
});

SettingsNavigation.displayName = 'SettingsNavigation';

export default SettingsNavigation;