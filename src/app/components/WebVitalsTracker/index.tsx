"use client";

import { useEffect } from 'react';
import { trackWebVitals, trackPerformanceEntries } from '@/app/utils/webVitals';

const WebVitalsTracker = () => {
  useEffect(() => {
    // Track Core Web Vitals
    trackWebVitals();
    
    // Track additional performance metrics
    trackPerformanceEntries();
  }, []);

  return null; // This component doesn't render anything
};

export default WebVitalsTracker;