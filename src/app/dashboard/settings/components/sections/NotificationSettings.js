"use client";

import { memo, useCallback, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import ToggleSwitch from "../shared/ToggleSwitch";
import { 
  EMAIL_NOTIFICATION_TYPES, 
  PUSH_NOTIFICATION_TYPES, 
  SMS_NOTIFICATION_TYPES 
} from "../../constants";

const NotificationSettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  // Email notifications state
  const [emailNotifications, setEmailNotifications] = useState(
    EMAIL_NOTIFICATION_TYPES.reduce((acc, notif) => ({
      ...acc,
      [notif.key]: notif.defaultValue
    }), {})
  );

  // Push notifications state
  const [pushNotifications, setPushNotifications] = useState(
    PUSH_NOTIFICATION_TYPES.reduce((acc, notif) => ({
      ...acc,
      [notif.key]: notif.defaultValue
    }), {})
  );

  // SMS notifications state
  const [smsNotifications, setSmsNotifications] = useState(
    SMS_NOTIFICATION_TYPES.reduce((acc, notif) => ({
      ...acc,
      [notif.key]: notif.defaultValue
    }), {})
  );

  const handleEmailToggle = useCallback((key, value) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handlePushToggle = useCallback((key, value) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const handleSmsToggle = useCallback((key, value) => {
    setSmsNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  return (
    <>
      {/* Email Notifications */}
      <SettingsSection
        title={t('emailNotifications')}
        description={t('emailNotificationsDesc')}
        className="mb-6"
      >
        <div className="space-y-4">
          {EMAIL_NOTIFICATION_TYPES.map((notif, index) => (
            <div
              key={notif.key}
              className={`${index < EMAIL_NOTIFICATION_TYPES.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <ToggleSwitch
                id={`email-${notif.key}`}
                name={`email-${notif.key}`}
                checked={emailNotifications[notif.key]}
                onChange={(checked) => handleEmailToggle(notif.key, checked)}
                label={t(notif.key)}
                description={t(notif.descriptionKey)}
              />
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* Push Notifications */}
      <SettingsSection
        title={t('pushNotifications')}
        description={t('pushNotificationsDesc')}
        className="mb-6"
      >
        <div className="space-y-4">
          {PUSH_NOTIFICATION_TYPES.map((notif, index) => (
            <div
              key={notif.key}
              className={`${index < PUSH_NOTIFICATION_TYPES.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <ToggleSwitch
                id={`push-${notif.key}`}
                name={`push-${notif.key}`}
                checked={pushNotifications[notif.key]}
                onChange={(checked) => handlePushToggle(notif.key, checked)}
                label={t(notif.key)}
                description={t(notif.descriptionKey)}
              />
            </div>
          ))}
        </div>
      </SettingsSection>

      {/* SMS Notifications */}
      <SettingsSection
        title={t('smsNotifications')}
        description={t('smsNotificationsDesc')}
      >
        <div className="space-y-4">
          {SMS_NOTIFICATION_TYPES.map((notif, index) => (
            <div
              key={notif.key}
              className={`${index < SMS_NOTIFICATION_TYPES.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <ToggleSwitch
                id={`sms-${notif.key}`}
                name={`sms-${notif.key}`}
                checked={smsNotifications[notif.key]}
                onChange={(checked) => handleSmsToggle(notif.key, checked)}
                label={t(notif.key)}
                description={t(notif.descriptionKey)}
              />
            </div>
          ))}
        </div>
      </SettingsSection>
    </>
  );
});

NotificationSettings.displayName = 'NotificationSettings';

export default NotificationSettings;