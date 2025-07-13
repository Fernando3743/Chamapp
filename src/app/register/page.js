'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import { useAuth } from '../contexts/AuthContext';
import { validateUserRegistration, getFieldError, hasFieldError } from '../../lib/validation';
import toast from 'react-hot-toast';
import { 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  User, 
  Lock, 
  CheckCircle,
  ArrowLeft,
  Store,
  Users,
  Calendar,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function RegisterPage() {
  const { t } = usePageTranslations('register');
  const { signUp, loading: authLoading } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const businessTypes = [
    { value: 'barber', label: t('barberShops') },
    { value: 'restaurant', label: t('restaurants') },
    { value: 'real_estate', label: t('realEstate') },
    { value: 'wellness', label: t('healthWellness') },
    { value: 'fitness', label: t('fitnessSports') },
    { value: 'professional', label: t('professionalServices') },
    { value: 'beauty', label: t('beauty') },
    { value: 'automotive', label: t('automotive') },
    { value: 'education', label: t('education') },
    { value: 'other', label: t('other') }
  ];

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

  const handleFieldBlur = (e) => {
    const { name, value } = e.target;
    
    // Validate specific field on blur for immediate feedback
    const tempFormData = { ...formData, [name]: value };
    const validation = validateUserRegistration(tempFormData);
    
    if (validation.errors[name]) {
      setErrors(prev => ({ ...prev, [name]: validation.errors[name] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitError('');
    
    // Validate form
    const validation = validateUserRegistration(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsLoading(false);
      
      // Show toast notification for validation errors
      const errorCount = Object.keys(validation.errors).length;
      toast.error(`Please fix ${errorCount} error${errorCount > 1 ? 's' : ''} in the form`, {
        duration: 6000,
      });
      
      return;
    }
    
    try {
      const { data, error } = await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        formData.phone,
        formData.dateOfBirth
      );
      
      if (data && !error) {
        // Store registration data in localStorage for success page
        localStorage.setItem('registrationData', JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          userId: data.userId
        }));
        
        // Show success toast
        toast.success('Registration successful! Redirecting...', {
          duration: 3000,
        });
        
        // Redirect to success page after a brief delay
        setTimeout(() => {
          router.push('/register/success');
        }, 1000);
      } else {
        const errorMessage = error?.message || 'Registration failed. Please try again.';
        setSubmitError(errorMessage);
        toast.error(errorMessage, {
          duration: 6000,
        });
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = 'An error occurred during registration. Please try again.';
      setSubmitError(errorMessage);
      toast.error(errorMessage, {
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderFieldError = (fieldName) => {
    const error = getFieldError(fieldName, errors);
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
    const errorClass = hasFieldError(fieldName, errors) ? "border-red-500 focus:ring-red-500 focus:border-red-500" : "border-gray-300";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <Building className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{t('createAccount')}</h1>
            <p className="text-blue-100 text-lg">{t('joinChameleonApp')}</p>
          </div>

          {/* Progress Steps */}
          <div className="bg-gray-50 px-8 py-4">
            <div className="flex justify-between items-center max-w-2xl mx-auto">
              <div className="flex items-center">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">{t('personalInformation')}</span>
              </div>
              <div className="flex-1 h-px bg-gray-300 mx-4"></div>
              <div className="flex items-center">
                <div className="bg-gray-300 text-gray-500 rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="ml-2 text-sm font-medium text-gray-500">{t('complete')}</span>
              </div>
            </div>
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

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{t('personalInformation')}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t('firstNameRequired')}
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={getInputClassName('firstName')}
                    required
                  />
                  {renderFieldError('firstName')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    {t('lastNameRequired')}
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={getInputClassName('lastName')}
                    required
                  />
                  {renderFieldError('lastName')}
                </div>

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
                    onBlur={handleFieldBlur}
                    className={getInputClassName('email')}
                    required
                  />
                  {renderFieldError('email')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    {t('phoneOptional')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={getInputClassName('phone')}
                  />
                  {renderFieldError('phone')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    {t('dateOfBirthOptional')}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={getInputClassName('dateOfBirth')}
                  />
                  {renderFieldError('dateOfBirth')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    {t('passwordRequired')}
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={getInputClassName('password')}
                    required
                  />
                  {renderFieldError('password')}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    {t('confirmPasswordRequired')}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onBlur={handleFieldBlur}
                    className={getInputClassName('confirmPassword')}
                    required
                  />
                  {renderFieldError('confirmPassword')}
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="flex items-start">
                <input
                  id="agree-terms"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                  required
                />
                <label htmlFor="agree-terms" className="ml-3 block text-sm text-gray-900">
                  <CheckCircle className="w-4 h-4 inline mr-2 text-blue-600" />
                  {t('agreeToTerms')}{' '}
                  <Link href="/terms" className="text-blue-600 hover:text-blue-800 font-medium">
                    {t('termsOfService')}
                  </Link>{' '}
                  {t('and')}{' '}
                  <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-medium">
                    {t('privacyPolicy')}
                  </Link>
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <Link 
                href="/"
                className="w-full sm:w-auto px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium"
              >
                {t('cancel')}
              </Link>
              <button
                type="submit"
                disabled={isLoading || authLoading}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {(isLoading || authLoading) ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {(isLoading || authLoading) ? t('processing') || 'Processing...' : t('createAccount')}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}