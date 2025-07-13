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
  
  // Translation function that looks up keys using the new nested structure
  const t = (key) => {
    try {
      // First try page-specific translation using new structure
      const pageTranslation = getTranslation(pageName, key, language);
      if (pageTranslation !== key) {
        return pageTranslation;
      }
      
      // Fall back to common translations
      const commonTranslation = getTranslation('common', key, language);
      if (commonTranslation !== key) {
        return commonTranslation;
      }
      
      // Return the key if no translation found
      console.warn(`Translation not found: ${pageName}.${key} for language: ${language}`);
      return key;
    } catch (error) {
      console.error('Translation error in usePageTranslations:', error);
      return key;
    }
  };
  
  return {
    t,
    language
  };
};