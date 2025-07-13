'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'How quickly can I get started?',
      answer: 'You can get started immediately! After signing up, you\'ll have access to our template library. Most businesses are up and running within 15 minutes using our pre-built templates. Customization can be done at your own pace.'
    },
    {
      question: 'Do I need technical knowledge to use ChameleonApp?',
      answer: 'Not at all! ChameleonApp is designed for business owners, not developers. Our drag-and-drop interface and pre-built templates make it easy for anyone to create professional business applications without any coding knowledge.'
    },
    {
      question: 'Can I manage multiple businesses from one account?',
      answer: 'Yes! Depending on your plan, you can manage multiple business profiles from a single account. Each business gets its own dashboard, branding, and settings while you maintain centralized control.'
    },
    {
      question: 'What kind of support do you offer?',
      answer: 'We offer comprehensive support including detailed documentation, video tutorials, email support for all plans, and priority phone support for Professional and Enterprise plans. Enterprise customers also get a dedicated account manager.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use bank-level 256-bit SSL encryption, regular security audits, and comply with GDPR and other data protection regulations. Your data is backed up daily and stored in secure, redundant data centers.'
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
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p>
            Everything you need to know about ChameleonApp
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
};

export default FAQ;