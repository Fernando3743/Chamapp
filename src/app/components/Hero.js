'use client'

import Link from 'next/link'
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/Hero.module.css';

export default function Hero() {
  const { t } = usePageTranslations('home');
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroText}>
          <h1>{t('heroTitle')} <span className={styles.gradientText}>{t('heroTitleHighlight')}</span></h1>
          <p>{t('heroSubtitle')}</p>
          <div className={styles.heroButtons}>
            <Link href="/register" className={`${styles.ctaButton} ${styles.ctaButtonPrimary}`}>
              {t('startYourBusiness')}
            </Link>
            <Link href="#demo" className={styles.ctaButton}>
              {t('watchDemo')}
            </Link>
          </div>
          <div className={styles.trustIndicators}>
            <div className={styles.trustItem}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{t('noCreditCard')}</span>
            </div>
            <div className={styles.trustItem}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{t('startFreeTrial')}</span>
            </div>
            <div className={styles.trustItem}>
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{t('cancelAnytime')}</span>
            </div>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.glassCard}>
            <h3>{t('yourBusinesses')}</h3>
            <div className={styles.businessPreview}>
              <div className={styles.businessType}>
                <div className={styles.businessIcon}>🏠</div>
                <div className={styles.businessInfo}>
                  <h3>{t('realEstatePro')}</h3>
                  <p>{t('realEstateProDesc')}</p>
                </div>
              </div>
              <div className={styles.businessType}>
                <div className={styles.businessIcon}>✂️</div>
                <div className={styles.businessInfo}>
                  <h3>{t('barberShopManager')}</h3>
                  <p>{t('barberShopManagerDesc')}</p>
                </div>
              </div>
              <div className={styles.businessType}>
                <div className={styles.businessIcon}>🍔</div>
                <div className={styles.businessInfo}>
                  <h3>{t('restaurantSuite')}</h3>
                  <p>{t('restaurantSuiteDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}