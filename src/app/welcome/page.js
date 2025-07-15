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
import styles from './page.module.css';

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
    const progressFill = document.querySelector(`.${styles.welcomeProgressFill}`);
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
        confetti.className = styles.welcomeConfetti;
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
      <div className={styles.loadingContainer}>
        <div className={styles.loadingContent}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading welcome screen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.welcomePage}>
      <AnimatedBackground />
      
      {/* Progress Bar */}
      <div className={styles.welcomeProgressBar}>
        <div className={styles.welcomeProgressFill}></div>
      </div>

      {/* Skip Button */}
      <button className={styles.welcomeSkipButton} onClick={skipOnboarding}>
        Skip
      </button>

      {/* Debug: Reset Button (for testing - remove in production) */}
      <button 
        className={styles.welcomeSkipButton} 
        style={{ top: '80px' }}
        onClick={() => {
          localStorage.removeItem('user_onboarded');
          window.location.reload();
        }}
      >
        Reset Onboarding
      </button>

      {/* Welcome Container */}
      <div className={styles.welcomeContainer}>
        <div className={styles.welcomeContent}>
          {/* Step 1: Welcome Message */}
          <div className={`${styles.welcomeStep} ${currentStep === 1 ? styles.active : ''}`}>
            <div className={styles.welcomeLogo}>B</div>
            <div className={styles.welcomeUserGreeting}>
              👋 Welcome, {displayUser.name}!
            </div>
            <h1 className={styles.welcomeTitle}>Welcome to BusinessHub</h1>
            <p className={styles.welcomeSubtitle}>
              Your all-in-one platform for managing and growing your business.<br />
              Let&apos;s get you set up in just a few steps.
            </p>
            <div className={styles.welcomeActionButtons}>
              <button className={styles.welcomeBtnPrimary} onClick={nextStep}>
                Get Started
                <ArrowRight style={{width: '20px', height: '20px'}} />
              </button>
            </div>
          </div>

          {/* Step 2: Choose Business Type */}
          <div className={`${styles.welcomeStep} ${currentStep === 2 ? styles.active : ''}`}>
            <h1 className={styles.welcomeTitle}>What type of business do you run?</h1>
            <p className={styles.welcomeSubtitle}>Select all that apply. You can add more later.</p>
            
            <div className={styles.welcomeBusinessTypesGrid}>
              {businessTypes.map((type, index) => (
                <div
                  key={index}
                  className={`${styles.welcomeBusinessTypeCard} ${selectedBusinessTypes.has(index) ? styles.selected : ''}`}
                  onClick={() => selectBusinessType(index)}
                >
                  <div className={styles.welcomeBusinessIcon}>{type.icon}</div>
                  <div className={styles.welcomeBusinessName}>{type.name}</div>
                  <div className={styles.welcomeBusinessDescription}>{type.description}</div>
                </div>
              ))}
            </div>

            <div className={styles.welcomeActionButtons}>
              <button className={styles.welcomeBtnSecondary} onClick={previousStep}>
                <ArrowLeft style={{width: '20px', height: '20px'}} />
                Back
              </button>
              <button className={styles.welcomeBtnPrimary} onClick={nextStep}>
                Continue
                <ArrowRight style={{width: '20px', height: '20px'}} />
              </button>
            </div>
          </div>

          {/* Step 3: Feature Overview */}
          <div className={`${styles.welcomeStep} ${currentStep === 3 ? styles.active : ''}`}>
            <h1 className={styles.welcomeTitle}>Everything you need to succeed</h1>
            <p className={styles.welcomeSubtitle}>Here&apos;s what BusinessHub offers for your business</p>
            
            <div className={styles.welcomeFeaturesGrid}>
              {features.map((feature, index) => (
                <div key={index} className={styles.welcomeFeatureCard}>
                  <div className={styles.welcomeFeatureIcon}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={styles.welcomeFeatureTitle}>{feature.title}</h3>
                    <p className={styles.welcomeFeatureDescription}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.welcomeActionButtons}>
              <button className={styles.welcomeBtnSecondary} onClick={previousStep}>
                <ArrowLeft style={{width: '20px', height: '20px'}} />
                Back
              </button>
              <button className={styles.welcomeBtnPrimary} onClick={completeOnboarding}>
                Start Building
                <CheckCircle style={{width: '20px', height: '20px'}} />
              </button>
            </div>
          </div>

          {/* Step Indicators */}
          <div className={styles.welcomeStepIndicators}>
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`${styles.welcomeStepDot} ${currentStep === step ? styles.active : ''}`}
                onClick={() => goToStep(step)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}