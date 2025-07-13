'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';

const Pricing = () => {

  const plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      description: 'Perfect for small businesses just getting started',
      features: [
        'Up to 2 business profiles',
        'Basic templates & customization',
        '1,000 monthly transactions',
        'Email support',
        'Basic analytics'
      ],
      featured: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Most popular choice for growing businesses',
      features: [
        'Up to 5 business profiles',
        'Advanced templates & full customization',
        '10,000 monthly transactions',
        'Priority support',
        'Advanced analytics & reports',
        'Team collaboration (5 users)',
        'API access'
      ],
      featured: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Unlimited business profiles',
        'Custom development',
        'Unlimited transactions',
        'Dedicated account manager',
        'Custom integrations',
        'Unlimited users',
        'SLA guarantee'
      ],
      featured: false
    }
  ];

  return (
    <section className="pricing" id="pricing">
      <div className="section-header">
        <h2>
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <p>
          Choose the plan that fits your business needs
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card ${plan.featured ? 'featured' : ''}`}
          >
            <div className="plan-name">{plan.name}</div>
            <div className="plan-price">
              {plan.price}<span>{plan.period}</span>
            </div>
            <div className="plan-description">{plan.description}</div>

            <ul className="plan-features">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>

            <Link
              href="/register"
              className={plan.featured ? 'cta-button primary-cta' : 'cta-button'}
            >
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;