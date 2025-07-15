'use client';

import { useState, useRef, useCallback, useMemo, memo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext';
import { useClickOutside, useMountedPortal } from '../hooks';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  selectLoginDropdownOpen,
  openLoginDropdown,
  closeLoginDropdown,
  toggleLoginDropdown
} from '../store/slices/uiSlice';
import { GoogleIcon, FacebookIcon } from './icons';
import toast from 'react-hot-toast';
import { 
  Eye,
  EyeOff,
  Loader2,
  Lock
} from 'lucide-react';
import styles from '../styles/components/LoginDropdown.module.css';

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

const LoginDropdown = memo(function LoginDropdown() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectLoginDropdownOpen);
  const { signIn, loading: supabaseLoading } = useSupabaseAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [localErrors, setLocalErrors] = useState({});
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  const dropdownRef = useRef(null);
  const router = useRouter();
  const isMounted = useMountedPortal();

  // Close dropdown when clicking outside
  useClickOutside(dropdownRef, useCallback(() => dispatch(closeLoginDropdown()), [dispatch]), isOpen);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (localErrors[name]) {
      setLocalErrors(prev => ({ ...prev, [name]: '' }));
    }
  }, [localErrors]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLocalErrors({});
    
    // Basic validation
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setLocalErrors(newErrors);
      return;
    }
    
    setIsLoginLoading(true);
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);

      if (error) {
        toast.error(error.message || 'Login failed', { duration: 6000 });
        setLocalErrors({ general: error.message });
      } else {
        // Success
        toast.success('Login successful!', { duration: 3000 });
        dispatch(closeLoginDropdown());
        setFormData({ email: '', password: '' });
        
        // Check if user has completed onboarding
        const hasOnboarded = localStorage.getItem('user_onboarded');
        
        // Redirect to welcome page for first-time users, dashboard for returning users
        if (!hasOnboarded) {
          router.push('/welcome');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed', { duration: 6000 });
    } finally {
      setIsLoginLoading(false);
    }
  }, [formData.email, formData.password, signIn, dispatch, router]);

  const toggleDropdown = useCallback(() => {
    dispatch(toggleLoginDropdown());
    // Reset form when opening/closing
    if (!isOpen) {
      setFormData({ email: '', password: '' });
      setLocalErrors({});
    }
  }, [isOpen, dispatch]);

  const getInputClassName = useCallback((fieldName) => {
    let className = styles.loginDropdownInput;
    if (localErrors[fieldName]) className += ` ${styles.error}`;
    return className;
  }, [localErrors]);

  const dropdownMenu = useMemo(() => {
    if (!isOpen || !isMounted) return null;
    
    return (
    <div className={styles.loginDropdownMenu} ref={dropdownRef}>
          <div className={styles.loginDropdownHeader}>
            <h3>Welcome back</h3>
            <p>Sign in to your account</p>
          </div>

          {localErrors.general && (
            <div className={styles.loginDropdownError}>
              {localErrors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.loginDropdownForm}>
            <div className={styles.loginFormGroup}>
              <label htmlFor="dropdown-email">Email</label>
              <input
                type="email"
                id="dropdown-email"
                name="email"
                className={getInputClassName('email')}
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {localErrors.email && (
                <div className={styles.loginFieldError}>{localErrors.email}</div>
              )}
            </div>

            <div className={styles.loginFormGroup}>
              <label htmlFor="dropdown-password">Password</label>
              <div className={styles.loginPasswordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  id="dropdown-password"
                  name="password"
                  className={getInputClassName('password')}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className={styles.loginPasswordToggle}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {localErrors.password && (
                <div className={styles.loginFieldError}>{localErrors.password}</div>
              )}
            </div>

            <div className={styles.loginFormOptions}>
              <label className={styles.loginCheckbox}>
                <input type="checkbox" />
                <span className={styles.loginCheckmark}></span>
                Remember me
              </label>
              <Link href="/forgot-password" className={styles.loginForgotLink}>
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className={styles.loginDropdownSubmit}
              disabled={isLoginLoading || supabaseLoading}
            >
              {(isLoginLoading || supabaseLoading) ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>

            <div className={styles.loginDropdownDivider}>
              <span>or</span>
            </div>

            <div className={styles.loginSocialButtons}>
              <button type="button" className={styles.loginSocialBtn}>
                <GoogleIcon />
                Google
              </button>
              <button type="button" className={styles.loginSocialBtn}>
                <FacebookIcon />
                Facebook
              </button>
            </div>

            <div className={styles.loginDropdownFooter}>
              <p>
                Don&apos;t have an account?{' '}
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
    );
  }, [isOpen, isMounted, localErrors, formData, showPassword, isLoginLoading, supabaseLoading, handleSubmit, handleInputChange, getInputClassName]);

  return (
    <div className={styles.loginDropdownContainer}>
      <button 
        className={`${styles.ctaButton} ${styles.loginDropdownTrigger} ${isOpen ? styles.active : ''}`}
        onClick={toggleDropdown}
      >
        Sign In
      </button>

      {isMounted && dropdownMenu && createPortal(dropdownMenu, document.body)}
    </div>
  );
});

export default LoginDropdown;