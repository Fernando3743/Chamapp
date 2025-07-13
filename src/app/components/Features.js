'use client';

import { Zap, Globe, Users, BarChart3, Shield, Smartphone } from 'lucide-react';

const Features = () => {

  const features = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Custom Templates',
      description: 'Industry-specific templates to get you started in minutes. Fully customizable to match your brand.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Advanced Analytics',
      description: 'Real-time insights and reports to help you make data-driven decisions for your business.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and security measures to keep your business data safe and compliant.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Seamless Integration',
      description: 'Connect with your favorite tools and services. Import/export data with ease.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Team Collaboration',
      description: 'Invite team members, assign roles, and collaborate in real-time across all your businesses.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Instant Deployment',
      description: 'Go live instantly with QR codes, booking pages, and customer portals ready to use.'
    }
  ];

  return (
    <section className="features" id="features">
      <div className="section-header">
        <h2>
          Everything You Need, <span className="gradient-text">Nothing You Don&apos;t</span>
        </h2>
        <p>
          Powerful features designed for modern businesses
        </p>
      </div>
      
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-card glass-card">
            <div className="feature-icon">
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;