import { useState, useEffect } from 'react';

/**
 * Custom hook to safely handle portal mounting on client-side
 * Prevents hydration issues with SSR
 * @returns {boolean} - Whether the component is mounted and portals can be used
 */
export const useMountedPortal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return isMounted;
};