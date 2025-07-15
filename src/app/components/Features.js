'use client';

import React from 'react';
import { Zap, Globe, Users, BarChart3, Shield, Smartphone } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/Features.module.css';

const Features = React.memo(() => {
  const { t } = usePageTranslations('home');

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t('customTemplates'),
      description: t('customTemplatesDesc')
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: t('advancedAnalytics'),
      description: t('advancedAnalyticsDesc')
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('enterpriseSecurity'),
      description: t('enterpriseSecurityDesc')
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('seamlessIntegration'),
      description: t('seamlessIntegrationDesc')
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('teamCollaboration'),
      description: t('teamCollaborationDesc')
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('instantDeployment'),
      description: t('instantDeploymentDesc')
    }
  ];

  return (
    <section className={styles.features} id="features">
      <div className={styles.sectionHeader}>
        <h2>
          {t('everythingYouNeed')} <span className={styles.gradientText}>{t('nothingYouDont')}</span>
        </h2>
        <p>
          {t('powerfulFeatures')}
        </p>
      </div>
      
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <div className={styles.featureIcon}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
});

Features.displayName = 'Features';

export default Features;