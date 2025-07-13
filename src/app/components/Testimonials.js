'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';

const Testimonials = () => {
  const { t } = usePageTranslations('home');
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      content: t('testimonial1'),
      author: t('testimonial1Author'),
      role: t('testimonial1Role'),
      avatar: "JD",
      rating: 5
    },
    {
      id: 2,
      content: t('testimonial2'),
      author: t('testimonial2Author'),
      role: t('testimonial2Role'),
      avatar: "MW",
      rating: 5
    },
    {
      id: 3,
      content: t('testimonial3'),
      author: t('testimonial3Author'),
      role: t('testimonial3Role'),
      avatar: "SC",
      rating: 5
    },
    {
      id: 4,
      content: t('testimonial4'),
      author: t('testimonial4Author'),
      role: t('testimonial4Role'),
      avatar: "AL",
      rating: 5
    },
    {
      id: 5,
      content: t('testimonial5'),
      author: t('testimonial5Author'),
      role: t('testimonial5Role'),
      avatar: "RP",
      rating: 5
    }
  ];

  // Duplicate testimonials for seamless scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="testimonials" id="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <h2>
            {t('lovedByThousands')} <span className="gradient-text">{t('thousandsOfBusinesses')}</span>
          </h2>
          <p>
            {t('seeWhatCustomersSay')}
          </p>
        </div>

        <div className="testimonials-track"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div key={`${testimonial.id}-${index}`} className="testimonial-card">
              <div className="rating">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="testimonial-content">
                &ldquo;{testimonial.content}&rdquo;
              </div>
              <div className="testimonial-author">
                <div className="author-avatar">
                  {testimonial.avatar}
                </div>
                <div className="author-info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Testimonials;