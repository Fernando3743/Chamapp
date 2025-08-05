"use client";

import { memo, useCallback } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import { validateAccountInfo } from "../../utils/validation";
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS, DATE_FORMAT_OPTIONS } from "../../constants";

const GeneralSettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  // Account Information Form
  const accountForm = useSettingsForm({
    initialValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@businesshub.com',
      phone: '+1 (555) 123-4567'
    },
    validate: validateAccountInfo,
    onSubmit: async (values) => {
      // TODO: Implement API call to save account info
      console.log('Saving account info:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  // Preferences Form
  const preferencesForm = useSettingsForm({
    initialValues: {
      language: 'en',
      timezone: 'America/New_York',
      dateFormat: 'MM/DD/YYYY'
    },
    onSubmit: async (values) => {
      // TODO: Implement API call to save preferences
      console.log('Saving preferences:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  return (
    <>
      {/* Account Information */}
      <SettingsSection
        title={t('accountInformation')}
        description={t('accountInformationDesc')}
        className="mb-6"
      >
        <form onSubmit={accountForm.handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormInput
              {...accountForm.getFieldProps('firstName')}
              label={t('firstName')}
              required
            />
            <FormInput
              {...accountForm.getFieldProps('lastName')}
              label={t('lastName')}
              required
            />
          </div>
          
          <div className="mt-5">
            <FormInput
              {...accountForm.getFieldProps('email')}
              type="email"
              label={t('emailAddress')}
              hint={t('emailNote')}
              required
            />
          </div>
          
          <div className="mt-5">
            <FormInput
              {...accountForm.getFieldProps('phone')}
              type="tel"
              label={t('phoneNumber')}
            />
          </div>
          
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              variant="primary"
              loading={accountForm.isSubmitting}
              disabled={!accountForm.isDirty}
            >
              {t('saveChanges')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={accountForm.reset}
              disabled={!accountForm.isDirty || accountForm.isSubmitting}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </SettingsSection>

      {/* Preferences */}
      <SettingsSection
        title={t('preferences')}
        description={t('preferencesDesc')}
      >
        <form onSubmit={preferencesForm.handleSubmit}>
          <div className="space-y-6">
            <div className="form-group">
              <label htmlFor="language" className="block text-sm font-medium mb-3">
                {t('language')}
              </label>
              <select
                id="language"
                name="language"
                value={preferencesForm.values.language}
                onChange={(e) => preferencesForm.handleChange('language', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50"
              >
                {LANGUAGE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="timezone" className="block text-sm font-medium mb-3">
                {t('timezone')}
              </label>
              <select
                id="timezone"
                name="timezone"
                value={preferencesForm.values.timezone}
                onChange={(e) => preferencesForm.handleChange('timezone', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50"
              >
                {TIMEZONE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {t(option.labelKey)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="dateFormat" className="block text-sm font-medium mb-3">
                {t('dateFormat')}
              </label>
              <select
                id="dateFormat"
                name="dateFormat"
                value={preferencesForm.values.dateFormat}
                onChange={(e) => preferencesForm.handleChange('dateFormat', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50"
              >
                {DATE_FORMAT_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              variant="primary"
              loading={preferencesForm.isSubmitting}
              disabled={!preferencesForm.isDirty}
            >
              {t('saveChanges')}
            </Button>
          </div>
        </form>
      </SettingsSection>
    </>
  );
});

GeneralSettings.displayName = 'GeneralSettings';

export default GeneralSettings;