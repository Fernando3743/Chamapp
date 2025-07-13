'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  loginUser,
  selectIsLoginLoading,
  selectLoginError,
  clearError
} from '../store/slices/authSlice';
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
  const dispatch = useAppDispatch();
  const isLoginLoading = useAppSelector(selectIsLoginLoading);
  const loginError = useAppSelector(selectLoginError);
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
    // Clear Redux login error when user starts typing
    if (loginError) {
      dispatch(clearError());
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
  }, [localErrors, loginError, dispatch, formData.email, formData.rememberMe]);

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
      const result = await dispatch(loginUser({ 
        email: formData.email, 
        password: formData.password 
      })).unwrap();
      
      // Success
      toast.success('Login successful! Welcome back!', { duration: 3000 });
      
      // Handle remember me
      if (formData.rememberMe) {
        localStorage.setItem('rememberedEmail', formData.email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      
      // Redirect to dashboard or home page
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      // Error is handled by Redux slice
      const errorMessage = getSecureErrorMessage(error);
      toast.error(errorMessage, { duration: 6000 });
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }, [formData, validateForm, dispatch, router]);

  const getInputClassName = useCallback((fieldName) => {
    let className = 'signin-form-control';
    if (localErrors[fieldName]) {
      className += ' error';
    } else if (formData[fieldName] && formData[fieldName].trim()) {
      className += ' success';
    }
    return className;
  }, [localErrors, formData]);

  const renderFieldError = useCallback((fieldName) => {
    const error = localErrors[fieldName];
    if (!error) return null;
    
    return (
      <div className="signin-error-message">
        {error}
      </div>
    );
  }, [localErrors]);

  const handleSocialLogin = useCallback((provider) => {
    toast.info(`${provider} login coming soon!`, { duration: 3000 });
  }, []);

  return (
    <div className="signin-page">
      <AnimatedBackground />
      
      {/* Back to Home */}
      <Link href="/" className="signin-back-home">
        <ArrowLeft />
        Back to Home
      </Link>

      <div className="signin-container">
        {/* Logo */}
        <div className="signin-logo">
          <h1>BusinessHub</h1>
          <p>Welcome back!</p>
        </div>

        {/* Sign In Card */}
        <div className={`signin-card ${shake ? 'signin-shake' : ''}`}>
          <div className="signin-form-header">
            <h2>Sign in to your account</h2>
            <p>
              Don't have an account?{' '}
              <Link href="/register">Create one</Link>
            </p>
          </div>

          {/* Demo Notice */}
          <div className="signin-demo-notice">
            Demo: Use email "demo@businesshub.com" and password "Demo123!"
          </div>

          {/* General Error Display */}
          {loginError && (
            <div className="signin-general-error">
              <AlertCircle className="w-5 h-5" />
              {getSecureErrorMessage(loginError)}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="signin-form-group">
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
            <div className="signin-form-group">
              <label htmlFor="signin-password">Password</label>
              <div className="signin-password-input-wrapper">
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
                  className="signin-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {renderFieldError('password')}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="signin-form-options">
              <div className="signin-checkbox-group">
                <div className="signin-checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="signin-remember"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <div className="signin-checkbox-custom"></div>
                </div>
                <label htmlFor="signin-remember">Remember me</label>
              </div>
              <Link href="/forgot-password" className="signin-forgot-link">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="signin-submit-btn"
              disabled={isLoginLoading}
            >
              {isLoginLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>

            {/* Divider */}
            <div className="signin-divider">
              <span>Or continue with</span>
            </div>

            {/* Social Login */}
            <div className="signin-social-login">
              <button
                type="button"
                className="signin-social-btn"
                onClick={() => handleSocialLogin('Google')}
              >
                <GoogleIcon />
                Google
              </button>
              <button
                type="button"
                className="signin-social-btn"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <FacebookIcon />
                Facebook
              </button>
            </div>

            {/* Footer */}
            <div className="signin-form-footer">
              Need help? <Link href="/contact">Contact Support</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}