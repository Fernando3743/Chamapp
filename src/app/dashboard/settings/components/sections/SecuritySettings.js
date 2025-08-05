"use client";

import { memo, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import { validatePasswordChange } from "../../utils/validation";

const LoginSession = memo(({ session, isCurrent, onEndSession }) => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  return (
    <div className={`p-6 bg-white/5 rounded-xl transition-all duration-300 hover:bg-white/8 ${isCurrent ? 'border border-blue-400/30' : ''}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex-1">
          <div className="text-sm font-medium">
            {session.device}
            {isCurrent && (
              <span className="ml-2 px-2 py-0.5 bg-blue-400/20 text-blue-400 text-xs rounded">
                Current
              </span>
            )}
          </div>
          <div className="text-xs text-text-secondary mt-1">
            {session.location} • {session.time}
          </div>
          <div className="text-xs text-text-secondary">
            {t('ipAddress')}: {session.ip}
          </div>
        </div>
        {!isCurrent && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEndSession(session.id)}
          >
            {t('endSession')}
          </Button>
        )}
      </div>
    </div>
  );
});

LoginSession.displayName = 'LoginSession';

const SecuritySettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  // Password change form
  const passwordForm = useSettingsForm({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validate: validatePasswordChange,
    onSubmit: async (values) => {
      // TODO: Implement API call to change password
      console.log('Changing password');
      await new Promise(resolve => setTimeout(resolve, 1000));
      passwordForm.reset();
    }
  });

  const handleEnable2FA = useCallback(() => {
    // TODO: Implement 2FA enablement
    console.log('Enable 2FA clicked');
  }, []);

  const handleEndSession = useCallback((sessionId) => {
    // TODO: Implement end session
    console.log('End session:', sessionId);
  }, []);

  const handleEndAllSessions = useCallback(() => {
    // TODO: Implement end all sessions
    console.log('End all sessions clicked');
  }, []);

  // Mock login sessions
  const loginSessions = [
    {
      id: 1,
      device: 'Chrome on MacBook Pro',
      location: 'New York, US',
      time: '2 hours ago',
      ip: '192.168.1.100',
      isCurrent: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, US',
      time: '1 day ago',
      ip: '192.168.1.105',
      isCurrent: false
    },
    {
      id: 3,
      device: 'Chrome on Windows',
      location: 'Brooklyn, US',
      time: '3 days ago',
      ip: '192.168.1.120',
      isCurrent: false
    }
  ];

  return (
    <>
      {/* Password & Security */}
      <SettingsSection
        title={t('passwordSecurity')}
        description={t('passwordSecurityDesc')}
        className="mb-6"
      >
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{t('changePassword')}</h3>
          <form onSubmit={passwordForm.handleSubmit}>
            <div className="space-y-6">
              <FormInput
                {...passwordForm.getFieldProps('currentPassword')}
                type="password"
                label={t('currentPassword')}
                required
                autoComplete="current-password"
              />
              <FormInput
                {...passwordForm.getFieldProps('newPassword')}
                type="password"
                label={t('newPassword')}
                required
                autoComplete="new-password"
              />
              <FormInput
                {...passwordForm.getFieldProps('confirmNewPassword')}
                type="password"
                label={t('confirmNewPassword')}
                required
                autoComplete="new-password"
              />
            </div>
            
            <Button
              type="submit"
              variant="primary"
              className="mt-6"
              loading={passwordForm.isSubmitting}
            >
              {t('updatePassword')}
            </Button>
          </form>
        </div>
        
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-1">{t('twoFactorAuth')}</h3>
              <p className="text-sm text-text-secondary">{t('twoFactorAuthDesc')}</p>
            </div>
            <Button
              variant="secondary"
              onClick={handleEnable2FA}
            >
              {t('enable2FA')}
            </Button>
          </div>
        </div>
      </SettingsSection>

      {/* Login History */}
      <SettingsSection
        title={t('loginHistory')}
        description={t('loginHistoryDesc')}
        className="mb-6"
      >
        <div className="space-y-5">
          {loginSessions.map(session => (
            <LoginSession
              key={session.id}
              session={session}
              isCurrent={session.isCurrent}
              onEndSession={handleEndSession}
            />
          ))}
        </div>
        
        <Button
          variant="secondary"
          className="mt-6"
          onClick={handleEndAllSessions}
        >
          {t('endAllSessions')}
        </Button>
      </SettingsSection>

      {/* Active Sessions */}
      <SettingsSection
        title={t('sessions')}
        description={t('sessionsDesc')}
      >
        <div className="text-sm text-text-secondary">
          <p>You have 3 active sessions across different devices.</p>
          <p className="mt-2">
            Managing your sessions helps you maintain account security by ensuring
            only authorized devices have access.
          </p>
        </div>
      </SettingsSection>
    </>
  );
});

SecuritySettings.displayName = 'SecuritySettings';

export default SecuritySettings;