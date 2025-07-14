'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';

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
    <section className="faq" id="faq">
      <div className="faq-container">
        <div className="section-header">
          <h2>
            {t('frequentlyAsked')} <span className="gradient-text">{t('questions')}</span>
          </h2>
          <p>
            {t('everythingAboutChameleonApp')}
          </p>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <h3>{faq.question}</h3>
                <Plus
                  className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                    activeIndex === index ? 'rotate-45' : ''
                  }`}
                />
              </button>
              
              <div className="faq-answer">
                <div className="faq-answer-content">
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