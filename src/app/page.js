'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check authentication status
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    
    checkUser()
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    
    // Smooth scrolling for navigation links
    const handleSmoothScroll = (e) => {
      if (e.target.matches('a[href^="#"]')) {
        e.preventDefault()
        const targetId = e.target.getAttribute('href')
        const target = document.querySelector(targetId)
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }
    }

    // Add scroll effect to navigation
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, observerOptions)

    // Observe elements for animation
    const glassElements = document.querySelectorAll('.glass')
    glassElements.forEach(element => {
      element.style.opacity = '0'
      element.style.transform = 'translateY(30px)'
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
      observer.observe(element)
    })

    // Counter animation for stats
    const animateCounter = (element, target) => {
      let current = 0
      const increment = target / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          current = target
          clearInterval(timer)
        }
        if (target >= 1000000) {
          element.textContent = (current / 1000000).toFixed(0) + 'M+'
        } else if (target >= 1000) {
          element.textContent = (current / 1000).toFixed(0) + 'K+'
        } else if (target % 1 !== 0) {
          element.textContent = current.toFixed(1) + '%'
        } else {
          element.textContent = Math.floor(current)
        }
      }, 20)
    }

    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.animated) {
          entry.target.animated = true
          const statNumber = entry.target.querySelector('.text-5xl')
          const targetText = statNumber.textContent
          let target = 0
          
          if (targetText.includes('K+')) {
            target = parseInt(targetText) * 1000
          } else if (targetText.includes('M+')) {
            target = parseInt(targetText) * 1000000
          } else if (targetText.includes('%')) {
            target = parseFloat(targetText)
          } else if (targetText === '24/7') {
            return
          }
          
          if (target > 0) {
            animateCounter(statNumber, target)
          }
        }
      })
    }, { threshold: 0.5 })

    const statSections = document.querySelectorAll('.stats-section .glass')
    statSections.forEach(stat => {
      statObserver.observe(stat)
    })

    // Event listeners
    document.addEventListener('click', handleSmoothScroll)
    window.addEventListener('scroll', handleScroll)
    
    // Close dropdown when clicking outside
    const handleClickOutside = (e) => {
      if (!e.target.closest('.user-dropdown')) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleSmoothScroll)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
      subscription?.unsubscribe()
    }
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleFAQClick = (e) => {
    const faqItem = e.currentTarget.parentElement
    const answer = faqItem.querySelector('.faq-answer')
    const icon = e.currentTarget.querySelector('span')
    const isActive = faqItem.classList.contains('active')
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
      item.classList.remove('active')
      item.querySelector('.faq-answer').style.maxHeight = '0'
      item.querySelector('.faq-question span').style.transform = 'rotate(0)'
    })
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      faqItem.classList.add('active')
      answer.style.maxHeight = answer.scrollHeight + 'px'
      icon.style.transform = 'rotate(45deg)'
    }
  }

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-[300px] -right-[200px] rounded-full bg-primary-gradient opacity-50 blur-[100px] animate-float"></div>
        <div className="absolute w-[400px] h-[400px] -bottom-[200px] -left-[100px] rounded-full bg-secondary-gradient opacity-50 blur-[100px] animate-float delay-[5s]"></div>
        <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tertiary-gradient opacity-50 blur-[100px] animate-float delay-[10s]"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-[1000] ${scrolled ? 'glass-darker' : 'glass'} transition-all duration-300`} id="navbar">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold gradient-text cursor-pointer">BusinessHub</div>
            
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
                          onClick={async () => {
                            await supabase.auth.signOut()
                            setIsDropdownOpen(false)
                            router.push('/')
                          }}
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
            <button className="lg:hidden flex flex-col gap-1 cursor-pointer" onClick={toggleMobileMenu}>
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
                      onClick={async () => {
                        await supabase.auth.signOut()
                        router.push('/')
                      }}
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-32 pb-20">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-20 items-center">
          {/* Hero Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
              <span className="gradient-text-light">One Platform,</span>
              <br />
              <span className="gradient-text">Infinite Business Solutions</span>
            </h1>
            <p className="text-xl text-white/80 mb-10 leading-relaxed">
              Transform your business with our all-in-one software platform. From real estate to barbershops, we provide everything you need to run, manage, and grow your business.
            </p>
            <div className="flex flex-wrap gap-5 justify-center lg:justify-start mb-12">
              <Link href={user ? "/dashboard" : "/register"} className="inline-block px-8 py-4 bg-primary-gradient rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300">
                {user ? "Go to Dashboard" : "Start Free Trial"}
              </Link>
              <button className="px-8 py-4 glass rounded-full font-semibold hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300">
                Watch Demo
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
                </svg>
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
          
          {/* Hero Visual */}
          <div className="relative">
            <div className="glass rounded-3xl p-8 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6">Your Businesses</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl hover:bg-white/10 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center text-2xl">🏠</div>
                  <div>
                    <h4 className="font-semibold text-lg">Real Estate Pro</h4>
                    <p className="text-sm text-white/80">Property management & CRM</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl hover:bg-white/10 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center text-2xl">✂️</div>
                  <div>
                    <h4 className="font-semibold text-lg">BarberShop Manager</h4>
                    <p className="text-sm text-white/80">Appointments & inventory</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl hover:bg-white/10 hover:translate-x-2 transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 bg-primary-gradient rounded-xl flex items-center justify-center text-2xl">🍔</div>
                  <div>
                    <h4 className="font-semibold text-lg">Restaurant Suite</h4>
                    <p className="text-sm text-white/80">Orders & table management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/[0.02] stats-section">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-5xl font-bold gradient-text mb-2">10K+</div>
              <div className="text-lg text-white/80">Active Businesses</div>
            </div>
            <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-5xl font-bold gradient-text mb-2">50M+</div>
              <div className="text-lg text-white/80">Transactions Processed</div>
            </div>
            <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-5xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-lg text-white/80">Uptime Guarantee</div>
            </div>
            <div className="glass rounded-3xl p-8 text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
              <div className="text-5xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-lg text-white/80">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 lg:px-12" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">
              Everything You Need, <span className="gradient-text">Nothing You Don&apos;t</span>
            </h2>
            <p className="text-lg text-white/80">Powerful features designed for modern businesses</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">📱</div>
                <h3 className="text-2xl font-semibold mb-4">Custom Templates</h3>
                <p className="text-white/80 leading-relaxed">Industry-specific templates to get you started in minutes. Fully customizable to match your brand.</p>
              </div>
            </div>
            
            <div className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">📊</div>
                <h3 className="text-2xl font-semibold mb-4">Advanced Analytics</h3>
                <p className="text-white/80 leading-relaxed">Real-time insights and reports to help you make data-driven decisions for your business.</p>
              </div>
            </div>
            
            <div className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">🔐</div>
                <h3 className="text-2xl font-semibold mb-4">Enterprise Security</h3>
                <p className="text-white/80 leading-relaxed">Bank-level encryption and security measures to keep your business data safe and compliant.</p>
              </div>
            </div>
            
            <div className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">🔄</div>
                <h3 className="text-2xl font-semibold mb-4">Seamless Integration</h3>
                <p className="text-white/80 leading-relaxed">Connect with your favorite tools and services. Import/export data with ease.</p>
              </div>
            </div>
            
            <div className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">👥</div>
                <h3 className="text-2xl font-semibold mb-4">Team Collaboration</h3>
                <p className="text-white/80 leading-relaxed">Invite team members, assign roles, and collaborate in real-time across all your businesses.</p>
              </div>
            </div>
            
            <div className="glass rounded-3xl p-10 text-center hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(102,126,234,0.2)] transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto mb-5 glass rounded-2xl flex items-center justify-center text-4xl">🚀</div>
                <h3 className="text-2xl font-semibold mb-4">Instant Deployment</h3>
                <p className="text-white/80 leading-relaxed">Go live instantly with QR codes, booking pages, and customer portals ready to use.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white/[0.02] overflow-hidden" id="testimonials">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">
              Loved by <span className="gradient-text">Thousands of Businesses</span>
            </h2>
            <p className="text-lg text-white/80">See what our customers have to say about BusinessHub</p>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex gap-8 animate-scroll hover:animation-play-state-paused testimonials-track">
            {/* First set of testimonials */}
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;BusinessHub transformed how we manage our real estate portfolio. The automation features alone save us 20+ hours per week. Absolutely game-changing!&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">JD</div>
                <div>
                  <h4 className="font-semibold">John Davis</h4>
                  <p className="text-sm text-white/80">Real Estate Agency Owner</p>
                </div>
              </div>
            </div>
            
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;The appointment scheduling system is perfect for our barbershop. Clients love the easy booking process, and we&apos;ve reduced no-shows by 40%.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">MW</div>
                <div>
                  <h4 className="font-semibold">Marcus Williams</h4>
                  <p className="text-sm text-white/80">Barbershop Owner</p>
                </div>
              </div>
            </div>
            
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;Managing multiple restaurant locations has never been easier. The real-time analytics help us make better decisions every day.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">SC</div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-white/80">Restaurant Chain Manager</p>
                </div>
              </div>
            </div>
            
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;BusinessHub&apos;s gym management features are incredible. Member check-ins, class bookings, and payment processing all in one place!&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">AL</div>
                <div>
                  <h4 className="font-semibold">Alex Lopez</h4>
                  <p className="text-sm text-white/80">Fitness Center Owner</p>
                </div>
              </div>
            </div>
            
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;The customization options are endless. We&apos;ve built exactly what we need for our medical practice without any coding knowledge.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">RP</div>
                <div>
                  <h4 className="font-semibold">Dr. Rachel Park</h4>
                  <p className="text-sm text-white/80">Medical Practice Owner</p>
                </div>
              </div>
            </div>
            
            {/* Duplicate set for seamless scrolling */}
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;BusinessHub transformed how we manage our real estate portfolio. The automation features alone save us 20+ hours per week. Absolutely game-changing!&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">JD</div>
                <div>
                  <h4 className="font-semibold">John Davis</h4>
                  <p className="text-sm text-white/80">Real Estate Agency Owner</p>
                </div>
              </div>
            </div>
            
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;The appointment scheduling system is perfect for our barbershop. Clients love the easy booking process, and we&apos;ve reduced no-shows by 40%.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">MW</div>
                <div>
                  <h4 className="font-semibold">Marcus Williams</h4>
                  <p className="text-sm text-white/80">Barbershop Owner</p>
                </div>
              </div>
            </div>
            
            <div className="min-w-[400px] glass rounded-3xl p-10 relative">
              <div className="absolute top-5 right-5 text-yellow-400">⭐⭐⭐⭐⭐</div>
              <p className="text-white/80 mb-8 leading-relaxed">&quot;Managing multiple restaurant locations has never been easier. The real-time analytics help us make better decisions every day.&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-semibold">SC</div>
                <div>
                  <h4 className="font-semibold">Sarah Chen</h4>
                  <p className="text-sm text-white/80">Restaurant Chain Manager</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Types Section */}
      <section className="py-24 px-6 lg:px-12" id="solutions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">
              Solutions for <span className="gradient-text">Every Industry</span>
            </h2>
            <p className="text-lg text-white/80">Pre-built solutions tailored to your specific business needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">🏠</div>
              <h3 className="text-2xl font-semibold mb-4">Real Estate</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Property listings management</li>
                <li>Virtual tours & galleries</li>
                <li>Client CRM & follow-ups</li>
                <li>Document management</li>
                <li>Commission tracking</li>
              </ul>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">✂️</div>
              <h3 className="text-2xl font-semibold mb-4">Barbershop & Salon</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Online appointment booking</li>
                <li>Staff scheduling</li>
                <li>Customer feedback system</li>
                <li>Inventory management</li>
                <li>Loyalty programs</li>
              </ul>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">🍔</div>
              <h3 className="text-2xl font-semibold mb-4">Restaurant & Cafe</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Digital menu with QR codes</li>
                <li>Table reservations</li>
                <li>Order management</li>
                <li>Kitchen display system</li>
                <li>Delivery integration</li>
              </ul>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">🏋️</div>
              <h3 className="text-2xl font-semibold mb-4">Fitness & Gym</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Member management</li>
                <li>Class scheduling</li>
                <li>Personal training bookings</li>
                <li>Payment processing</li>
                <li>Progress tracking</li>
              </ul>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">🏥</div>
              <h3 className="text-2xl font-semibold mb-4">Healthcare</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Patient appointments</li>
                <li>Medical records</li>
                <li>Prescription management</li>
                <li>Billing & insurance</li>
                <li>Telemedicine support</li>
              </ul>
            </div>
            
            <div className="glass rounded-3xl p-8 text-center cursor-pointer hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300">
              <div className="w-24 h-24 mx-auto mb-5 bg-primary-gradient rounded-3xl flex items-center justify-center text-5xl hover:scale-110 hover:rotate-[5deg] transition-all duration-300">🛍️</div>
              <h3 className="text-2xl font-semibold mb-4">Retail & E-commerce</h3>
              <ul className="text-white/80 text-sm space-y-2">
                <li>Inventory tracking</li>
                <li>POS integration</li>
                <li>Customer database</li>
                <li>Sales analytics</li>
                <li>Multi-channel selling</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-white/[0.02] px-6 lg:px-12" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-lg text-white/80">Choose the plan that fits your business needs</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="glass rounded-3xl p-10 hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Starter</h3>
              <div className="text-5xl font-bold gradient-text mb-2">$29<span className="text-lg text-white/80">/month</span></div>
              <p className="text-white/80 mb-8">Perfect for small businesses just getting started</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Up to 2 business profiles
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Basic templates & customization
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  1,000 monthly transactions
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Email support
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Basic analytics
                </li>
              </ul>
              <Link href="/register" className="block w-full py-3 glass rounded-full font-semibold hover:bg-white/20 transition-all duration-300 text-center">
                Get Started
              </Link>
            </div>
            
            <div className="glass rounded-3xl p-10 border-purple-500/50 scale-105 relative hover:-translate-y-2 transition-all duration-300">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-gradient px-5 py-1 rounded-full text-xs font-semibold">Most Popular</span>
              <h3 className="text-2xl font-semibold mb-2">Professional</h3>
              <div className="text-5xl font-bold gradient-text mb-2">$79<span className="text-lg text-white/80">/month</span></div>
              <p className="text-white/80 mb-8">Most popular choice for growing businesses</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Up to 5 business profiles
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Advanced templates & full customization
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  10,000 monthly transactions
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Priority support
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Advanced analytics & reports
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Team collaboration (5 users)
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  API access
                </li>
              </ul>
              <Link href="/register" className="block w-full py-3 bg-primary-gradient rounded-full font-semibold hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300 text-center">
                Get Started
              </Link>
            </div>
            
            <div className="glass rounded-3xl p-10 hover:-translate-y-2 hover:border-purple-500/50 transition-all duration-300">
              <h3 className="text-2xl font-semibold mb-2">Enterprise</h3>
              <div className="text-5xl font-bold gradient-text mb-2">Custom</div>
              <p className="text-white/80 mb-8">Tailored solutions for large organizations</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Unlimited business profiles
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Custom development
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Unlimited transactions
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Dedicated account manager
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Custom integrations
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  Unlimited users
                </li>
                <li className="flex items-center gap-3 text-white/80">
                  <span className="text-green-400 font-bold">✓</span>
                  SLA guarantee
                </li>
              </ul>
              <button className="w-full py-3 glass rounded-full font-semibold hover:bg-white/20 transition-all duration-300">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 px-6 lg:px-12" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-lg text-white/80">Everything you need to know about BusinessHub</p>
          </div>
          
          <div className="space-y-5">
            <div className="glass rounded-2xl overflow-hidden faq-item">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-white/5 transition-colors duration-300 faq-question" onClick={handleFAQClick}>
                How quickly can I get started?
                <span className="text-2xl transition-transform duration-300">+</span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <div className="px-8 pb-6 text-white/80 leading-relaxed">
                  You can get started immediately! After signing up, you&apos;ll have access to our template library. Most businesses are up and running within 15 minutes using our pre-built templates. Customization can be done at your own pace.
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl overflow-hidden faq-item">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-white/5 transition-colors duration-300 faq-question" onClick={handleFAQClick}>
                Do I need technical knowledge to use BusinessHub?
                <span className="text-2xl transition-transform duration-300">+</span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <div className="px-8 pb-6 text-white/80 leading-relaxed">
                  Not at all! BusinessHub is designed for business owners, not developers. Our drag-and-drop interface and pre-built templates make it easy for anyone to create professional business applications without any coding knowledge.
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl overflow-hidden faq-item">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-white/5 transition-colors duration-300 faq-question" onClick={handleFAQClick}>
                Can I manage multiple businesses from one account?
                <span className="text-2xl transition-transform duration-300">+</span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <div className="px-8 pb-6 text-white/80 leading-relaxed">
                  Yes! Depending on your plan, you can manage multiple business profiles from a single account. Each business gets its own dashboard, branding, and settings while you maintain centralized control.
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl overflow-hidden faq-item">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-white/5 transition-colors duration-300 faq-question" onClick={handleFAQClick}>
                What kind of support do you offer?
                <span className="text-2xl transition-transform duration-300">+</span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <div className="px-8 pb-6 text-white/80 leading-relaxed">
                  We offer comprehensive support including detailed documentation, video tutorials, email support for all plans, and priority phone support for Professional and Enterprise plans. Enterprise customers also get a dedicated account manager.
                </div>
              </div>
            </div>
            
            <div className="glass rounded-2xl overflow-hidden faq-item">
              <button className="w-full px-8 py-6 text-left flex justify-between items-center font-semibold text-lg hover:bg-white/5 transition-colors duration-300 faq-question" onClick={handleFAQClick}>
                Is my data secure?
                <span className="text-2xl transition-transform duration-300">+</span>
              </button>
              <div className="faq-answer max-h-0 overflow-hidden transition-all duration-300">
                <div className="px-8 pb-6 text-white/80 leading-relaxed">
                  Absolutely. We use bank-level 256-bit SSL encryption, regular security audits, and comply with GDPR and other data protection regulations. Your data is backed up daily and stored in secure, redundant data centers.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-[40px] p-20 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary-gradient opacity-10 rotate-45 scale-150"></div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-5">Ready to Transform Your Business?</h2>
              <p className="text-lg text-white/80 mb-10">Join thousands of businesses already using BusinessHub to streamline their operations and grow faster.</p>
              <Link href={user ? "/dashboard" : "/register"} className="inline-block px-8 py-4 bg-primary-gradient rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300">
                {user ? "Go to Dashboard" : "Start Your Free 14-Day Trial"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-black/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-1">
              <h3 className="text-3xl font-bold gradient-text mb-5">BusinessHub</h3>
              <p className="text-white/80 mb-8 leading-relaxed">Empowering businesses with all-in-one software solutions. From startups to enterprises, we provide the tools you need to succeed in the digital age.</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                  <span className="text-sm font-bold">f</span>
                </a>
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                  <span className="text-sm font-bold">t</span>
                </a>
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                  <span className="text-sm font-bold">in</span>
                </a>
                <a href="#" className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary-gradient hover:-translate-y-1 transition-all duration-300">
                  <span className="text-sm font-bold">ig</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Features</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Pricing</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Templates</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Integrations</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">About Us</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Careers</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Blog</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Press</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-5">Support</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Help Center</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Community</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Status</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-10 border-t border-white/10 text-center text-white/80">
            <p>&copy; 2025 BusinessHub. All rights reserved. Made with ❤️ for businesses worldwide.</p>
          </div>
        </div>
      </footer>
    </>
  )
}