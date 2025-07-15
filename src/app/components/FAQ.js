'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/FAQ.module.css';

const FAQ = React.memo(() => {
  const { t } = usePageTranslations('home');
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer')
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer')
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer')
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer')
    },
    {
      question: t('faq5Question'),
      answer: t('faq5Answer')
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faq} id="faq">
      <div className={styles.faqContainer}>
        <div className={styles.sectionHeader}>
          <h2>
            {t('frequentlyAsked')} <span className={styles.gradientText}>{t('questions')}</span>
          </h2>
          <p>
            {t('everythingAboutChameleonApp')}
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <Plus
                  className={`${styles.faqIcon} ${
                    activeIndex === index ? styles.active : ''
                  }`}
                />
              </button>
              
              <div className={styles.faqAnswer}>
                <div className={styles.faqAnswerContent}>
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

export default FAQ;