'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'
import UserDropdown from './UserDropdown'

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#faq', label: 'FAQ' }
]

export default function Navigation() {
  const { user, signOut } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    // Add scroll effect to navigation
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <nav 
      className={`fixed top-0 w-full z-[1000] ${scrolled ? 'glass-darker' : 'glass'} transition-all duration-300`} 
      id="navbar"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text">
            BusinessHub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-white/80 hover:text-white font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gradient group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            
            {user ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 glass rounded-full hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                  aria-label="User menu"
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-semibold">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                <UserDropdown 
                  user={user} 
                  isOpen={isDropdownOpen} 
                  onClose={() => setIsDropdownOpen(false)}
                />
              </>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="inline-block px-7 py-3 glass rounded-full font-semibold hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="relative inline-block px-7 py-3 bg-primary-gradient rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Get Started
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold" aria-label="New feature">
                    New
                  </span>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden flex flex-col gap-1 focus:outline-none focus:ring-2 focus:ring-white/20 p-2 rounded-lg" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden ${isMobileMenuOpen ? '' : 'hidden'} mobile-menu mt-5 pb-5`}
          role="menu"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <a 
                key={link.href}
                href={link.href} 
                className="text-white/80 hover:text-white font-medium py-2"
                role="menuitem"
              >
                {link.label}
              </a>
            ))}
            
            {user ? (
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-semibold text-lg">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.email?.split('@')[0] || 'User'}</p>
                    <p className="text-sm text-white/60">{user.email}</p>
                  </div>
                </div>
                <Link 
                  href="/dashboard" 
                  className="block px-4 py-3 glass rounded-xl text-center mb-2 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/settings" 
                  className="block px-4 py-3 glass rounded-xl text-center mb-2 hover:bg-white/10 transition-all focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Settings
                </Link>
                <button 
                  onClick={signOut}
                  className="block w-full px-4 py-3 bg-primary-gradient rounded-xl font-semibold hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all text-center focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <>
                <Link 
                  href="/signin" 
                  className="inline-block px-7 py-3 glass rounded-full font-semibold hover:bg-white/20 transition-all text-center focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register" 
                  className="inline-block px-7 py-3 bg-primary-gradient rounded-full font-semibold hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all text-center focus:outline-none focus:ring-2 focus:ring-white/20"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}