import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import BusinessTypes from './components/BusinessTypes';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <BusinessTypes />
      <Pricing />
      <FAQ />
      <CTASection />
      <Footer />
    </>
  );
}