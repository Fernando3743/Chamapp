'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import { GoogleIcon, FacebookIcon } from '../components/icons';
import AnimatedBackground from '../components/AnimatedBackground';
import toast from 'react-hot-toast';
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  AlertCircle
} from 'lucide-react';
import styles from './page.module.css';

// Secure error message mapping to prevent XSS
const ERROR_MESSAGES = {
  'invalid_credentials': 'Invalid email or password',
  'too_many_attempts': 'Too many login attempts. Please try again later.',
  'network_error': 'Connection error. Please check your internet and try again.',
  'user_not_found': 'No account found with this email address',
  'invalid_email': 'Please enter a valid email address',
  'weak_password': 'Password must be at least 8 characters long',
  'account_disabled': 'This account has been disabled. Contact support.',
  'email_not_verified': 'Please verify your email address before signing in',
  'session_expired': 'Your session has expired. Please sign in again.',
  'server_error': 'Server error. Please try again in a moment.',
  'rate_limited': 'Too many requests. Please wait before trying again.',
  'maintenance': 'Service temporarily unavailable due to maintenance.'
};

const getSecureErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred. Please try again.';
  
  // Check for specific error codes first
  if (error.code && ERROR_MESSAGES[error.code]) {
    return ERROR_MESSAGES[error.code];
  }
  
  // Fallback to generic message to prevent XSS
  return 'Login failed. Please check your credentials and try again.';
};

export default function SignInPage() {
  const { signIn, loading: isLoginLoading, error: authError } = useSupabaseAuth();
  const { t } = usePageTranslations('signin');
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [localErrors, setLocalErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);
  
  // Load remembered email on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setFormData(prev => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true
      }));
    }
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Clear field error when user starts typing
    if (localErrors[name]) {
      setLocalErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Handle remember me functionality
    if (name === 'rememberMe') {
      if (checked && formData.email) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
    }
    
    if (name === 'email' && formData.rememberMe) {
      localStorage.setItem('rememberedEmail', value);
    }
  }, [localErrors, formData.email, formData.rememberMe]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLocalErrors({});
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setLocalErrors(validationErrors);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      
      // Show toast notification for validation errors
      const errorCount = Object.keys(validationErrors).length;
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} in the form`, {
        duration: 4000,
      });
      
      return;
    }
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (error) {
        throw error;
      }
      
      // Success
      toast.success('Login successful! Welcome back!', { duration: 3000 });
      
      // Handle remember me
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Check if user has completed onboarding
      const hasOnboarded = localStorage.getItem('user_onboarded');
      
      // Redirect to welcome page for first-time users, dashboard for returning users
      setTimeout(() => {
        if (!hasOnboarded) {
          router.push('/welcome');
        } else {
          router.push('/dashboard');
        }
      }, 500);
    } catch (error) {
      // Error is handled by Redux slice
      const errorMessage = getSecureErrorMessage(error);
      toast.error(errorMessage, { duration: 6000 });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [formData, validateForm, signIn, router]);

  const getInputClassName = useCallback((fieldName) => {
    let className = styles.signinFormControl;
    if (localErrors[fieldName]) {
      className += ' ' + styles.error;
    } else if (formData[fieldName] && formData[fieldName].trim()) {
      className += ' ' + styles.success;
    }
    return className;
  }, [localErrors, formData]);

  const renderFieldError = useCallback((fieldName) => {
    const error = localErrors[fieldName];
    if (!error) return null;
    
    return (
      <div className={styles.signinErrorMessage}>
        {error}
      </div>
    );
  }, [localErrors]);

  const handleSocialLogin = useCallback((provider) => {
    toast.info(`${provider} login coming soon!`, { duration: 3000 });
  }, []);

  return (
    <div className={styles.signinPage}>
      <AnimatedBackground />
      
      {/* Back to Home */}
      <Link href="/" className={styles.signinBackHome}>
        <ArrowLeft />
        Back to Home
      </Link>

      <div className={styles.signinContainer}>
        {/* Logo */}
        <div className={styles.signinLogo}>
          <h1>BusinessHub</h1>
          <p>Welcome back!</p>
        </div>

        {/* Sign In Card */}
        <div className={`${styles.signinCard} ${shake ? styles.signinShake : ''}`}>
          <div className={styles.signinFormHeader}>
            <h2>Sign in to your account</h2>
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register">Create one</Link>
            </p>
          </div>

          {/* Info Notice */}
          <div className={styles.signinDemoNotice}>
            Sign in with your registered account credentials
          </div>

          {/* General Error Display */}
          {authError && (
            <div className={styles.signinGeneralError}>
              <AlertCircle className={`${styles.w5} ${styles.h5}`} />
              {getSecureErrorMessage(authError)}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className={styles.signinFormGroup}>
              <label htmlFor="signin-email">Email Address</label>
              <input
                type="email"
                id="signin-email"
                name="email"
                className={getInputClassName('email')}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {renderFieldError('email')}
            </div>

            {/* Password */}
            <div className={styles.signinFormGroup}>
              <label htmlFor="signin-password">Password</label>
              <div className={styles.signinPasswordInputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="signin-password"
                  name="password"
                  className={getInputClassName('password')}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className={styles.signinPasswordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className={`${styles.w5} ${styles.h5}`} /> : <Eye className={`${styles.w5} ${styles.h5}`} />}
                </button>
              </div>
              {renderFieldError('password')}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className={styles.signinFormOptions}>
              <div className={styles.signinCheckboxGroup}>
                <div className={styles.signinCheckboxWrapper}>
                  <input
                    type="checkbox"
                    id="signin-remember"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <div className={styles.signinCheckboxCustom}></div>
                </div>
                <label htmlFor="signin-remember">Remember me</label>
              </div>
              <Link href="/forgot-password" className={styles.signinForgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={styles.signinSubmitBtn}
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <>
                  <Loader2 className={`${styles.w5} ${styles.h5} ${styles.animateSpin}`} />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className={`${styles.w5} ${styles.h5}`} />
                  Sign In
                </>
              )}
            </button>

            {/* Divider */}
            <div className={styles.signinDivider}>
              <span>Or continue with</span>
            </div>

            {/* Social Login */}
            <div className={styles.signinSocialLogin}>
              <button
                type="button"
                className={styles.signinSocialBtn}
                onClick={() => handleSocialLogin('Google')}
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className={styles.signinSocialBtn}
                onClick={() => handleSocialLogin('Facebook')}
              >
                <FacebookIcon />
                Facebook
              </button>
            </div>

            {/* Footer */}
            <div className={styles.signinFormFooter}>
              Need help? <Link href="/contact">Contact Support</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}