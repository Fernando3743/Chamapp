'use client';

import { useLanguage } from '../app/contexts/LanguageContext';
import { getTranslation } from '../lib/translations';

/**
 * Custom hook to get translations for a specific page
 * @param {string} pageName - The name of the page (e.g., 'home', 'login', 'profile')
 * @returns {object} - Object containing translation function and current language
 */
export const usePageTranslations = (pageName) => {
  const { language } = useLanguage();
  
  // Translation function that looks up keys in the page's translation namespace
  const t = (key) => {
    // First try page-specific translation
    const pageTranslation = getTranslation(language, `${pageName}.${key}`);
    if (pageTranslation !== `${pageName}.${key}`) {
      return pageTranslation;
    }
    
    // Fall back to common translations
    const commonTranslation = getTranslation(language, `common.${key}`);
    if (commonTranslation !== `common.${key}`) {
      return commonTranslation;
    }
    
    // Return the key if no translation found
    return key;
  };
  
  // Get all translations for the page (useful for passing to child components)
  const pageTranslations = getTranslation(language, pageName) || {};
  const commonTranslations = getTranslation(language, 'common') || {};
  
  return {
    t,
    language,
    translations: { ...commonTranslations, ...pageTranslations }
  };
};