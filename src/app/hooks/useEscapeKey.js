import { useEffect, useCallback } from 'react';

/**
 * Custom hook to handle escape key presses
 * @param {Function} callback - Function to call when escape is pressed
 * @param {boolean} enabled - Whether the hook is enabled (default: true)
 */
export const useEscapeKey = (callback, enabled = true) => {
  const handleKeyDown = useCallback((event) => {
    if (!enabled) return;
    
    if (event.key === 'Escape') {
      event.preventDefault();
      callback();
    }
  }, [callback, enabled]);

  useEffect(() => {
    if (!enabled) return;

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
};