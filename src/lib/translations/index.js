// Central translation system
import { common } from './common';
import { homeTranslations } from './pages/home';
import { loginTranslations } from './pages/login';
import { registerTranslations } from './pages/register';
import { profileTranslations } from './pages/profile';
import { businessesTranslations } from './pages/businesses';
import { bookingTranslations } from './pages/booking';

// Combine translations for each language
export const translations = {
  en: {
    common: common.en,
    home: homeTranslations.en,
    login: loginTranslations.en,
    register: registerTranslations.en,
    profile: profileTranslations.en,
    businesses: businessesTranslations.en,
    booking: bookingTranslations.en
  },
  es: {
    common: common.es,
    home: homeTranslations.es,
    login: loginTranslations.es,
    register: registerTranslations.es,
    profile: profileTranslations.es,
    businesses: businessesTranslations.es,
    booking: bookingTranslations.es
  }
};

// Helper function to get nested translation
export const getTranslation = (language, path) => {
  const keys = path.split('.');
  let value = translations[language];
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      // Return the path if translation not found (for debugging)
      return path;
    }
  }
  
  return value || path;
};