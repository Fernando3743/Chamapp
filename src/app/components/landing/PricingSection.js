'use client'

import Link from 'next/link'

export default function PricingSection() {
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
      buttonText: 'Get Started',
      buttonStyle: 'glass',
      popular: false
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
      buttonText: 'Get Started',
      buttonStyle: 'bg-primary-gradient',
      popular: true
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
      buttonText: 'Contact Sales',
      buttonStyle: 'glass',
      popular: false
    }
  ]

  return (
    <section className="py-24 bg-white/[0.02] px-6 lg:px-12" id="pricing">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-lg text-white/80">Choose the plan that fits your business needs</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`glass rounded-3xl p-10 ${plan.popular ? 'border-purple-500/50 scale-105' : ''} relative hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300`}
            >
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-gradient px-5 py-1 rounded-full text-xs font-semibold">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
              <div className="text-5xl font-bold gradient-text mb-2">
                {plan.price}
                {plan.period && <span className="text-lg text-white/80">{plan.period}</span>}
              </div>
              <p className="text-white/80 mb-8">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-white/80">
                    <span className="text-green-400 font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              {plan.name === 'Enterprise' ? (
                <button className={`w-full py-3 ${plan.buttonStyle} rounded-full font-semibold hover:bg-white/20 transition-all duration-300`}>
                  {plan.buttonText}
                </button>
              ) : (
                <Link 
                  href="/register" 
                  className={`block w-full py-3 ${plan.buttonStyle} rounded-full font-semibold ${
                    plan.popular 
                      ? 'hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)]' 
                      : 'hover:bg-white/20'
                  } transition-all duration-300 text-center`}
                >
                  {plan.buttonText}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}