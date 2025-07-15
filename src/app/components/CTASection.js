'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/CTASection.module.css';

const CTASection = React.memo(() => {
  const { t } = usePageTranslations('home');

  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaContent}>
        <h2>
          {t('readyToTransform')}
        </h2>
        <p>
          {t('joinThousands')}
        </p>
        
        <Link href="/register" className={`${styles.ctaButton} ${styles.primaryCta}`}>
          {t('startFreeTrial')}
        </Link>
        
        <p className={styles.disclaimer}>
          {t('noCreditCard')} • {t('cancelAnytime')}
        </p>
      </div>
    </section>
  );
});

CTASection.displayName = 'CTASection';

export default CTASection;