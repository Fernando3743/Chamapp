'use client'

import { useState } from 'react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How quickly can I get started?',
      answer: "You can get started immediately! After signing up, you'll have access to our template library. Most businesses are up and running within 15 minutes using our pre-built templates. Customization can be done at your own pace."
    },
    {
      question: 'Do I need technical knowledge to use BusinessHub?',
      answer: 'Not at all! BusinessHub is designed for business owners, not developers. Our drag-and-drop interface and pre-built templates make it easy for anyone to create professional business applications without any coding knowledge.'
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
  ]

  const handleFAQClick = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-24 px-6 lg:px-12" id="faq">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-white/80">Everything you need to know about BusinessHub</p>
        </div>
        
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div key={index} className="glass rounded-2xl overflow-hidden">
              <button 
                className="w-full px-8 py-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-white/5 transition-colors duration-300"
                onClick={() => handleFAQClick(index)}
              >
                {faq.question}
                <span className={`text-2xl transition-transform duration-300 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 pb-6 text-white/80 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}