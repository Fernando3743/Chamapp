'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    home: 'Home',
    businesses: 'Businesses',
    services: 'Services',
    about: 'About',
    contact: 'Contact',
    login: 'Login',
    registerBusiness: 'Register Business',
    SignUp: 'Sign Up',
    createAccount: 'Create Account',
    
    // Hero Section
    heroTitle: 'Your Business,',
    heroTitleHighlight: 'Any Industry',
    heroSubtitle: 'The ultimate platform that adapts to your business needs. From barber shops to restaurants, real estate to services - manage bookings, customers, and grow your business.',
    startYourBusiness: 'Start Your Business',
    browseBusinesses: 'Browse Businesses',
    
    // Business Types
    barberShops: 'Barber Shops',
    restaurants: 'Restaurants',
    realEstate: 'Real Estate',
    healthWellness: 'Health & Wellness',
    fitnessSports: 'Fitness & Sports',
    professionalServices: 'Professional Services',
    
    // Features
    perfectForAnyBusiness: 'Perfect for Any Business',
    platformDescription: 'ChameleonApp adapts to your industry\'s unique needs while providing powerful tools to grow your business.',
    multiBusinessSupport: 'Multi-Business Support',
    multiBusinessDesc: 'One platform that adapts to any business type',
    realTimeUpdates: 'Real-time Updates',
    realTimeDesc: 'Instant availability and booking updates',
    customerManagement: 'Customer Management',
    customerManagementDesc: 'Comprehensive customer database and history',
    analyticsReports: 'Analytics & Reports',
    analyticsDesc: 'Detailed insights into your business performance',
    
    // Business Listing
    browseBusiness: 'Browse Businesses',
    discoverBusinesses: 'Discover amazing businesses in your area',
    all: 'All',
    viewDetails: 'View Details',
    services: 'Services',
    
    // Business Detail
    bookAppointment: 'Book Appointment',
    contactInformation: 'Contact Information',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    website: 'Website',
    businessHours: 'Business Hours',
    ourTeam: 'Our Team',
    reviews: 'Reviews',
    backToBusinesses: 'Back to Businesses',
    
    // Booking
    bookAnAppointment: 'Book an Appointment',
    selectService: 'Select Service',
    selectServicePlaceholder: 'Choose a service...',
    selectStaff: 'Select Staff Member',
    anyAvailableStaff: 'Any available staff',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    selectTimePlaceholder: 'Choose a time...',
    yourInformation: 'Your Information',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    specialNotes: 'Special Notes (Optional)',
    specialNotesPlaceholder: 'Any special requests or notes...',
    bookingSummary: 'Booking Summary',
    service: 'Service',
    staff: 'Staff',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    cancel: 'Cancel',
    
    // Registration
    registerYourBusiness: 'Register Your Business',
    joinChameleonApp: 'Join ChameleonApp and start growing your business today',
    businessInformation: 'Business Information',
    personalInformation: 'Personal Information',
    firstNameRequired: 'First Name (Required)',
    lastNameRequired: 'Last Name (Required)',
    emailRequired: 'Email (Required)',
    phoneOptional: 'Phone (Optional)',
    dateOfBirthOptional: 'Date of Birth (Optional)',
    businessName: 'Business Name',
    businessType: 'Business Type',
    selectBusinessType: 'Select business type...',
    businessDescription: 'Business Description',
    businessDescPlaceholder: 'Describe your business, services, and what makes you unique...',
    businessAddress: 'Business Address',
    streetAddress: 'Street Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    businessPhone: 'Business Phone',
    businessEmail: 'Business Email',
    websiteOptional: 'Website (Optional)',
    websitePlaceholder: 'https://your-website.com',
    ownerInformation: 'Owner Information',
    ownerFullName: 'Owner Full Name',
    ownerEmail: 'Owner Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    agreeToTerms: 'I agree to the',
    termsOfService: 'Terms of Service',
    and: 'and',
    privacyPolicy: 'Privacy Policy',
    
    // Days of the week
    monday: 'Monday',
    tuesday: 'Tuesday',
    wednesday: 'Wednesday',
    thursday: 'Thursday',
    friday: 'Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    
    // Footer
    footerDescription: 'The ultimate multi-purpose business platform that adapts to any industry. Manage your business, engage customers, and grow your success.',
    platform: 'Platform',
    pricing: 'Pricing',
    support: 'Support',
    helpCenter: 'Help Center',
    contactUs: 'Contact Us',
    allRightsReserved: 'All rights reserved.',
    
    // Common
    backToHome: 'Back to Home',
    required: 'Required',
    optional: 'Optional',
    
    // Business Types Extended
    barber: 'Barber',
    restaurant: 'Restaurant',
    real_estate: 'Real Estate',
    wellness: 'Wellness',
    fitness: 'Fitness',
    professional: 'Professional',
    beauty: 'Beauty & Spa',
    automotive: 'Automotive',
    education: 'Education & Training',
    other: 'Other',
    
    // Business Descriptions
    barberShopDesc: 'Manage appointments, staff schedules, and services with ease',
    restaurantDesc: 'Handle reservations, table management, and menu updates',
    realEstateDesc: 'Showcase properties, schedule viewings, and manage clients',
    healthWellnessDesc: 'Book appointments, manage treatments, and track client progress',
    professionalServicesDesc: 'Schedule consultations, manage projects, and track billable hours',
    fitnessDesc: 'Class scheduling, membership management, and equipment booking',
    
    // Business Features
    staffScheduling: 'Staff scheduling',
    serviceCatalog: 'Service catalog',
    customerManagementSimple: 'Customer management',
    tableReservations: 'Table reservations',
    menuManagement: 'Menu management',
    customerReviews: 'Customer reviews',
    propertyListings: 'Property listings',
    viewingAppointments: 'Viewing appointments',
    clientManagement: 'Client management',
    treatmentScheduling: 'Treatment scheduling',
    clientRecords: 'Client records',
    progressTracking: 'Progress tracking',
    consultationBooking: 'Consultation booking',
    projectManagement: 'Project management',
    timeTracking: 'Time tracking',
    classSchedules: 'Class schedules',
    membershipPlans: 'Membership plans',
    equipmentBooking: 'Equipment booking',
    
    // Business Detail Extended
    bookNow: 'Book Now',
    specialty: 'Specialty',
    agoText: 'ago',
    daysAgo: 'days ago',
    weekAgo: 'week ago',
    weeksAgo: 'weeks ago',
    
    // Business Detail Sections
    gallery: 'Gallery',
    location: 'Location',
    
    // Booking Extended
    chooseService: 'Choose a service...',
    chooseTime: 'Choose a time...',
    anySpecialRequests: 'Any special requests or notes...',
    
    // Registration Extended
    businessNameRequired: 'Business Name *',
    businessTypeRequired: 'Business Type *',
    businessDescriptionRequired: 'Business Description *',
    streetAddressRequired: 'Street Address *',
    cityRequired: 'City *',
    stateRequired: 'State *',
    zipCodeRequired: 'ZIP Code *',
    businessPhoneRequired: 'Business Phone *',
    businessEmailRequired: 'Business Email *',
    ownerFullNameRequired: 'Owner Full Name *',
    ownerEmailRequired: 'Owner Email *',
    passwordRequired: 'Password *',
    confirmPasswordRequired: 'Confirm Password *',
    
    // Messages
    bookingSubmitted: 'Booking request submitted! You will receive a confirmation email shortly.',
    registrationSubmitted: 'Registration submitted! You will receive a confirmation email shortly.',
    passwordsDoNotMatch: 'Passwords do not match!',
    
    // Business Card
    businessImage: 'Business Image',
    businessHeroImage: 'Business Hero Image',
    photo: 'Photo',
    
    // Ratings and Reviews
    reviewsCount: 'reviews',
    writeReview: 'Write Review',
    
    // Time and Dates
    minutes: 'minutes',
    min: 'min',
    am: 'AM',
    pm: 'PM',
    
    // Buttons and Actions
    submit: 'Submit',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    open: 'Open',
    loading: 'Loading...',
    
    // Form Validation
    fieldRequired: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    
    // Status
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    completed: 'Completed',
    
    // Units
    per: 'per',
    hour: 'hour',
    day: 'day',
    week: 'week',
    month: 'month',
    
    // Features Section
    featuresTitle: 'Powerful Platform Features',
    
    // Footer Extended
    quickLinks: 'Quick Links',
    legal: 'Legal',
    followUs: 'Follow Us',
    newsletter: 'Newsletter',
    subscribeNewsletter: 'Subscribe to our newsletter for updates',
    enterEmail: 'Enter your email',
    subscribe: 'Subscribe',
    
    // Error Messages
    somethingWentWrong: 'Something went wrong. Please try again.',
    pageNotFound: 'Page not found',
    goBack: 'Go back',
    
    // Success Messages
    subscriptionSuccess: 'Successfully subscribed to newsletter!',
    messageSent: 'Message sent successfully!',
    
    // Registration Steps
    complete: 'Complete'
  },
  es: {
    // Navigation
    home: 'Inicio',
    businesses: 'Negocios',
    services: 'Servicios',
    about: 'Acerca de',
    contact: 'Contacto',
    login: 'Iniciar Sesión',
    registerBusiness: 'Registrar Negocio',
    SignUp: 'Registrarse',
    createAccount: 'Crear Cuenta',
    
    // Hero Section
    heroTitle: 'Tu Negocio,',
    heroTitleHighlight: 'Cualquier Industria',
    heroSubtitle: 'La plataforma definitiva que se adapta a las necesidades de tu negocio. Desde barberías hasta restaurantes, inmobiliarias hasta servicios: gestiona reservas, clientes y haz crecer tu negocio.',
    startYourBusiness: 'Inicia Tu Negocio',
    browseBusinesses: 'Explorar Negocios',
    
    // Business Types
    barberShops: 'Barberías',
    restaurants: 'Restaurantes',
    realEstate: 'Inmobiliarias',
    healthWellness: 'Salud y Bienestar',
    fitnessSports: 'Fitness y Deportes',
    professionalServices: 'Servicios Profesionales',
    
    // Features
    perfectForAnyBusiness: 'Perfecto para Cualquier Negocio',
    platformDescription: 'ChameleonApp se adapta a las necesidades únicas de tu industria mientras proporciona herramientas poderosas para hacer crecer tu negocio.',
    multiBusinessSupport: 'Soporte Multi-Negocio',
    multiBusinessDesc: 'Una plataforma que se adapta a cualquier tipo de negocio',
    realTimeUpdates: 'Actualizaciones en Tiempo Real',
    realTimeDesc: 'Disponibilidad instantánea y actualizaciones de reservas',
    customerManagement: 'Gestión de Clientes',
    customerManagementDesc: 'Base de datos completa de clientes e historial',
    analyticsReports: 'Análisis e Informes',
    analyticsDesc: 'Información detallada sobre el rendimiento de tu negocio',
    
    // Business Listing
    browseBusiness: 'Explorar Negocios',
    discoverBusinesses: 'Descubre increíbles negocios en tu área',
    all: 'Todos',
    viewDetails: 'Ver Detalles',
    services: 'Servicios',
    
    // Business Detail
    bookAppointment: 'Reservar Cita',
    contactInformation: 'Información de Contacto',
    address: 'Dirección',
    phone: 'Teléfono',
    email: 'Email',
    website: 'Sitio Web',
    businessHours: 'Horario de Atención',
    ourTeam: 'Nuestro Equipo',
    reviews: 'Reseñas',
    backToBusinesses: 'Volver a Negocios',
    
    // Booking
    bookAnAppointment: 'Reservar una Cita',
    selectService: 'Seleccionar Servicio',
    selectServicePlaceholder: 'Elige un servicio...',
    selectStaff: 'Seleccionar Miembro del Personal',
    anyAvailableStaff: 'Cualquier personal disponible',
    selectDate: 'Seleccionar Fecha',
    selectTime: 'Seleccionar Hora',
    selectTimePlaceholder: 'Elige una hora...',
    yourInformation: 'Tu Información',
    fullName: 'Nombre Completo',
    emailAddress: 'Dirección de Email',
    phoneNumber: 'Número de Teléfono',
    specialNotes: 'Notas Especiales (Opcional)',
    specialNotesPlaceholder: 'Cualquier solicitud especial o notas...',
    bookingSummary: 'Resumen de Reserva',
    service: 'Servicio',
    staff: 'Personal',
    date: 'Fecha',
    time: 'Hora',
    duration: 'Duración',
    cancel: 'Cancelar',
    
    // Registration
    registerYourBusiness: 'Registra Tu Negocio',
    joinChameleonApp: 'Únete a ChameleonApp y comienza a hacer crecer tu negocio hoy',
    businessInformation: 'Información del Negocio',
    personalInformation: 'Información Personal',
    firstNameRequired: 'Nombre (Requerido)',
    lastNameRequired: 'Apellido (Requerido)',
    emailRequired: 'Correo (Requerido)',
    phoneOptional: 'Teléfono (Opcional)',
    dateOfBirthOptional: 'Fecha de Nacimiento (Opcional)',
    businessName: 'Nombre del Negocio',
    businessType: 'Tipo de Negocio',
    selectBusinessType: 'Selecciona el tipo de negocio...',
    businessDescription: 'Descripción del Negocio',
    businessDescPlaceholder: 'Describe tu negocio, servicios y lo que te hace único...',
    businessAddress: 'Dirección del Negocio',
    streetAddress: 'Dirección de la Calle',
    city: 'Ciudad',
    state: 'Estado',
    zipCode: 'Código Postal',
    businessPhone: 'Teléfono del Negocio',
    businessEmail: 'Email del Negocio',
    websiteOptional: 'Sitio Web (Opcional)',
    websitePlaceholder: 'https://tu-sitio-web.com',
    ownerInformation: 'Información del Propietario',
    ownerFullName: 'Nombre Completo del Propietario',
    ownerEmail: 'Email del Propietario',
    password: 'Contraseña',
    confirmPassword: 'Confirmar Contraseña',
    agreeToTerms: 'Acepto los',
    termsOfService: 'Términos de Servicio',
    and: 'y',
    privacyPolicy: 'Política de Privacidad',
    
    // Days of the week
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo',
    
    // Footer
    footerDescription: 'La plataforma de negocios multipropósito definitiva que se adapta a cualquier industria. Gestiona tu negocio, involucra a los clientes y haz crecer tu éxito.',
    platform: 'Plataforma',
    pricing: 'Precios',
    support: 'Soporte',
    helpCenter: 'Centro de Ayuda',
    contactUs: 'Contáctanos',
    allRightsReserved: 'Todos los derechos reservados.',
    
    // Common
    backToHome: 'Volver al Inicio',
    required: 'Requerido',
    optional: 'Opcional',
    
    // Business Types Extended
    barber: 'Barbero',
    restaurant: 'Restaurante',
    real_estate: 'Inmobiliaria',
    wellness: 'Bienestar',
    fitness: 'Fitness',
    professional: 'Profesional',
    beauty: 'Belleza y Spa',
    automotive: 'Automotriz',
    education: 'Educación y Capacitación',
    other: 'Otro',
    
    // Business Descriptions
    barberShopDesc: 'Gestiona citas, horarios del personal y servicios con facilidad',
    restaurantDesc: 'Maneja reservas, gestión de mesas y actualizaciones del menú',
    realEstateDesc: 'Muestra propiedades, programa visitas y gestiona clientes',
    healthWellnessDesc: 'Reserva citas, gestiona tratamientos y rastrea el progreso del cliente',
    professionalServicesDesc: 'Programa consultas, gestiona proyectos y rastrea horas facturables',
    fitnessDesc: 'Programación de clases, gestión de membresías y reserva de equipos',
    
    // Business Features
    staffScheduling: 'Programación de personal',
    serviceCatalog: 'Catálogo de servicios',
    customerManagementSimple: 'Gestión de clientes',
    tableReservations: 'Reservas de mesa',
    menuManagement: 'Gestión de menú',
    customerReviews: 'Reseñas de clientes',
    propertyListings: 'Listados de propiedades',
    viewingAppointments: 'Citas de visualización',
    clientManagement: 'Gestión de clientes',
    treatmentScheduling: 'Programación de tratamientos',
    clientRecords: 'Registros de clientes',
    progressTracking: 'Seguimiento de progreso',
    consultationBooking: 'Reserva de consultas',
    projectManagement: 'Gestión de proyectos',
    timeTracking: 'Seguimiento de tiempo',
    classSchedules: 'Horarios de clases',
    membershipPlans: 'Planes de membresía',
    equipmentBooking: 'Reserva de equipos',
    
    // Business Detail Extended
    bookNow: 'Reservar Ahora',
    specialty: 'Especialidad',
    agoText: 'atrás',
    daysAgo: 'días atrás',
    weekAgo: 'semana atrás',
    weeksAgo: 'semanas atrás',
    
    // Business Detail Sections
    gallery: 'Galería',
    location: 'Ubicación',
    
    // Booking Extended
    chooseService: 'Elige un servicio...',
    chooseTime: 'Elige una hora...',
    anySpecialRequests: 'Cualquier solicitud especial o notas...',
    
    // Registration Extended
    businessNameRequired: 'Nombre del Negocio *',
    businessTypeRequired: 'Tipo de Negocio *',
    businessDescriptionRequired: 'Descripción del Negocio *',
    streetAddressRequired: 'Dirección de la Calle *',
    cityRequired: 'Ciudad *',
    stateRequired: 'Estado *',
    zipCodeRequired: 'Código Postal *',
    businessPhoneRequired: 'Teléfono del Negocio *',
    businessEmailRequired: 'Email del Negocio *',
    ownerFullNameRequired: 'Nombre Completo del Propietario *',
    ownerEmailRequired: 'Email del Propietario *',
    passwordRequired: 'Contraseña *',
    confirmPasswordRequired: 'Confirmar Contraseña *',
    
    // Messages
    bookingSubmitted: '¡Solicitud de reserva enviada! Recibirás un email de confirmación pronto.',
    registrationSubmitted: '¡Registro enviado! Recibirás un email de confirmación pronto.',
    passwordsDoNotMatch: '¡Las contraseñas no coinciden!',
    
    // Business Card
    businessImage: 'Imagen del Negocio',
    businessHeroImage: 'Imagen Principal del Negocio',
    photo: 'Foto',
    
    // Ratings and Reviews
    reviewsCount: 'reseñas',
    writeReview: 'Escribir Reseña',
    
    // Time and Dates
    minutes: 'minutos',
    min: 'min',
    am: 'AM',
    pm: 'PM',
    
    // Buttons and Actions
    submit: 'Enviar',
    save: 'Guardar',
    edit: 'Editar',
    delete: 'Eliminar',
    close: 'Cerrar',
    open: 'Abrir',
    loading: 'Cargando...',
    
    // Form Validation
    fieldRequired: 'Este campo es requerido',
    invalidEmail: 'Por favor ingresa un email válido',
    invalidPhone: 'Por favor ingresa un número de teléfono válido',
    
    // Status
    pending: 'Pendiente',
    confirmed: 'Confirmado',
    cancelled: 'Cancelado',
    completed: 'Completado',
    
    // Units
    per: 'por',
    hour: 'hora',
    day: 'día',
    week: 'semana',
    month: 'mes',
    
    // Features Section
    featuresTitle: 'Características Poderosas de la Plataforma',
    
    // Footer Extended
    quickLinks: 'Enlaces Rápidos',
    legal: 'Legal',
    followUs: 'Síguenos',
    newsletter: 'Boletín',
    subscribeNewsletter: 'Suscríbete a nuestro boletín para actualizaciones',
    enterEmail: 'Ingresa tu email',
    subscribe: 'Suscribirse',
    
    // Error Messages
    somethingWentWrong: 'Algo salió mal. Por favor intenta de nuevo.',
    pageNotFound: 'Página no encontrada',
    goBack: 'Volver',
    
    // Success Messages
    subscriptionSuccess: '¡Suscripción exitosa al boletín!',
    messageSent: '¡Mensaje enviado exitosamente!',
    
    // Registration Steps
    complete: 'Completar'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};