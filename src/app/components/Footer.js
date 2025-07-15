'use client';

import React from 'react';
import Link from 'next/link';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/Footer.module.css';

const Footer = React.memo(() => {
  const { t } = usePageTranslations('home');

  const footerLinks = {
    product: [
      { label: t('featuresTitle'), href: '#features' },
      { label: t('pricing'), href: '#pricing' },
      { label: t('templates'), href: '#' },
      { label: t('integrations'), href: '#' },
      { label: t('apiDocumentation'), href: '#' }
    ],
    company: [
      { label: t('aboutUs'), href: '#' },
      { label: t('careers'), href: '#' },
      { label: t('blog'), href: '#' },
      { label: t('press'), href: '#' },
      { label: t('contactUs'), href: '#' }
    ],
    support: [
      { label: t('helpCenter'), href: '#' },
      { label: t('community'), href: '#' },
      { label: t('status'), href: '#' },
      { label: t('termsOfService'), href: '#' },
      { label: t('privacyPolicy'), href: '#' }
    ]
  };

  const socialLinks = [
    { text: 'f', href: '#', label: 'Facebook' },
    { text: 't', href: '#', label: 'Twitter' },
    { text: 'in', href: '#', label: 'LinkedIn' },
    { text: 'ig', href: '#', label: 'Instagram' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Brand Column */}
        <div className={styles.footerBrand}>
          <h3>
            BusinessHub
          </h3>
          <p>
            {t('footerDescription')}
          </p>
          <div className={styles.socialLinks}>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className={styles.socialLink}
              >
                {social.text}
              </a>
            ))}
          </div>
        </div>

        {/* Product Links */}
        <div className={styles.footerLinks}>
          <h4>{t('product')}</h4>
          <ul>
            {footerLinks.product.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div className={styles.footerLinks}>
          <h4>{t('company')}</h4>
          <ul>
            {footerLinks.company.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Links */}
        <div className={styles.footerLinks}>
          <h4>{t('support')}</h4>
          <ul>
            {footerLinks.support.map((link, index) => (
              <li key={index}>
                <Link href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>


      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <p>
          © 2025 BusinessHub. {t('allRightsReserved')} {t('madeWithLove')}
        </p>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';

export default Footer;