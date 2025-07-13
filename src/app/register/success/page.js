'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePageTranslations } from '../../../hooks/usePageTranslations';
import { 
  CheckCircle, 
  Building, 
  Clock, 
  Mail, 
  Phone, 
  ArrowRight,
  Home,
  FileText
} from 'lucide-react';

export default function RegistrationSuccessPage() {
  const { t } = usePageTranslations('register');
  const router = useRouter();
  const [registrationData, setRegistrationData] = useState(null);

  useEffect(() => {
    // Get registration data from localStorage
    const storedData = localStorage.getItem('registrationData');
    if (storedData) {
      setRegistrationData(JSON.parse(storedData));
      // Clear the data after reading it
      localStorage.removeItem('registrationData');
    } else {
      // Redirect to home if no registration data found
      router.push('/');
    }
  }, [router]);

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'rejected':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return t('statusPending') || 'Pending Review';
      case 'approved':
        return t('statusApproved') || 'Approved';
      case 'rejected':
        return t('statusRejected') || 'Rejected';
      default:
        return t('statusUnknown') || 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 rounded-full p-4">
                <CheckCircle className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">{t('registrationSuccessful') || 'Registration Successful!'}</h1>
            <p className="text-blue-100 text-lg">
              {t('registrationSuccessMessage') || 'Your business has been successfully registered with ChameleonApp.'}
            </p>
          </div>

          <div className="p-8">
            {/* Business Information Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">{registrationData.businessName}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FileText className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{t('businessId') || 'Business ID'}:</span>
                  <span className="text-gray-900 font-mono text-sm ml-2">{registrationData.businessId}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-500 mr-2" />
                  <span className="text-gray-600">{t('status') || 'Status'}:</span>
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(registrationData.status)}`}>
                    {getStatusText(registrationData.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                {t('nextSteps') || 'What happens next?'}
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">
                      {t('reviewProcess') || 'Review Process'}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t('reviewProcessDesc') || 'Our team will review your application within 24-48 hours to ensure all information is accurate and complete.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">
                      {t('approvalNotification') || 'Approval Notification'}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t('approvalNotificationDesc') || 'You will receive an email notification once your business is approved and ready to be listed.'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 rounded-full p-1 mt-1 mr-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium">
                      {t('businessProfile') || 'Business Profile Setup'}
                    </p>
                    <p className="text-gray-600 text-sm mt-1">
                      {t('businessProfileDesc') || 'Complete your business profile by adding photos, services, and operating hours.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {t('needHelp') || 'Need Help?'}
              </h3>
              <p className="text-gray-600 mb-4">
                {t('needHelpDesc') || 'If you have any questions about your registration or need assistance, please contact our support team.'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-900">support@chameleonapp.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="text-gray-900">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/"
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                {t('backToHome') || 'Back to Home'}
              </Link>
              
              <Link
                href="/businesses"
                className="flex items-center justify-center px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                <Building className="w-5 h-5 mr-2" />
                {t('browseBusiness') || 'Browse Businesses'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}