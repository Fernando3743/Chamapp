'use client';

import { Home, Scissors, Utensils, Dumbbell, Heart, Briefcase } from 'lucide-react';

const BusinessTypes = () => {

  const businessTypes = [
    {
      icon: <Home className="w-12 h-12" />,
      title: 'Real Estate',
      features: [
        'Property listings management',
        'Virtual tours & galleries',
        'Client CRM & follow-ups',
        'Document management',
        'Commission tracking'
      ]
    },
    {
      icon: <Scissors className="w-12 h-12" />,
      title: 'Barber Shops',
      features: [
        'Online appointment booking',
        'Staff scheduling',
        'Customer feedback system',
        'Inventory management',
        'Loyalty programs'
      ]
    },
    {
      icon: <Utensils className="w-12 h-12" />,
      title: 'Restaurants',
      features: [
        'Digital menu with QR codes',
        'Table reservations',
        'Order management',
        'Kitchen display system',
        'Delivery integration'
      ]
    },
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: 'Fitness & Sports',
      features: [
        'Member management',
        'Class scheduling',
        'Personal training bookings',
        'Payment processing',
        'Progress tracking'
      ]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Health & Wellness',
      features: [
        'Patient appointments',
        'Medical records',
        'Prescription management',
        'Billing & insurance',
        'Telemedicine support'
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: 'Professional Services',
      features: [
        'Inventory tracking',
        'POS integration',
        'Customer database',
        'Sales analytics',
        'Multi-channel selling'
      ]
    }
  ];

  return (
    <section className="business-types" id="solutions">
      <div className="section-header">
        <h2>
          Solutions for <span className="gradient-text">Every Industry</span>
        </h2>
        <p>
          Pre-built solutions tailored to your specific business needs
        </p>
      </div>

      <div className="business-showcase">
        {businessTypes.map((business, index) => (
          <div key={index} className="business-card glass-card">
            <div className="business-card-icon">
              {business.icon}
            </div>
            
            <h3>{business.title}</h3>
            
            <ul>
              {business.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessTypes;