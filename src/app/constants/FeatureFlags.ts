// Feature flags for enabling/disabling site features
export const FEATURE_FLAGS = {
  // Quiz feature toggle - set to false to hide quiz from navigation and homepage
  QUIZ_ENABLED: false,

  // Blog feature toggle - set to false to hide blog from navigation
  BLOG_ENABLED: false,

  // Podcast feature toggle - set to false to hide podcast from navigation
  PODCAST_ENABLED: true,

  // Multi-series support for authors with multiple book series
  MULTI_SERIES_ENABLED: false,

  // Event calendar and management
  EVENTS_ENABLED: false,

  // Direct book sales integration
  DIRECT_SALES_ENABLED: false,

  // Press kit for media resources
  PRESS_KIT_ENABLED: false,

  // Educational worksheets and printables section
  WORKSHEETS_ENABLED: true,

  // Add more feature flags here as needed
  // NEWSLETTER_ENABLED: true,
  // TESTIMONIALS_ENABLED: true,
} as const;

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (
  feature: keyof typeof FEATURE_FLAGS
): boolean => {
  return FEATURE_FLAGS[feature];
};
