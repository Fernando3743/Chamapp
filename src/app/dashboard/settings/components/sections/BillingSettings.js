"use client";

import { memo, useCallback, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";
import { settingsTranslations } from "@/lib/translations/pages/settings";
import SettingsSection from "../shared/SettingsSection";
import FormInput from "../shared/FormInput";
import Button from "../shared/Button";
import { useSettingsForm } from "../../hooks/useSettingsForm";
import { validatePaymentMethod } from "../../utils/validation";
import { SUBSCRIPTION_PLANS } from "../../constants";

const PlanCard = memo(({ plan, currentPlan, onSelect }) => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const isCurrentPlan = currentPlan === plan.id;

  return (
    <div 
      className={`
        bg-white/5 border rounded-xl p-6 transition-all duration-300 cursor-pointer
        hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)]
        ${plan.recommended ? 'border-blue-400/50 bg-blue-400/10' : 'border-[rgba(255,255,255,0.2)]'}
        ${isCurrentPlan ? 'relative' : ''}
      `}
    >
      {(isCurrentPlan || plan.recommended) && (
        <span className="absolute top-4 right-4 px-3 py-1 bg-primary-gradient rounded-full text-xs font-semibold text-white">
          {isCurrentPlan ? t('currentPlan') : t('recommended')}
        </span>
      )}
      
      <div className="text-xl font-semibold mb-3">{t(plan.nameKey)}</div>
      <div className="text-4xl font-bold mb-1 gradient-text">${plan.price}</div>
      <div className="text-sm text-text-secondary mb-5">{t('perMonth')}</div>
      
      <ul className="space-y-3 mb-6">
        {plan.features.map(feature => (
          <li key={feature} className="text-sm flex items-center gap-3">
            <span className="text-green-400">✓</span>
            {t(feature)}
          </li>
        ))}
      </ul>
      
      <Button
        variant={isCurrentPlan ? "primary" : "secondary"}
        fullWidth
        onClick={() => onSelect(plan.id)}
        disabled={isCurrentPlan}
      >
        {isCurrentPlan ? t('currentPlan') : plan.price > 79 ? t('upgrade') : t('selectPlan')}
      </Button>
    </div>
  );
});

PlanCard.displayName = 'PlanCard';

const BillingSettings = memo(() => {
  const { language } = useLanguage();
  const t = useCallback(
    (key) =>
      settingsTranslations[key]?.[language] ||
      settingsTranslations[key]?.en ||
      key,
    [language]
  );

  const [currentPlan] = useState('professional');

  // Payment method form
  const paymentForm = useSettingsForm({
    initialValues: {
      cardNumber: '•••• •••• •••• 4242',
      expiryDate: '12/25',
      cvv: '•••'
    },
    validate: validatePaymentMethod,
    onSubmit: async (values) => {
      // TODO: Implement API call to update payment method
      console.log('Updating payment method:', values);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  });

  const handlePlanSelect = useCallback((planId) => {
    // TODO: Implement plan selection
    console.log('Selected plan:', planId);
  }, []);

  const handleAddNewCard = useCallback(() => {
    // TODO: Implement add new card functionality
    console.log('Add new card clicked');
  }, []);

  // Mock billing history
  const billingHistory = [
    { date: 'Dec 1, 2024', description: 'Professional Plan - Monthly', amount: '$79.00', status: 'paid' },
    { date: 'Nov 1, 2024', description: 'Professional Plan - Monthly', amount: '$79.00', status: 'paid' },
    { date: 'Oct 1, 2024', description: 'Professional Plan - Monthly', amount: '$79.00', status: 'paid' }
  ];

  return (
    <>
      {/* Current Plan */}
      <SettingsSection
        title={t('currentPlan')}
        description={t('currentPlanDesc')}
        className="mb-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
          {SUBSCRIPTION_PLANS.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentPlan={currentPlan}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>
      </SettingsSection>

      {/* Payment Method */}
      <SettingsSection
        title={t('paymentMethod')}
        description={t('paymentMethodDesc')}
        className="mb-6"
      >
        <form onSubmit={paymentForm.handleSubmit}>
          <div className="space-y-5">
            <FormInput
              {...paymentForm.getFieldProps('cardNumber')}
              label={t('cardNumber')}
              placeholder="1234 5678 9012 3456"
              required
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormInput
                {...paymentForm.getFieldProps('expiryDate')}
                label={t('expiryDate')}
                placeholder="MM/YY"
                required
              />
              <FormInput
                {...paymentForm.getFieldProps('cvv')}
                label="CVV"
                placeholder="123"
                type="password"
                required
              />
            </div>
          </div>
          
          <div className="flex gap-4 mt-8">
            <Button
              type="submit"
              variant="primary"
              loading={paymentForm.isSubmitting}
            >
              {t('updatePaymentMethod')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddNewCard}
            >
              {t('addNewCard')}
            </Button>
          </div>
        </form>
      </SettingsSection>

      {/* Billing History */}
      <SettingsSection
        title={t('billingHistory')}
        description={t('billingHistoryDesc')}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-4 text-sm font-medium">{t('date')}</th>
                <th className="text-left py-4 text-sm font-medium">{t('description')}</th>
                <th className="text-left py-4 text-sm font-medium">{t('amount')}</th>
                <th className="text-left py-4 text-sm font-medium">{t('status')}</th>
                <th className="text-left py-4 text-sm font-medium">{t('invoice')}</th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((item, index) => (
                <tr 
                  key={index} 
                  className={index < billingHistory.length - 1 ? 'border-b border-white/5' : ''}
                >
                  <td className="py-5 text-sm">{item.date}</td>
                  <td className="py-5 text-sm">{item.description}</td>
                  <td className="py-5 text-sm">{item.amount}</td>
                  <td className="py-5 text-sm">
                    <span className="text-green-400">{t(item.status)}</span>
                  </td>
                  <td className="py-5 text-sm">
                    <button 
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={() => console.log('Download invoice:', index)}
                    >
                      {t('download')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsSection>
    </>
  );
});

BillingSettings.displayName = 'BillingSettings';

export default BillingSettings;