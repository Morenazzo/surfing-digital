/**
 * URL Configuration
 * 
 * Centralized configuration for all external URLs used in the application
 */

export const URLS = {
  // Fillout Form
  FILLOUT_FORM: "https://forms.fillout.com/t/41HWtPX4dCus",
  
  // Social Media
  TWITTER: "https://twitter.com/surfingdigital",
  LINKEDIN: "https://linkedin.com/company/surfingdigital",
  FACEBOOK: "https://facebook.com/surfingdigital",
  INSTAGRAM: "https://instagram.com/surfingdigital",
  
  // External Links
  PRIVACY_POLICY: "/privacy",
  TERMS_OF_SERVICE: "/terms",
  
  // API Endpoints
  FILLOUT_WEBHOOK: "/api/fillout",
} as const;

export default URLS;

