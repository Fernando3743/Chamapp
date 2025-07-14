'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabaseAuth } from '../contexts/SupabaseAuthContext';
import toast from 'react-hot-toast';
import { authFormSanitizer } from '../../lib/sanitizer';
import { 
  ArrowLeft,
  Eye,
  EyeOff,
  Loader2
} from 'lucide-react';

export default function RegisterPage() {
  const { signUp, loading: authLoading } = useSupabaseAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Calculate password strength for password field
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthText = () => {
    const messages = ['Enter a password', 'Too weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return messages[passwordStrength] || messages[0];
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    
    // Email validation
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      } else {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }
    
    // Password confirmation validation
    if (name === 'confirmPassword' && value) {
      if (value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: 'Passwords do not match' }));
      } else {
        setErrors(prev => ({ ...prev, confirmPassword: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');
    
    // Basic validation
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      toast.error('Please fix the errors in the form', { duration: 6000 });
      return;
    }
    
    try {
      // Sanitize form data before submission
      const sanitizedData = authFormSanitizer(formData);
      
      const { data, error } = await signUp(
        sanitizedData.email,
        formData.password, // Don't sanitize password
        sanitizedData.firstName,
        sanitizedData.lastName
      );
      
      if (data && !error) {
        toast.success('Registration successful! Redirecting...', { duration: 3000 });
        setTimeout(() => {
          router.push('/signin');
        }, 1000);
      } else {
        const errorMessage = error?.message || 'Registration failed. Please try again.';
        setSubmitError(errorMessage);
        toast.error(errorMessage, { duration: 6000 });
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'An error occurred during registration. Please try again.';
      setSubmitError(errorMessage);
      toast.error(errorMessage, { duration: 6000 });
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClassName = (fieldName) => {
    let className = 'form-control';
    if (errors[fieldName]) className += ' error';
    if (formData[fieldName] && !errors[fieldName] && fieldName !== 'confirmPassword') className += ' success';
    if (fieldName === 'confirmPassword' && formData.confirmPassword && formData.password === formData.confirmPassword) className += ' success';
    return className;
  };

  return (
    <>
      {/* Animated Background */}
      <div className="bg-container">
        <div className="gradient-sphere sphere-1"></div>
        <div className="gradient-sphere sphere-2"></div>
        <div className="gradient-sphere sphere-3"></div>
      </div>

      {/* Main Content */}
      <div className="register-page">
        {/* Back to Home */}
        <Link href="/" className="back-home">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Register Container */}
        <div className="register-container">
          {/* Logo */}
          <div className="register-logo">
            <h1 className="gradient-text">BusinessHub</h1>
            <p>All-in-One Business Solutions</p>
          </div>

          {/* Register Card */}
          <div className="register-card">
            <div className="form-header">
              <h2>Create your account</h2>
              <p>Already have an account? <Link href="/signin">Sign in</Link></p>
            </div>

            {submitError && (
              <div className="error-message show">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="name-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className={getInputClassName('firstName')}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    required
                  />
                  {errors.firstName && (
                    <div className="error-message show">{errors.firstName}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className={getInputClassName('lastName')}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    required
                  />
                  {errors.lastName && (
                    <div className="error-message show">{errors.lastName}</div>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={getInputClassName('email')}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onBlur={handleFieldBlur}
                  required
                />
                {errors.email && (
                  <div className="error-message show">{errors.email}</div>
                )}
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={getInputClassName('password')}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('password')}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <div className="password-strength">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`strength-bar ${
                        level <= passwordStrength
                          ? passwordStrength <= 2
                            ? 'weak active'
                            : passwordStrength === 3
                            ? 'medium active'
                            : 'active'
                          : ''
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="strength-text">{getPasswordStrengthText()}</div>
                {errors.password && (
                  <div className="error-message show">{errors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    className={getInputClassName('confirmPassword')}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="error-message show">{errors.confirmPassword}</div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="checkbox-group">
                <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="checkbox-custom"></div>
                </div>
                <label htmlFor="terms">
                  I agree to the <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>
                </label>
              </div>
              {errors.terms && (
                <div className="error-message show">{errors.terms}</div>
              )}

              {/* Submit Button */}
              <button type="submit" className="submit-btn" disabled={isLoading || authLoading}>
                <span id="btnText" style={{ display: isLoading || authLoading ? 'none' : 'inline' }}>
                  Create Account
                </span>
                {(isLoading || authLoading) && (
                  <Loader2 className="loading w-5 h-5" />
                )}
              </button>

              {/* Divider */}
              <div className="divider">
                <span>Or continue with</span>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <button type="button" className="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button type="button" className="social-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  Facebook
                </button>
              </div>

              {/* Footer */}
              <div className="form-footer">
                By signing up, you agree to receive updates and special offers
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}