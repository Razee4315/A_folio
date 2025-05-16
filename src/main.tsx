import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './glitch.css'

// Make sure we're using the correct base URL in GitHub Pages
const baseUrl = import.meta.env.BASE_URL || '/';
console.log('Current base URL:', baseUrl);

// Declare the custom property for TypeScript
declare global {
  interface Window {
    __BASE_PATH__: string;
  }
}

// Configure any path-related variables here
window.__BASE_PATH__ = baseUrl;

// Render application
const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error('Root element not found! Check your HTML file.');
}
