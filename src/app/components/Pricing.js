'use client';

import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/Pricing.module.css';

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
    <section className={styles.pricing} id="pricing">
      <div className={styles.sectionHeader}>
        <h2>
          {t('simpleTransparentPricing')} <span className={styles.gradientText}>{t('pricingWord')}</span>
        </h2>
        <p>
          {t('choosePlanForBusiness')}
        </p>
      </div>

      <div className={styles.pricingGrid}>
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`${styles.pricingCard} ${plan.featured ? styles.featured : ''}`}
          >
            <div className={styles.planName}>{plan.name}</div>
            <div className={styles.planPrice}>
              {plan.price}<span>{plan.period}</span>
            </div>
            <div className={styles.planDescription}>{plan.description}</div>

            <ul className={styles.planFeatures}>
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>

            <Link
              href="/register"
              className={plan.featured ? `${styles.ctaButton} ${styles.primaryCta}` : styles.ctaButton}
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