// Central translation system
import { common } from './common';
import { homeTranslations } from './pages/home';
import { loginTranslations } from './pages/login';
import { registerTranslations } from './pages/register';
import { profileTranslations } from './pages/profile';
import { businessesTranslations } from './pages/businesses';
import { bookingTranslations } from './pages/booking';

// Combine all page translations
const allTranslations = {
  common,
  home: homeTranslations,
  login: loginTranslations,
  register: registerTranslations,
  profile: profileTranslations,
  businesses: businessesTranslations,
  booking: bookingTranslations
};

// Helper function to get translation by key and language
export const getTranslation = (page, key, language) => {
  try {
    const pageTranslations = allTranslations[page];
    if (!pageTranslations) {
      console.warn(`Page translations not found: ${page}`);
      return key;
    }

    const translationObject = pageTranslations[key];
    if (!translationObject) {
      console.warn(`Translation key not found: ${page}.${key}`);
      return key;
    }

    const translation = translationObject[language];
    if (!translation) {
      console.warn(`Translation not found for language: ${language} in ${page}.${key}`);
      return translationObject.en || key; // Fallback to English
    }

    return translation;
  } catch (error) {
    console.error('Translation error:', error);
    return key;
  }
};

// Legacy support - maintain old structure for backward compatibility
export const translations = {
  en: {},
  es: {}
};

// Build legacy structure from new nested format
Object.keys(allTranslations).forEach(page => {
  const pageTranslations = allTranslations[page];
  Object.keys(pageTranslations).forEach(key => {
    const translationObj = pageTranslations[key];
    if (translationObj && typeof translationObj === 'object') {
      if (!translations.en[page]) translations.en[page] = {};
      if (!translations.es[page]) translations.es[page] = {};
      
      translations.en[page][key] = translationObj.en;
      translations.es[page][key] = translationObj.es;
    }
  });
});