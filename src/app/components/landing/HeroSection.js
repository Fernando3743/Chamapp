'use client'

import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'

export default function HeroSection() {
  const { user } = useAuth()
  return (
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
  )
}