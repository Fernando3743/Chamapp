'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSmoothScroll = (e) => {
    e.preventDefault()
    const targetId = e.target.getAttribute('href')
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <nav 
      style={{
        background: scrolled ? 'rgba(255, 255, 255, 0.08)' : undefined,
        backdropFilter: scrolled ? 'blur(30px)' : undefined,
        borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.15)' : undefined
      }}
    >
      <div className="nav-container">
        <div className="nav-left">
          <Link href="/" className="logo">
            BusinessHub
          </Link>
          
          <div className={`nav-links ${mobileMenuOpen ? 'show' : ''}`}>
            <a href="#features" onClick={handleSmoothScroll}>Features</a>
            <a href="#solutions" onClick={handleSmoothScroll}>Solutions</a>
            <a href="#pricing" onClick={handleSmoothScroll}>Pricing</a>
            <a href="#testimonials" onClick={handleSmoothScroll}>Testimonials</a>
            <a href="#faq" onClick={handleSmoothScroll}>FAQ</a>
            <Link href="/login" className="cta-button" onClick={handleSmoothScroll}>
              Sign In
            </Link>
            <Link href="/register" className="cta-button primary-cta" onClick={handleSmoothScroll} style={{ position: 'relative' }}>
              Get Started
              <span className="notification-badge">New</span>
            </Link>
          </div>
        </div>
        
        <div className="nav-right">
          <Link href="/login" className="cta-button">
            Sign In
          </Link>
          <Link href="/register" className="cta-button primary-cta" style={{ position: 'relative' }}>
            Get Started
            <span className="notification-badge">New</span>
          </Link>
          
          <button 
            className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  )
}