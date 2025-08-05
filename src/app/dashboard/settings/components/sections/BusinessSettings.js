"use client";

import { memo, useCallback, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import ToggleSwitch from "../shared/ToggleSwitch";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import { validateBusinessInfo } from "../../utils/validation";
import { BUSINESS_TYPES, DAYS_OF_WEEK } from "../../constants";

const BusinessSettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  // Business hours state
  const [businessHours, setBusinessHours] = useState(
    DAYS_OF_WEEK.reduce((acc, day) => ({
      ...acc,
      [day.key]: {
        isOpen: day.isOpen,
        hours: day.defaultHours
      }
    }), {})
  );

  // Business Information Form
  const businessForm = useSettingsForm({
    initialValues: {
      businessName: 'Elite Beauty Salon',
      businessType: 'beautySalon',
      businessPhone: '+1 (555) 987-6543',
      businessAddress: '123 Main Street, Suite 100',
      city: 'New York',
      state: 'NY',
      businessDescription: 'Elite Beauty Salon offers premium hair care, nail services, and spa treatments in a luxurious setting. Our experienced team is dedicated to making you look and feel your best.'
    },
    validate: validateBusinessInfo,
    onSubmit: async (values) => {
      // TODO: Implement API call to save business info
      console.log('Saving business info:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  const handleLogoUpload = useCallback(() => {
    // TODO: Implement logo upload functionality
    console.log('Upload logo clicked');
  }, []);

  const handleHoursToggle = useCallback((day, isOpen) => {
    setBusinessHours(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen
      }
    }));
  }, []);

  return (
    <>
      {/* Business Information */}
      <SettingsSection
        title={t('businessInformation')}
        description={t('businessInformationDesc')}
        className="mb-6"
      >
        <form onSubmit={businessForm.handleSubmit}>
          {/* Logo Upload */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
            <div className="w-30 h-30 rounded-full bg-primary-gradient flex items-center justify-center text-5xl font-bold text-white">
              BH
            </div>
            <div className="flex-1 text-center md:text-left">
              <Button
                type="button"
                variant="secondary"
                onClick={handleLogoUpload}
                className="mb-3"
              >
                {t('uploadLogo')}
              </Button>
              <p className="text-xs text-text-secondary">{t('logoRecommendation')}</p>
            </div>
          </div>

          {/* Business Details */}
          <div className="space-y-5">
            <FormInput
              {...businessForm.getFieldProps('businessName')}
              label={t('businessName')}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-group">
                <label htmlFor="businessType" className="block text-sm font-medium mb-3">
                  {t('businessType')}
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={businessForm.values.businessType}
                  onChange={(e) => businessForm.handleChange('businessType', e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50"
                  required
                >
                  {BUSINESS_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {t(type.labelKey)}
                    </option>
                  ))}
                </select>
              </div>

              <FormInput
                {...businessForm.getFieldProps('businessPhone')}
                type="tel"
                label={t('businessPhone')}
                required
              />
            </div>

            <FormInput
              {...businessForm.getFieldProps('businessAddress')}
              label={t('businessAddress')}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                {...businessForm.getFieldProps('city')}
                label={t('city')}
                required
              />
              <FormInput
                {...businessForm.getFieldProps('state')}
                label={t('state')}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="businessDescription" className="block text-sm font-medium mb-3">
                {t('businessDescription')}
              </label>
              <textarea
                id="businessDescription"
                name="businessDescription"
                value={businessForm.values.businessDescription}
                onChange={(e) => businessForm.handleChange('businessDescription', e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-[rgba(255,255,255,0.2)] rounded-xl text-white text-sm transition-all duration-300 focus:outline-none focus:bg-white/8 focus:border-blue-400/50 resize-y min-h-[100px]"
                rows="4"
              />
              {businessForm.errors.businessDescription && businessForm.touched.businessDescription && (
                <p className="text-xs text-red-400 mt-2">{businessForm.errors.businessDescription}</p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              variant="primary"
              loading={businessForm.isSubmitting}
              disabled={!businessForm.isDirty}
            >
              {t('saveChanges')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={businessForm.reset}
              disabled={!businessForm.isDirty || businessForm.isSubmitting}
            >
              {t('cancel')}
            </Button>
          </div>
        </form>
      </SettingsSection>

      {/* Business Hours */}
      <SettingsSection
        title={t('businessHours')}
        description={t('businessHoursDesc')}
      >
        <div className="space-y-4">
          {DAYS_OF_WEEK.map((day, index) => (
            <div
              key={day.key}
              className={`${index < DAYS_OF_WEEK.length - 1 ? 'border-b border-white/10' : ''}`}
            >
              <ToggleSwitch
                id={`hours-${day.key}`}
                name={`hours-${day.key}`}
                checked={businessHours[day.key].isOpen}
                onChange={(checked) => handleHoursToggle(day.key, checked)}
                label={t(day.key)}
                description={businessHours[day.key].isOpen ? day.defaultHours : t('closed')}
              />
            </div>
          ))}
        </div>
      </SettingsSection>
    </>
  );
});

BusinessSettings.displayName = 'BusinessSettings';

export default BusinessSettings;