'use client'

import { useScrollAnimations, useStatsAnimation } from './hooks/useScrollAnimations'
import AnimatedBackground from './components/landing/AnimatedBackground'
import Navigation from './components/landing/Navigation'
import HeroSection from './components/landing/HeroSection'
import StatsSection from './components/landing/StatsSection'
import FeaturesSection from './components/landing/FeaturesSection'
import TestimonialsSection from './components/landing/TestimonialsSection'
import BusinessTypesSection from './components/landing/BusinessTypesSection'
import PricingSection from './components/landing/PricingSection'
import FAQSection from './components/landing/FAQSection'
import CTASection from './components/landing/CTASection'
import Footer from './components/landing/Footer'

export default function Home() {
  useScrollAnimations()
  useStatsAnimation()

  return (
    <>
      <AnimatedBackground />
      <Navigation />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <BusinessTypesSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </>
  )
}