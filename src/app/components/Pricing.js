'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';

const Pricing = React.memo(() => {
  const { t } = usePageTranslations('home');

  const plans = [
    {
      name: t('starter'),
      price: '$29',
      period: '/month',
      description: t('starterDesc'),
      features: [
        'Up to 2 business profiles',
        'Basic templates & customization',
        '1,000 monthly transactions',
        'Email support',
        'Basic analytics'
      ],
      featured: false
    },
    {
      name: t('professional'),
      price: '$79',
      period: '/month',
      description: t('professionalDesc'),
      features: [
        'Up to 5 business profiles',
        'Advanced templates & full customization',
        '10,000 monthly transactions',
        'Priority support',
        'Advanced analytics & reports',
        'Team collaboration (5 users)',
        'API access'
      ],
      featured: true
    },
    {
      name: t('enterprise'),
      price: t('custom'),
      period: '',
      description: t('enterpriseDesc'),
      features: [
        'Unlimited business profiles',
        'Custom development',
        'Unlimited transactions',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited users',
        'SLA guarantee'
      ],
      featured: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="section-header">
        <h2>
          {t('simpleTransparentPricing')} <span className="gradient-text">{t('pricingWord')}</span>
        </h2>
        <p>
          {t('choosePlanForBusiness')}
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
          >
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">
              {plan.price}<span>{plan.period}</span>
            </div>
            <div className="plan-description">{plan.description}</div>

            <ul className="plan-features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>

            <Link
              href="/register"
              className={plan.featured ? 'cta-button primary-cta' : 'cta-button'}
            >
              {plan.name === t('enterprise') ? t('contactSales') : t('getStarted')}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
});

Pricing.displayName = 'Pricing';

export default Pricing;