'use client'

import Link from 'next/link'
import { useAuth } from '@/app/contexts/AuthContext'

export default function CTASection() {
  const { user } = useAuth()
  return (
    <section className="py-24 px-6 lg:px-12">
      <div className="max-w-3xl mx-auto text-center">
        <div className="glass rounded-[40px] p-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary-gradient opacity-10 rotate-45 scale-150"></div>
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold mb-5">Ready to Transform Your Business?</h2>
            <p className="text-lg text-white/80 mb-10">
              Join thousands of businesses already using BusinessHub to streamline their operations and grow faster.
            </p>
            <Link 
              href={user ? "/dashboard" : "/register"} 
              className="inline-block px-8 py-4 bg-primary-gradient rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(102,126,234,0.3)] transition-all duration-300"
            >
              {user ? "Go to Dashboard" : "Start Your Free 14-Day Trial"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}