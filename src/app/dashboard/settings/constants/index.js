/**
 * Constants for settings page
 */

// Navigation sections
export const SETTINGS_SECTIONS = {
  GENERAL: 'general',
  BUSINESS: 'business',
  TEAM: 'team',
  NOTIFICATIONS: 'notifications',
  BILLING: 'billing',
  INTEGRATIONS: 'integrations',
  SECURITY: 'security'
};

// Navigation items configuration
export const NAVIGATION_ITEMS = [
  {
    id: SETTINGS_SECTIONS.GENERAL,
    icon: '⚙️',
    labelKey: 'general'
  },
  {
    id: SETTINGS_SECTIONS.BUSINESS,
    icon: '🏢',
    labelKey: 'businessProfile'
  },
  {
    id: SETTINGS_SECTIONS.TEAM,
    icon: '👥',
    labelKey: 'teamStaff'
  },
  {
    id: SETTINGS_SECTIONS.NOTIFICATIONS,
    icon: '🔔',
    labelKey: 'notifications'
  },
  {
    id: SETTINGS_SECTIONS.BILLING,
    icon: '💳',
    labelKey: 'billingPlans'
  },
  {
    id: SETTINGS_SECTIONS.INTEGRATIONS,
    icon: '🔗',
    labelKey: 'integrations'
  },
  {
    id: SETTINGS_SECTIONS.SECURITY,
    icon: '🔒',
    labelKey: 'security'
  }
];

// Business types
export const BUSINESS_TYPES = [
  { value: 'beautySalon', labelKey: 'beautySalon' },
  { value: 'spaWellness', labelKey: 'spaWellness' },
  { value: 'fitnessCenter', labelKey: 'fitnessCenter' },
  { value: 'medicalPractice', labelKey: 'medicalPractice' },
  { value: 'other', labelKey: 'other' }
];

// Language options
export const LANGUAGE_OPTIONS = [
  { value: 'en', labelKey: 'englishUS' },
  { value: 'es', labelKey: 'spanish' },
  { value: 'fr', labelKey: 'french' },
  { value: 'de', labelKey: 'german' }
];

// Timezone options
export const TIMEZONE_OPTIONS = [
  { value: 'America/New_York', labelKey: 'easternTime' },
  { value: 'America/Chicago', labelKey: 'centralTime' },
  { value: 'America/Denver', labelKey: 'mountainTime' },
  { value: 'America/Los_Angeles', labelKey: 'pacificTime' }
];

// Date format options
export const DATE_FORMAT_OPTIONS = [
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
];

// Days of week
export const DAYS_OF_WEEK = [
  { key: 'monday', defaultHours: '9:00 AM - 6:00 PM', isOpen: true },
  { key: 'tuesday', defaultHours: '9:00 AM - 6:00 PM', isOpen: true },
  { key: 'wednesday', defaultHours: '9:00 AM - 6:00 PM', isOpen: true },
  { key: 'thursday', defaultHours: '9:00 AM - 8:00 PM', isOpen: true },
  { key: 'friday', defaultHours: '9:00 AM - 8:00 PM', isOpen: true },
  { key: 'saturday', defaultHours: '10:00 AM - 5:00 PM', isOpen: true },
  { key: 'sunday', defaultHours: 'Closed', isOpen: false }
];

// Permission types
export const PERMISSION_TYPES = [
  {
    key: 'viewAppointments',
    descriptionKey: 'viewAppointmentsDesc',
    defaultValue: true
  },
  {
    key: 'manageAppointments',
    descriptionKey: 'manageAppointmentsDesc',
    defaultValue: true
  },
  {
    key: 'accessCustomerData',
    descriptionKey: 'accessCustomerDataDesc',
    defaultValue: false
  },
  {
    key: 'processPayments',
    descriptionKey: 'processPaymentsDesc',
    defaultValue: false
  },
  {
    key: 'viewReports',
    descriptionKey: 'viewReportsDesc',
    defaultValue: false
  }
];

// Notification types
export const EMAIL_NOTIFICATION_TYPES = [
  {
    key: 'newAppointments',
    descriptionKey: 'newAppointmentsDesc',
    defaultValue: true
  },
  {
    key: 'cancellations',
    descriptionKey: 'cancellationsDesc',
    defaultValue: true
  },
  {
    key: 'newCustomers',
    descriptionKey: 'newCustomersDesc',
    defaultValue: true
  },
  {
    key: 'reviews',
    descriptionKey: 'reviewsDesc',
    defaultValue: true
  },
  {
    key: 'marketingUpdates',
    descriptionKey: 'marketingUpdatesDesc',
    defaultValue: false
  }
];

export const PUSH_NOTIFICATION_TYPES = [
  {
    key: 'desktopNotifications',
    descriptionKey: 'desktopNotificationsDesc',
    defaultValue: true
  },
  {
    key: 'mobilePush',
    descriptionKey: 'mobilePushDesc',
    defaultValue: true
  },
  {
    key: 'soundAlerts',
    descriptionKey: 'soundAlertsDesc',
    defaultValue: false
  }
];

export const SMS_NOTIFICATION_TYPES = [
  {
    key: 'appointmentReminders',
    descriptionKey: 'appointmentRemindersDesc',
    defaultValue: true
  },
  {
    key: 'noShowAlerts',
    descriptionKey: 'noShowAlertsDesc',
    defaultValue: true
  },
  {
    key: 'paymentConfirmations',
    descriptionKey: 'paymentConfirmationsDesc',
    defaultValue: false
  }
];

// Subscription plans
export const SUBSCRIPTION_PLANS = [
  {
    id: 'starter',
    nameKey: 'starter',
    price: 29,
    features: [
      'upToAppointments',
      'staffMember',
      'basicReports',
      'emailSupport'
    ]
  },
  {
    id: 'professional',
    nameKey: 'professional',
    price: 79,
    features: [
      'unlimitedAppointments',
      'upToStaff',
      'advancedReports',
      'prioritySupport',
      'smsReminders'
    ],
    recommended: true
  },
  {
    id: 'enterprise',
    nameKey: 'enterprise',
    price: 199,
    features: [
      'everythingInProfessional',
      'unlimitedStaff',
      'customIntegrations',
      'dedicatedSupport',
      'multipleLocations'
    ]
  }
];

// Integration types
export const INTEGRATIONS = {
  CONNECTED: [
    {
      id: 'google-calendar',
      name: 'Google Calendar',
      icon: '📅',
      status: 'connected'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💳',
      status: 'connected'
    }
  ],
  AVAILABLE: [
    {
      id: 'mailchimp',
      name: 'Mailchimp',
      icon: '📧',
      status: 'notConnected'
    },
    {
      id: 'twilio',
      name: 'Twilio SMS',
      icon: '📱',
      status: 'notConnected'
    },
    {
      id: 'zoom',
      name: 'Zoom',
      icon: '📹',
      status: 'notConnected'
    },
    {
      id: 'quickbooks',
      name: 'QuickBooks',
      icon: '💼',
      status: 'notConnected'
    }
  ],
  EXPLORE: [
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      icon: '📊',
      description: 'Track website traffic'
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      icon: '📞',
      description: 'Customer messaging'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: '📸',
      description: 'Social media sync'
    }
  ]
};