// Base URL configuration for GitHub Pages
export const BASE_URL = import.meta.env.BASE_URL || '/';

export const isProduction = import.meta.env.PROD;

// Log configuration in development
if (import.meta.env.DEV) {
  console.log('Base URL:', BASE_URL);
  console.log('Production mode:', isProduction);
}
