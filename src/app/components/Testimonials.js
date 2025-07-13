'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      content: "BusinessHub transformed how we manage our real estate portfolio. The automation features alone save us 20+ hours per week. Absolutely game-changing!",
      author: "John Davis",
      role: "Real Estate Agency Owner",
      avatar: "JD",
      rating: 5
    },
    {
      id: 2,
      content: "The appointment scheduling system is perfect for our barbershop. Clients love the easy booking process, and we've reduced no-shows by 40%.",
      author: "Marcus Williams",
      role: "Barbershop Owner",
      avatar: "MW",
      rating: 5
    },
    {
      id: 3,
      content: "Managing multiple restaurant locations has never been easier. The real-time analytics help us make better decisions every day.",
      author: "Sarah Chen",
      role: "Restaurant Chain Manager",
      avatar: "SC",
      rating: 5
    },
    {
      id: 4,
      content: "BusinessHub's gym management features are incredible. Member check-ins, class bookings, and payment processing all in one place!",
      author: "Alex Lopez",
      role: "Fitness Center Owner",
      avatar: "AL",
      rating: 5
    },
    {
      id: 5,
      content: "The customization options are endless. We've built exactly what we need for our medical practice without any coding knowledge.",
      author: "Dr. Rachel Park",
      role: "Medical Practice Owner",
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
            Loved by <span className="gradient-text">Thousands of Businesses</span>
          </h2>
          <p>
            See what our customers have to say about ChameleonApp
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