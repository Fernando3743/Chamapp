'use client';

import { useEffect, useState } from 'react';

export function useCSRF() {
  const [csrfToken, setCSRFToken] = useState('');

  useEffect(() => {
    // Get CSRF token from cookie
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
      return null;
    };

    const token = getCookie('csrf_token');
    if (token) {
      setCSRFToken(token);
    } else {
      // Request new CSRF token
      fetch('/api/csrf')
        .then(res => res.json())
        .then(data => {
          if (data.token) {
            setCSRFToken(data.token);
          }
        })
        .catch(console.error);
    }
  }, []);

  // Helper function to add CSRF token to headers
  const getCSRFHeaders = () => ({
    'x-csrf-token': csrfToken,
    'Content-Type': 'application/json'
  });

  return { csrfToken, getCSRFHeaders };
}