'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { 
  Mail, 
  Lock, 
  LogIn, 
  ArrowLeft,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';

export default function LoginPage() {
  const { t } = usePageTranslations('login');
  const { signIn, loading: authLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Clear general submit error
    if (submitError) {
      setSubmitError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');
    
    // Validate form
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      
      // Show toast notification for validation errors
      const errorCount = Object.keys(validationErrors).length;
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} in the form`, {
        duration: 4000,
      });
      
      return;
    }
    
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      
      if (data && !error) {
        // Show success toast
        toast.success('Login successful! Welcome back!', {
          duration: 3000,
        });
        
        // Redirect to dashboard or home page
        setTimeout(() => {
          router.push('/');
        }, 500);
      } else {
        const errorMessage = error?.message || 'Login failed. Please check your credentials.';
        setSubmitError(errorMessage);
        toast.error(errorMessage, {
          duration: 6000,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'An error occurred during login. Please try again.';
      setSubmitError(errorMessage);
      toast.error(errorMessage, {
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName) => {
    const error = errors[fieldName];
    if (!error) return null;
    
    return (
      <div className="flex items-center mt-1 text-red-600 text-sm">
        <AlertCircle className="w-4 h-4 mr-1" />
        {error}
      </div>
    );
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900 placeholder-gray-500 bg-white";
    const errorClass = errors[fieldName] ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('backToHome')}
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-3">
                <LogIn className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{t('welcomeBack')}</h1>
            <p className="text-blue-100 text-lg">{t('signInToAccount')}</p>
          </div>

          <div className="p-8">
            {/* General Error Display */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700">{submitError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  {t('emailRequired')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={getInputClassName('email')}
                  placeholder={t('enterEmail')}
                  required
                />
                {renderFieldError('email')}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  {t('passwordRequired')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={getInputClassName('password')}
                    placeholder={t('enterPassword')}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {renderFieldError('password')}
              </div>

              {/* Forgot Password Link */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    {t('rememberMe')}
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                    {t('forgotPassword')}
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {(isLoading || authLoading) ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5 mr-2" />
                )}
                {(isLoading || authLoading) ? t('signingIn') || 'Signing In...' : t('signIn')}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {t('dontHaveAccount')}{' '}
                <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                  {t('SignUp')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}