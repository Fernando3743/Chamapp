"use client";

import { useState, useEffect } from "react";

/**
 * Custom hook to manage CSRF token
 * @returns {Object} CSRF token and loading state
 */
export function useCSRFToken() {
  const [csrfToken, setCSRFToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCSRFToken = async () => {
      try {
        // Get CSRF token from cookie
        const token = document.cookie
          .split('; ')
          .find(row => row.startsWith('csrf_token='))
          ?.split('=')[1];
        
        if (token) {
          setCSRFToken(token);
        } else {
          // If no token exists, request one from the server
          const response = await fetch('/api/csrf', {
            method: 'GET',
            credentials: 'include'
          });
          
          if (response.ok) {
            const data = await response.json();
            setCSRFToken(data.token);
          } else {
            throw new Error('Failed to fetch CSRF token');
          }
        }
      } catch (err) {
        console.error('Error fetching CSRF token:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCSRFToken();
  }, []);

  return {
    csrfToken,
    loading,
    error
  };
}