'use client';

import React from 'react';
import { Home, Scissors, Utensils, Dumbbell, Heart, Briefcase } from 'lucide-react';
import { usePageTranslations } from '../../hooks/usePageTranslations';
import styles from '../styles/components/BusinessTypes.module.css';

const BusinessTypes = React.memo(() => {
  const { t } = usePageTranslations('home');

  const businessTypes = [
    {
      icon: <Home className="w-12 h-12" />,
      title: t('realEstate'),
      features: [
        t('propertyListingsManagement'),
        t('virtualToursGalleries'),
        t('clientCrmFollowUps'),
        t('documentManagement'),
        t('commissionTracking')
      ]
    },
    {
      icon: <Scissors className="w-12 h-12" />,
      title: t('barberShops'),
      features: [
        t('onlineAppointmentBooking'),
        t('staffSchedulingFull'),
        t('customerFeedbackSystem'),
        t('inventoryManagement'),
        t('loyaltyPrograms')
      ]
    },
    {
      icon: <Utensils className="w-12 h-12" />,
      title: t('restaurants'),
      features: [
        t('digitalMenuQrCodes'),
        t('tableReservationsFull'),
        t('orderManagement'),
        t('kitchenDisplaySystem'),
        t('deliveryIntegration')
      ]
    },
    {
      icon: <Dumbbell className="w-12 h-12" />,
      title: t('fitnessSports'),
      features: [
        t('memberManagement'),
        t('classSchedulingFull'),
        t('personalTrainingBookings'),
        t('paymentProcessing'),
        t('progressTrackingFull')
      ]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: t('healthWellness'),
      features: [
        t('patientAppointments'),
        t('medicalRecords'),
        t('prescriptionManagement'),
        t('billingInsurance'),
        t('telemedicineSupport')
      ]
    },
    {
      icon: <Briefcase className="w-12 h-12" />,
      title: t('professionalServices'),
      features: [
        t('inventoryTracking'),
        t('posIntegration'),
        t('customerDatabase'),
        t('salesAnalytics'),
        t('multiChannelSelling')
      ]
    }
  ];

  return (
    <section className={styles.businessTypes} id="solutions">
      <div className={styles.sectionHeader}>
        <h2>
          {t('solutionsForEveryIndustry').split(' ').slice(0, 2).join(' ')} <span className={styles.gradientText}>{t('solutionsForEveryIndustry').split(' ').slice(2).join(' ')}</span>
        </h2>
        <p>
          {t('preBuiltSolutions')}
        </p>
      </div>

      <div className={styles.businessShowcase}>
        {businessTypes.map((business, index) => (
          <div key={index} className={styles.businessCard}>
            <div className={styles.businessCardIcon}>
              {business.icon}
            </div>
            
            <h3>{business.title}</h3>
            
            <ul>
              {business.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
});

BusinessTypes.displayName = 'BusinessTypes';

export default BusinessTypes;