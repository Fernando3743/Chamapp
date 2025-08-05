"use client";

import { useState, useCallback, lazy, Suspense } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsNavigation from "./components/SettingsNavigation";
import ErrorBoundary from "./components/ErrorBoundary";
import { SETTINGS_SECTIONS } from "./constants";

// Lazy load section components for better performance
const GeneralSettings = lazy(() => import("./components/sections/GeneralSettings"));
const BusinessSettings = lazy(() => import("./components/sections/BusinessSettings"));
const TeamSettings = lazy(() => import("./components/sections/TeamSettings"));
const NotificationSettings = lazy(() => import("./components/sections/NotificationSettings"));
const BillingSettings = lazy(() => import("./components/sections/BillingSettings"));
const IntegrationSettings = lazy(() => import("./components/sections/IntegrationSettings"));
const SecuritySettings = lazy(() => import("./components/sections/SecuritySettings"));

// Loading component for lazy sections
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[400px]">
    <div className="text-center">
      <div className="animate-spin h-8 w-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-4"></div>
      <p className="text-text-secondary">Loading settings...</p>
    </div>
  </div>
);

// Map sections to their components
const SECTION_COMPONENTS = {
  [SETTINGS_SECTIONS.GENERAL]: GeneralSettings,
  [SETTINGS_SECTIONS.BUSINESS]: BusinessSettings,
  [SETTINGS_SECTIONS.TEAM]: TeamSettings,
  [SETTINGS_SECTIONS.NOTIFICATIONS]: NotificationSettings,
  [SETTINGS_SECTIONS.BILLING]: BillingSettings,
  [SETTINGS_SECTIONS.INTEGRATIONS]: IntegrationSettings,
  [SETTINGS_SECTIONS.SECURITY]: SecuritySettings
};

export default function SettingsPage() {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const [activeSection, setActiveSection] = useState(SETTINGS_SECTIONS.GENERAL);

  const handleSectionChange = useCallback((section) => {
    setActiveSection(section);
    // Scroll to top when section changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Get the active section component
  const ActiveSectionComponent = SECTION_COMPONENTS[activeSection];

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-[600px] h-[600px] bg-primary-gradient rounded-full blur-[100px] opacity-50 -top-[300px] -right-[200px] animate-float"></div>
        <div className="absolute w-[400px] h-[400px] bg-sphere-2 rounded-full blur-[100px] opacity-50 -bottom-[200px] -left-[100px] animate-float-delayed"></div>
        <div className="absolute w-[300px] h-[300px] bg-sphere-3 rounded-full blur-[100px] opacity-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-delayed-10"></div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8 relative z-10">
        {/* Settings Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold mb-3">{t("settings")}</h1>
          <p className="text-text-secondary">{t("settingsDescription")}</p>
        </header>

        {/* Settings Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Settings Navigation */}
          <SettingsNavigation
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
          />

          {/* Settings Content */}
          <div className="settings-wrapper">
            <ErrorBoundary>
              <Suspense fallback={<SectionLoader />}>
                {ActiveSectionComponent && <ActiveSectionComponent />}
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </>
  );
}