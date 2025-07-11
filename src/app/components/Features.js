'use client';

import { useLanguage } from '../contexts/LanguageContext';

export default function Features() {
  const { t } = useLanguage();
  const businessTypes = [
    {
      title: t('barberShops'),
      description: t('barberShopDesc'),
      icon: "✂️",
      features: [t('staffScheduling'), t('serviceCatalog'), t('customerManagementSimple')]
    },
    {
      title: t('restaurants'),
      description: t('restaurantDesc'),
      icon: "🍽️",
      features: [t('tableReservations'), t('menuManagement'), t('customerReviews')]
    },
    {
      title: t('realEstate'),
      description: t('realEstateDesc'),
      icon: "🏠",
      features: [t('propertyListings'), t('viewingAppointments'), t('clientManagement')]
    },
    {
      title: t('healthWellness'),
      description: t('healthWellnessDesc'),
      icon: "💆",
      features: [t('treatmentScheduling'), t('clientRecords'), t('progressTracking')]
    },
    {
      title: t('professionalServices'),
      description: t('professionalServicesDesc'),
      icon: "💼",
      features: [t('consultationBooking'), t('projectManagement'), t('timeTracking')]
    },
    {
      title: t('fitnessSports'),
      description: t('fitnessDesc'),
      icon: "🏋️",
      features: [t('classSchedules'), t('membershipPlans'), t('equipmentBooking')]
    }
  ];

  const platformFeatures = [
    {
      title: t('multiBusinessSupport'),
      description: t('multiBusinessDesc'),
      icon: "🔄"
    },
    {
      title: t('realTimeUpdates'),
      description: t('realTimeDesc'),
      icon: "⚡"
    },
    {
      title: t('customerManagement'),
      description: t('customerManagementDesc'),
      icon: "👥"
    },
    {
      title: t('analyticsReports'),
      description: t('analyticsDesc'),
      icon: "📊"
    }
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('perfectForAnyBusiness')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('platformDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {businessTypes.map((business, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{business.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{business.title}</h3>
              <p className="text-gray-600 mb-4">{business.description}</p>
              <ul className="space-y-2">
                {business.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {t('featuresTitle')}
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}