'use client';

import Link from 'next/link';

const CTASection = () => {

  return (
    <section className="cta-section">
      <div className="cta-content">
        <h2>
          Ready to Transform Your Business?
        </h2>
        <p>
          Join thousands of businesses already using ChameleonApp to streamline their operations and grow faster.
        </p>
        
        <Link href="/register" className="cta-button primary-cta">
          Start Your Free 14-Day Trial
        </Link>
        
        <p style={{ marginTop: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          No credit card required • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTASection;