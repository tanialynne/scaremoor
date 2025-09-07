// Feature flags for enabling/disabling site features
export const FEATURE_FLAGS = {
  // Quiz feature toggle - set to false to hide quiz from navigation and homepage
  QUIZ_ENABLED: false,

  // Blog feature toggle - set to false to hide blog from navigation
  BLOG_ENABLED: false,

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
