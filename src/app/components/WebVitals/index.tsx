"use client";

import { useEffect } from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: {
  name: string;
  value: number;
  id: string;
  rating: string;
}) {
  // Send to your analytics service
  // This example sends to Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      custom_parameter_1: Math.round(metric.value),
      custom_parameter_2: metric.id,
      custom_parameter_3: metric.name,
    });
  }

  // Also log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, Math.round(metric.value), metric.rating);
  }
}

export default function WebVitals() {
  useEffect(() => {
    // Measure Core Web Vitals
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);
  }, []);

  return null; // This component doesn't render anything
}