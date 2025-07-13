'use client';

import { Zap, Globe, Users, BarChart3, Shield, Smartphone } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';

const Features = () => {
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
    <section className="features" id="features">
      <div className="section-header">
        <h2>
          {t('everythingYouNeed')} <span className="gradient-text">{t('nothingYouDont')}</span>
        </h2>
        <p>
          {t('powerfulFeatures')}
        </p>
      </div>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card glass-card">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;