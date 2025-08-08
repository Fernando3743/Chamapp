'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Navigation({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Add scroll effect to navigation
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    
    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setIsDropdownOpen(false)
    router.push('/')
  }

  return (
    <nav className={`fixed top-0 w-full z-[1000] ${scrolled ? 'glass-darker' : 'glass'} transition-all duration-300`} id="navbar">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer">
            BusinessHub
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <a href="#features" className="text-white/80 hover:text-white font-medium transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gradient group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#solutions" className="text-white/80 hover:text-white font-medium transition-colors relative group">
              Solutions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gradient group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#pricing" className="text-white/80 hover:text-white font-medium transition-colors relative group">
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gradient group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#testimonials" className="text-white/80 hover:text-white font-medium transition-colors relative group">
              Testimonials
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gradient group-hover:w-full transition-all duration-300"></span>
            </a>
            <a href="#faq" className="text-white/80 hover:text-white font-medium transition-colors relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-gradient group-hover:w-full transition-all duration-300"></span>
            </a>
            {user ? (
              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 glass rounded-full hover:bg-white/10 transition-all duration-300"
                  aria-label="User menu"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="w-10 h-10 rounded-full bg-primary-gradient flex items-center justify-center text-white font-semibold">
                    {user.email ? user.email[0].toUpperCase() : 'U'}
                  </div>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 glass rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                    <div className="p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-white font-semibold text-lg">
                          {user.email ? user.email[0].toUpperCase() : 'U'}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{user.email?.split('@')[0] || 'User'}</p>
                          <p className="text-sm text-white/60">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <Link 
                        href="/dashboard" 
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          <span>Dashboard</span>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/settings" 
                        className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>Settings</span>
                        </div>
                      </Link>
                      
                      <div className="my-2 border-t border-white/10"></div>
                      
                      <button 
                        onClick={handleSignOut}
                        className="w-full px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          <span>Sign Out</span>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/signin" className="inline-block px-7 py-3 glass rounded-full font-semibold hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300">
                  Sign In
                </Link>
                <Link href="/register" className="relative inline-block px-7 py-3 bg-primary-gradient rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300">
                  Get Started
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-semibold">New</span>
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden flex flex-col gap-1 cursor-pointer" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`}></span>
          </button>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden ${isMobileMenuOpen ? '' : 'hidden'} mobile-menu mt-5 pb-5`}>
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-white/80 hover:text-white font-medium py-2">Features</a>
            <a href="#solutions" className="text-white/80 hover:text-white font-medium py-2">Solutions</a>
            <a href="#pricing" className="text-white/80 hover:text-white font-medium py-2">Pricing</a>
            <a href="#testimonials" className="text-white/80 hover:text-white font-medium py-2">Testimonials</a>
            <a href="#faq" className="text-white/80 hover:text-white font-medium py-2">FAQ</a>
            {user ? (
              <>
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
                  <Link href="/dashboard" className="block px-4 py-3 glass rounded-xl text-center mb-2 hover:bg-white/10 transition-all">Dashboard</Link>
                  <Link href="/settings" className="block px-4 py-3 glass rounded-xl text-center mb-2 hover:bg-white/10 transition-all">Settings</Link>
                  <button 
                    onClick={handleSignOut}
                    className="block w-full px-4 py-3 bg-primary-gradient rounded-xl font-semibold hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all text-center"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/signin" className="inline-block px-7 py-3 glass rounded-full font-semibold hover:bg-white/20 transition-all text-center">Sign In</Link>
                <Link href="/register" className="inline-block px-7 py-3 bg-primary-gradient rounded-full font-semibold hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all text-center">Get Started</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}