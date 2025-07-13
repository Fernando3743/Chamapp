'use client';

import Link from 'next/link';
import { usePageTranslations } from '../../hooks/usePageTranslations';

const CTASection = () => {
  const { t } = usePageTranslations('home');

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>
          {t('readyToTransform')}
        </h2>
        <p>
          {t('joinThousands')}
        </p>
        
        <Link href="/register" className="cta-button primary-cta">
          {t('startFreeTrial')}
        </Link>
        
        <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          {t('noCreditCard')} • {t('cancelAnytime')}
        </p>
      </div>
    </section>
  );
};

export default CTASection;