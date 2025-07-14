'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext';
import AnimatedBackground from '../components/AnimatedBackground';
import toast from 'react-hot-toast';
import { 
  ArrowRight,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';

const businessTypes = [
  { icon: '🏠', name: 'Real Estate', description: 'Property management & sales' },
  { icon: '✂️', name: 'Salon & Spa', description: 'Beauty & wellness services' },
  { icon: '🍔', name: 'Restaurant', description: 'Food & beverage service' },
  { icon: '🏋️', name: 'Fitness & Gym', description: 'Health & fitness center' },
  { icon: '🏥', name: 'Healthcare', description: 'Medical & dental practice' },
  { icon: '🛍️', name: 'Retail', description: 'Shop & e-commerce' },
];

const features = [
  {
    icon: '📊',
    title: 'Smart Analytics',
    description: 'Track performance, revenue, and growth with real-time insights'
  },
  {
    icon: '📅',
    title: 'Appointment Scheduling',
    description: 'Let customers book online 24/7 with automated reminders'
  },
  {
    icon: '👥',
    title: 'Customer Management',
    description: 'Build lasting relationships with integrated CRM tools'
  },
  {
    icon: '💳',
    title: 'Payment Processing',
    description: 'Accept payments seamlessly with secure, built-in solutions'
  },
];

export default function WelcomePage() {
  const { user, isAuthenticated, loading } = useSupabaseAuth();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedBusinessTypes, setSelectedBusinessTypes] = useState(new Set());
  const totalSteps = 3;

  useEffect(() => {
    // In development, allow access to welcome page even when not authenticated
    const isDev = process.env.NODE_ENV === 'development';
    
    if (loading) return; // Still loading
    if (!isAuthenticated && !isDev) {
      router.push('/signin');
    }
  }, [isAuthenticated, loading, router]);

  const updateProgress = useCallback(() => {
    const progressFill = document.querySelector('.welcome-progress-fill');
    if (progressFill) {
      progressFill.style.width = `${(currentStep / totalSteps) * 100}%`;
    }
  }, [currentStep, totalSteps]);

  useEffect(() => {
    updateProgress();
  }, [updateProgress]);

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, totalSteps]);

  const previousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= totalSteps) {
      setCurrentStep(stepNumber);
    }
  }, [totalSteps]);

  const selectBusinessType = useCallback((index) => {
    setSelectedBusinessTypes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  }, []);

  // Temporarily forward declare to fix circular dependency
  const completeOnboardingRef = useRef(null);
  
  const skipOnboarding = useCallback(() => {
    if (window.confirm('Are you sure you want to skip the setup? You can always complete it later.')) {
      completeOnboardingRef.current?.();
    }
  }, []);

  const createConfetti = useCallback(() => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.className = 'welcome-confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 3000);
      }, i * 30);
    }
  }, []);

  const completeOnboarding = useCallback(() => {
    // Create confetti effect
    createConfetti();
    
    // Mark user as onboarded (you would save this to the database)
    localStorage.setItem('user_onboarded', 'true');
    
    // Show success message and redirect
    setTimeout(() => {
      toast.success('Welcome aboard! Redirecting to your dashboard...', { duration: 3000 });
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 1000);
  }, [createConfetti, router]);

  // Set the ref after defining the function
  useEffect(() => {
    completeOnboardingRef.current = completeOnboarding;
  }, [completeOnboarding]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextStep();
      if (e.key === 'ArrowLeft') previousStep();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [nextStep, previousStep]);

  // In development, allow access even without authentication
  const isDev = process.env.NODE_ENV === 'development';
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
  const displayUser = user ? { name: userName } : (isDev ? { name: 'Developer' } : null);

  if (loading || (!isAuthenticated && !isDev)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-white text-center">
          <div className="loading w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading welcome screen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-page">
      <AnimatedBackground />
      
      {/* Progress Bar */}
      <div className="welcome-progress-bar">
        <div className="welcome-progress-fill"></div>
      </div>

      {/* Skip Button */}
      <button className="welcome-skip-button" onClick={skipOnboarding}>
        Skip
      </button>

      {/* Debug: Reset Button (for testing - remove in production) */}
      <button 
        className="welcome-skip-button" 
        style={{ top: '80px' }}
        onClick={() => {
          localStorage.removeItem('user_onboarded');
          window.location.reload();
        }}
      >
        Reset Onboarding
      </button>

      {/* Welcome Container */}
      <div className="welcome-container">
        <div className="welcome-content">
          {/* Step 1: Welcome Message */}
          <div className={`welcome-step ${currentStep === 1 ? 'active' : ''}`}>
            <div className="welcome-logo">B</div>
            <div className="welcome-user-greeting">
              👋 Welcome, {displayUser.name}!
            </div>
            <h1 className="welcome-title">Welcome to BusinessHub</h1>
            <p className="welcome-subtitle">
              Your all-in-one platform for managing and growing your business.<br />
              Let&apos;s get you set up in just a few steps.
            </p>
            <div className="welcome-action-buttons">
              <button className="welcome-btn-primary" onClick={nextStep}>
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Step 2: Choose Business Type */}
          <div className={`welcome-step ${currentStep === 2 ? 'active' : ''}`}>
            <h1 className="welcome-title">What type of business do you run?</h1>
            <p className="welcome-subtitle">Select all that apply. You can add more later.</p>
            
            <div className="welcome-business-types-grid">
              {businessTypes.map((type, index) => (
                <div
                  key={index}
                  className={`welcome-business-type-card ${selectedBusinessTypes.has(index) ? 'selected' : ''}`}
                  onClick={() => selectBusinessType(index)}
                >
                  <div className="welcome-business-icon">{type.icon}</div>
                  <div className="welcome-business-name">{type.name}</div>
                  <div className="welcome-business-description">{type.description}</div>
                </div>
              ))}
            </div>

            <div className="welcome-action-buttons">
              <button className="welcome-btn-secondary" onClick={previousStep}>
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button className="welcome-btn-primary" onClick={nextStep}>
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Step 3: Feature Overview */}
          <div className={`welcome-step ${currentStep === 3 ? 'active' : ''}`}>
            <h1 className="welcome-title">Everything you need to succeed</h1>
            <p className="welcome-subtitle">Here&apos;s what BusinessHub offers for your business</p>
            
            <div className="welcome-features-showcase">
              {features.map((feature, index) => (
                <div key={index} className="welcome-feature-item">
                  <div className="welcome-feature-icon-wrapper">
                    {feature.icon}
                  </div>
                  <div className="welcome-feature-content">
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="welcome-action-buttons">
              <button className="welcome-btn-secondary" onClick={previousStep}>
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
              <button className="welcome-btn-primary" onClick={completeOnboarding}>
                Start Building
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="welcome-step-indicators">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`welcome-step-dot ${currentStep === step ? 'active' : ''}`}
                onClick={() => goToStep(step)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}