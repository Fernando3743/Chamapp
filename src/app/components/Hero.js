'use client'

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>One Platform, <span className="gradient-text">Infinite Business Solutions</span></h1>
          <p>Transform your business with our all-in-one software platform. From real estate to barbershops, we provide everything you need to run, manage, and grow your business.</p>
          <div className="hero-buttons">
            <Link href="/register" className="cta-button primary-cta">
              Start Free Trial
            </Link>
            <Link href="#demo" className="cta-button">
              Watch Demo
            </Link>
          </div>
          <div className="trust-indicators">
            <div className="trust-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="trust-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>14-day free trial</span>
            </div>
            <div className="trust-item">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="glass-card">
            <h3>Your Businesses</h3>
            <div className="business-preview">
              <div className="business-type">
                <div className="business-icon">🏠</div>
                <div className="business-info">
                  <h3>Real Estate Pro</h3>
                  <p>Property management & CRM</p>
                </div>
              </div>
              <div className="business-type">
                <div className="business-icon">✂️</div>
                <div className="business-info">
                  <h3>BarberShop Manager</h3>
                  <p>Appointments & inventory</p>
                </div>
              </div>
              <div className="business-type">
                <div className="business-icon">🍔</div>
                <div className="business-info">
                  <h3>Restaurant Suite</h3>
                  <p>Orders & table management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}