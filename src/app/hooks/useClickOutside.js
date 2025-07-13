import { useEffect, useCallback } from 'react';

/**
 * Custom hook to handle click outside detection
 * @param {React.RefObject} ref - Reference to the element
 * @param {Function} callback - Function to call when clicked outside
 * @param {boolean} enabled - Whether the hook is enabled (default: true)
 */
export const useClickOutside = (ref, callback, enabled = true) => {
  const handleClick = useCallback((event) => {
    if (!enabled) return;
    
    if (ref.current && !ref.current.contains(event.target)) {
      callback();
    }
  }, [ref, callback, enabled]);

  useEffect(() => {
    if (!enabled) return;

    // Add event listener for mouse events
    document.addEventListener('mousedown', handleClick);
    
    // Add event listener for touch events (mobile)
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [handleClick, enabled]);
};