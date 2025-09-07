"use client";

import { useState, useEffect } from 'react';
import { trackClarityEvent, setClarityCustomTag } from './analytics';

// A/B Test Configuration Types
export interface ABTestConfig {
  id: string;
  name: string;
  description: string;
  variants: {
    id: string;
    name: string;
    weight: number; // 0-100, must sum to 100
  }[];
  startDate: Date;
  endDate?: Date;
  targetPercentage: number; // 0-100, percentage of users to include
  isActive: boolean;
}

export interface ABTestResult {
  testId: string;
  variantId: string;
  isInTest: boolean;
  userId: string;
}

// Active A/B Tests Configuration
export const AB_TESTS: ABTestConfig[] = [
  {
    id: 'book_cta_buttons',
    name: 'Book Purchase Button Text',
    description: 'Test different purchase button text on book pages',
    variants: [
      { id: 'control', name: 'Get The Book', weight: 50 },
      { id: 'variant_a', name: 'Buy Now on Amazon', weight: 25 },
      { id: 'variant_b', name: 'Order Your Copy', weight: 25 }
    ],
    startDate: new Date('2025-01-01'),
    endDate: new Date('2025-02-01'),
    targetPercentage: 100,
    isActive: true
  },
  {
    id: 'home_hero_layout',
    name: 'Homepage Hero Layout',
    description: 'Test video vs book image in hero section',
    variants: [
      { id: 'control', name: 'Video Trailer', weight: 50 },
      { id: 'variant_a', name: 'Book Covers Grid', weight: 50 }
    ],
    startDate: new Date('2025-01-01'),
    targetPercentage: 80,
    isActive: true
  },
  {
    id: 'lead_magnet_layout',
    name: 'Lead Magnet Form Layout',
    description: 'Test different lead magnet form copy and layouts',
    variants: [
      { id: 'control', name: 'Original "If You Dare"', weight: 34 },
      { id: 'variant_a', name: 'Urgency "FREE Chapter!"', weight: 33 },
      { id: 'variant_b', name: 'Social Proof', weight: 33 }
    ],
    startDate: new Date('2025-01-01'),
    targetPercentage: 100,
    isActive: true
  }
];

// User ID generation and storage
const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

const getUserId = (): string => {
  if (typeof window === 'undefined') return generateUserId();
  
  let userId = localStorage.getItem('scaremoor_user_id');
  if (!userId) {
    userId = generateUserId();
    localStorage.setItem('scaremoor_user_id', userId);
  }
  return userId;
};

// Hash function for consistent user bucketing
const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Determine if user should be included in test
const shouldIncludeInTest = (userId: string, testId: string, targetPercentage: number): boolean => {
  const hash = hashString(`${userId}_${testId}`);
  const bucket = hash % 100;
  return bucket < targetPercentage;
};

// Assign user to variant based on weights
const assignVariant = (userId: string, testId: string, variants: ABTestConfig['variants']): string => {
  const hash = hashString(`${userId}_${testId}_variant`);
  const bucket = hash % 100;
  
  let cumulativeWeight = 0;
  for (const variant of variants) {
    cumulativeWeight += variant.weight;
    if (bucket < cumulativeWeight) {
      return variant.id;
    }
  }
  
  // Fallback to control if weights don't add up correctly
  return variants[0].id;
};

// Get URL parameter for variant override
const getVariantFromURL = (testId: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const urlParams = new URLSearchParams(window.location.search);
  const variantParam = urlParams.get('variant');
  const testParam = urlParams.get('test');
  
  // Support both ?variant=control and ?test=testId&variant=control
  if (variantParam && (!testParam || testParam === testId)) {
    return variantParam;
  }
  
  // Support ?testId_variant=control format
  const specificVariant = urlParams.get(`${testId}_variant`);
  if (specificVariant) {
    return specificVariant;
  }
  
  return null;
};

// Main function to get A/B test variant
export const getABTestVariant = (testId: string): ABTestResult => {
  const test = AB_TESTS.find(t => t.id === testId);
  const userId = getUserId();
  
  // Check for URL parameter override first
  const urlVariant = getVariantFromURL(testId);
  if (urlVariant && test) {
    const validVariant = test.variants.find(v => v.id === urlVariant);
    if (validVariant) {
      return {
        testId,
        variantId: urlVariant,
        isInTest: true, // Force as "in test" for debugging
        userId: userId + '_debug'
      };
    }
  }
  
  if (!test || !test.isActive) {
    return {
      testId,
      variantId: 'control',
      isInTest: false,
      userId
    };
  }

  // Check if test is within date range
  const now = new Date();
  if (now < test.startDate || (test.endDate && now > test.endDate)) {
    return {
      testId,
      variantId: 'control',
      isInTest: false,
      userId
    };
  }

  // Check if user should be included in test
  if (!shouldIncludeInTest(userId, testId, test.targetPercentage)) {
    return {
      testId,
      variantId: 'control',
      isInTest: false,
      userId
    };
  }

  // Assign variant
  const variantId = assignVariant(userId, testId, test.variants);
  
  return {
    testId,
    variantId,
    isInTest: true,
    userId
  };
};

// Track A/B test assignment
export const trackABTestAssignment = (result: ABTestResult) => {
  if (typeof window === 'undefined') return;

  const test = AB_TESTS.find(t => t.id === result.testId);
  if (!test) return;

  const variant = test.variants.find(v => v.id === result.variantId);
  const variantName = variant?.name || result.variantId;

  // Track in Google Analytics
  if (window.gtag) {
    window.gtag('event', 'ab_test_assignment', {
      event_category: 'A/B Testing',
      event_label: test.name,
      custom_parameters: {
        test_id: result.testId,
        test_name: test.name,
        variant_id: result.variantId,
        variant_name: variantName,
        is_in_test: result.isInTest ? 1 : 0 ? 1 : 0,
        user_id: result.userId
      }
    });

    // Set custom dimension for segmentation
    window.gtag('config', 'G-4TBCBRHFNR', {
      custom_map: {
        dimension4: 'ab_test_variant'
      }
    });
  }

  // Track in Clarity
  setClarityCustomTag('ab_test_' + result.testId, result.variantId);
  setClarityCustomTag('ab_test_active', result.isInTest ? 'yes' : 'no');
  
  trackClarityEvent('ab_test_assignment', {
    test_id: result.testId,
    test_name: test.name,
    variant_id: result.variantId,
    variant_name: variantName,
    is_in_test: result.isInTest ? 1 : 0
  });
};

// Track A/B test conversion
export const trackABTestConversion = (testId: string, conversionEvent: string, value?: number) => {
  if (typeof window === 'undefined') return;

  const result = getABTestVariant(testId);
  const test = AB_TESTS.find(t => t.id === testId);
  
  if (!test) return;

  // Track in Google Analytics
  if (window.gtag) {
    window.gtag('event', 'ab_test_conversion', {
      event_category: 'A/B Testing',
      event_label: `${test.name} - ${conversionEvent}`,
      value: value || 1,
      custom_parameters: {
        test_id: testId,
        test_name: test.name,
        variant_id: result.variantId,
        conversion_event: conversionEvent,
        is_in_test: result.isInTest ? 1 : 0
      }
    });
  }

  // Track in Clarity
  trackClarityEvent('ab_test_conversion', {
    test_id: testId,
    test_name: test.name,
    variant_id: result.variantId,
    conversion_event: conversionEvent,
    value: value || 1,
    is_in_test: result.isInTest ? 1 : 0
  });
};

// Hook for React components
export const useABTest = (testId: string) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [testResult, setTestResult] = useState<ABTestResult | null>(null);

  useEffect(() => {
    // Only run on client after hydration
    const result = getABTestVariant(testId);
    setTestResult(result);
    setIsHydrated(true);
    
    // Track assignment on first render
    if (result.isInTest) {
      trackABTestAssignment(result);
    }
  }, [testId]);

  // Return default values during SSR and before hydration
  if (!isHydrated || !testResult) {
    return {
      variant: 'control',
      isInTest: false,
      isHydrated,
      trackConversion: () => {}
    };
  }

  return {
    variant: testResult.variantId,
    isInTest: testResult.isInTest,
    isHydrated,
    trackConversion: (event: string, value?: number) => 
      trackABTestConversion(testId, event, value)
  };
};

// Debug and testing utilities
export const getAllTestVariants = (testId: string) => {
  const test = AB_TESTS.find(t => t.id === testId);
  return test?.variants || [];
};

export const generateVariantLinks = (testId: string, currentUrl: string = '') => {
  const variants = getAllTestVariants(testId);
  const baseUrl = currentUrl || (typeof window !== 'undefined' ? window.location.href.split('?')[0] : '');
  
  return variants.map(variant => ({
    variant: variant.id,
    name: variant.name,
    url: `${baseUrl}?variant=${variant.id}`,
    specificUrl: `${baseUrl}?${testId}_variant=${variant.id}`
  }));
};

export const isDebugMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has('debug') || urlParams.has('variant') || urlParams.toString().includes('_variant=');
};

// Admin functions for managing tests
export const getActiveTests = (): ABTestConfig[] => {
  return AB_TESTS.filter(test => {
    if (!test.isActive) return false;
    
    const now = new Date();
    if (now < test.startDate) return false;
    if (test.endDate && now > test.endDate) return false;
    
    return true;
  });
};

export const getTestResults = (testId: string) => {
  // In a real implementation, this would fetch results from analytics
  // For now, return structure for future implementation
  return {
    testId,
    totalUsers: 0,
    variants: AB_TESTS.find(t => t.id === testId)?.variants.map(v => ({
      id: v.id,
      name: v.name,
      users: 0,
      conversions: 0,
      conversionRate: 0,
      confidence: 0
    })) || []
  };
};