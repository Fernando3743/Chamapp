"use client";

import { memo, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import Button from "../shared/Button";
import { INTEGRATIONS } from "../../constants";

const IntegrationCard = memo(({ integration, onAction }) => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const isConnected = integration.status === 'connected';

  return (
    <div className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1">
      <div className="text-5xl mb-4">{integration.icon}</div>
      <h3 className="text-base font-semibold mb-2">{integration.name}</h3>
      
      {integration.status && (
        <p className={`text-xs mb-4 ${isConnected ? 'text-green-400' : 'text-text-secondary'}`}>
          {t(integration.status)}
        </p>
      )}
      
      {integration.description && (
        <p className="text-xs text-text-secondary mb-4">{integration.description}</p>
      )}
      
      <Button
        variant={isConnected ? "secondary" : "primary"}
        size="sm"
        onClick={() => onAction(integration.id, isConnected)}
      >
        {isConnected ? t(integration.id === 'stripe' ? 'settings' : 'disconnect') : t('connect')}
      </Button>
    </div>
  );
});

IntegrationCard.displayName = 'IntegrationCard';

const IntegrationSettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const handleIntegrationAction = useCallback((integrationId, isConnected) => {
    // TODO: Implement integration actions
    console.log(`${isConnected ? 'Disconnecting' : 'Connecting'} integration:`, integrationId);
  }, []);

  const handleLearnMore = useCallback((integrationId) => {
    // TODO: Implement learn more functionality
    console.log('Learn more about:', integrationId);
  }, []);

  return (
    <>
      {/* Connected Integrations */}
      <SettingsSection
        title={t('connectedIntegrations')}
        description={t('connectedIntegrationsDesc')}
        className="mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...INTEGRATIONS.CONNECTED, ...INTEGRATIONS.AVAILABLE].map(integration => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onAction={handleIntegrationAction}
            />
          ))}
        </div>
      </SettingsSection>

      {/* Available Integrations */}
      <SettingsSection
        title={t('availableIntegrations')}
        description={t('availableIntegrationsDesc')}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {INTEGRATIONS.EXPLORE.map(integration => (
            <div 
              key={integration.id}
              className="bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center transition-all duration-300 hover:bg-white/8 hover:-translate-y-1"
            >
              <div className="text-5xl mb-4">{integration.icon}</div>
              <h3 className="text-base font-semibold mb-2">{integration.name}</h3>
              <p className="text-xs text-text-secondary mb-4">{integration.description}</p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleLearnMore(integration.id)}
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>
      </SettingsSection>
    </>
  );
});

IntegrationSettings.displayName = 'IntegrationSettings';

export default IntegrationSettings;