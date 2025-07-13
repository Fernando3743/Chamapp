import { useEffect } from 'react';

/**
 * Custom hook to lock/unlock body scroll
 * Useful for modals and overlays
 * @param {boolean} isLocked - Whether to lock the scroll
 */
export const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (!isLocked) {
      document.body.style.overflow = 'unset';
      return;
    }

    // Store original overflow value
    const originalOverflow = document.body.style.overflow;
    
    // Lock scroll
    document.body.style.overflow = 'hidden';

    // Cleanup function to restore original state
    return () => {
      document.body.style.overflow = originalOverflow || 'unset';
    };
  }, [isLocked]);
};