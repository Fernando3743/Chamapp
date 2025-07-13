'use client'

import Link from 'next/link'
import { usePageTranslations } from '../../hooks/usePageTranslations';

export default function Hero() {
  const { t } = usePageTranslations('home');
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>{t('heroTitle')} <span className="gradient-text">{t('heroTitleHighlight')}</span></h1>
          <p>{t('heroSubtitle')}</p>
          <div className="hero-buttons">
            <Link href="/register" className="cta-button primary-cta">
              {t('startYourBusiness')}
            </Link>
            <Link href="#demo" className="cta-button">
              {t('watchDemo')}
            </Link>
          </div>
          <div className="trust-indicators">
            <div className="trust-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{t('noCreditCard')}</span>
            </div>
            <div className="trust-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{t('startFreeTrial')}</span>
            </div>
            <div className="trust-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>{t('cancelAnytime')}</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glass-card">
            <h3>{t('yourBusinesses')}</h3>
            <div className="business-preview">
              <div className="business-type">
                <div className="business-icon">🏠</div>
                <div className="business-info">
                  <h3>{t('realEstatePro')}</h3>
                  <p>{t('realEstateProDesc')}</p>
                </div>
              </div>
              <div className="business-type">
                <div className="business-icon">✂️</div>
                <div className="business-info">
                  <h3>{t('barberShopManager')}</h3>
                  <p>{t('barberShopManagerDesc')}</p>
                </div>
              </div>
              <div className="business-type">
                <div className="business-icon">🍔</div>
                <div className="business-info">
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