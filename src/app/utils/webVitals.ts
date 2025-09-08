"use client";

import { onCLS, onINP, onFCP, onLCP, onTTFB, Metric } from 'web-vitals';

// Send vitals to Google Analytics with enhanced data
function sendToAnalytics(metric: Metric) {
  if (typeof window !== 'undefined' && window.gtag) {
    // Send to GA4 with comprehensive data
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
      custom_parameters: {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_rating: metric.rating,
        metric_delta: metric.delta,
        page_url: window.location.pathname,
        user_agent: navigator.userAgent.substring(0, 100), // Truncated UA
        connection_type: (navigator as { connection?: { effectiveType: string } }).connection?.effectiveType || 'unknown',
        device_memory: (navigator as { deviceMemory?: number }).deviceMemory || 'unknown',
      }
    });

    // Enhanced console logging with performance insights
    const performanceMessage = getPerformanceInsight(metric);
    console.log(`🔍 Core Web Vitals - ${metric.name}: ${metric.value}ms (${metric.rating}) - ${performanceMessage}`);
  }
}

// Get performance insights based on metric values
function getPerformanceInsight(metric: Metric): string {
  const { name, rating } = metric;
  
  switch (name) {
    case 'LCP':
      if (rating === 'good') return '🟢 Great loading performance!';
      if (rating === 'needs-improvement') return '🟡 Consider optimizing images and server response';
      return '🔴 Slow loading - check image optimization and server performance';
      
    case 'INP':
      if (rating === 'good') return '🟢 Excellent interactivity!';
      if (rating === 'needs-improvement') return '🟡 Some delay in user interactions';
      return '🔴 Poor responsiveness - optimize JavaScript execution';
      
    case 'CLS':
      if (rating === 'good') return '🟢 Stable visual layout!';
      if (rating === 'needs-improvement') return '🟡 Some layout shifts detected';
      return '🔴 High layout instability - check image/font loading';
      
    case 'FCP':
      if (rating === 'good') return '🟢 Fast first paint!';
      if (rating === 'needs-improvement') return '🟡 Consider reducing render-blocking resources';
      return '🔴 Slow first paint - optimize critical resources';
      
    case 'TTFB':
      if (rating === 'good') return '🟢 Fast server response!';
      if (rating === 'needs-improvement') return '🟡 Server response could be faster';
      return '🔴 Slow server response - optimize backend performance';
      
    default:
      return `Rating: ${rating}`;
  }
}


export function trackWebVitals() {
  try {
    // Core Web Vitals (the big 3 for Google rankings)
    onLCP(sendToAnalytics); // Largest Contentful Paint
    onINP(sendToAnalytics); // Interaction to Next Paint (replaces FID)
    onCLS(sendToAnalytics); // Cumulative Layout Shift
    
    // Additional performance metrics
    onFCP(sendToAnalytics); // First Contentful Paint
    onTTFB(sendToAnalytics); // Time to First Byte
    
    console.log('🚀 Core Web Vitals tracking initialized - monitoring LCP, INP, CLS, FCP, TTFB');
  } catch (err) {
    console.error('❌ Web Vitals tracking error:', err);
  }
}

// Track performance entries for debugging and optimization insights
export function trackPerformanceEntries() {
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      // Track navigation timing
      const navObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming;
            const timings = {
              domContentLoaded: Math.round(navEntry.domContentLoadedEventEnd - navEntry.startTime),
              loadComplete: Math.round(navEntry.loadEventEnd - navEntry.startTime),
              firstByte: Math.round(navEntry.responseStart - navEntry.requestStart),
              domInteractive: Math.round(navEntry.domInteractive - navEntry.startTime),
              connectTime: Math.round(navEntry.connectEnd - navEntry.connectStart),
              dnsTime: Math.round(navEntry.domainLookupEnd - navEntry.domainLookupStart),
            };
            
            console.log('📊 Navigation Performance:', timings);
            
            // Send to GA4 if available
            if (window.gtag) {
              window.gtag('event', 'page_timing', {
                event_category: 'Performance',
                dom_content_loaded: timings.domContentLoaded,
                load_complete: timings.loadComplete,
                time_to_first_byte: timings.firstByte,
              });
            }
          }
        }
      });
      
      navObserver.observe({ entryTypes: ['navigation'] });

      // Track resource loading performance
      const resourceObserver = new PerformanceObserver((list) => {
        const slowResources = [];
        for (const entry of list.getEntries()) {
          const resourceEntry = entry as PerformanceResourceTiming;
          const loadTime = resourceEntry.responseEnd - resourceEntry.startTime;
          
          // Log slow resources (>1000ms)
          if (loadTime > 1000) {
            slowResources.push({
              name: resourceEntry.name.split('/').pop() || resourceEntry.name,
              duration: Math.round(loadTime),
              type: resourceEntry.initiatorType,
            });
          }
        }
        
        if (slowResources.length > 0) {
          console.warn('🐌 Slow loading resources:', slowResources);
        }
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
      
    } catch (err) {
      console.error('❌ Performance tracking error:', err);
    }
  }
}

// Additional function to get current page performance summary
export function getPerformanceSummary() {
  if (typeof window === 'undefined') return null;
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navigation) return null;
  
  return {
    pageLoadTime: Math.round(navigation.loadEventEnd - navigation.startTime),
    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.startTime),
    firstByte: Math.round(navigation.responseStart - navigation.startTime),
    resources: performance.getEntriesByType('resource').length,
    timestamp: new Date().toISOString(),
  };
}