// Google Analytics 4 Utility Functions
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: Record<string, unknown>[];
    clarity: (action: string, ...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = 'G-4TBCBRHFNR';

// Enhanced Ecommerce Events
export const trackPurchaseClick = (bookTitle: string, bookSlug: string, purchaseUrl: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'select_item', {
      item_list_id: 'book_collection',
      item_list_name: 'Scaremoor Books',
      items: [{
        item_id: bookSlug,
        item_name: bookTitle,
        item_category: 'Book',
        item_brand: 'Scaremoor',
        price: 0, // Add actual price if available
        quantity: 1
      }]
    });

    // Track outbound link to Amazon
    window.gtag('event', 'click', {
      event_category: 'Outbound Link',
      event_label: 'Amazon Purchase',
      transport_type: 'beacon',
      custom_parameters: {
        book_title: bookTitle,
        book_slug: bookSlug,
        destination_url: purchaseUrl
      }
    });
  }

  // Track in Clarity for heatmap insights
  trackClarityEvent('purchase_click', {
    book_title: bookTitle,
    book_slug: bookSlug,
    destination: 'Amazon'
  });

  // Set user journey stage
  trackUserJourneyStage('purchase');
};

// Lead Generation Tracking
export const trackLeadMagnetView = (leadMagnetId: string, bookTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_promotion', {
      creative_name: `Chapter Preview - ${bookTitle}`,
      creative_slot: leadMagnetId,
      promotion_id: leadMagnetId,
      promotion_name: `Free Chapter - ${bookTitle}`
    });
  }
};

export const trackLeadMagnetSignup = (leadMagnetId: string, bookTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 5.00, // Estimated value of lead
      method: 'Chapter Download',
      custom_parameters: {
        lead_magnet_id: leadMagnetId,
        book_title: bookTitle,
        lead_source: 'Free Chapter'
      }
    });

    // Also track as conversion
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/lead_generation`,
      value: 5.00,
      currency: 'USD'
    });
  }
};

// Content Engagement Tracking
export const trackBookPageView = (bookTitle: string, bookSlug: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: `${bookTitle} | Scaremoor`,
      page_location: window.location.href,
      content_group1: 'Book Pages',
      content_group2: bookTitle,
      custom_parameters: {
        book_slug: bookSlug,
        book_title: bookTitle
      }
    });

    // Track as item view for ecommerce
    window.gtag('event', 'view_item', {
      currency: 'USD',
      value: 0, // Add actual price if available
      items: [{
        item_id: bookSlug,
        item_name: bookTitle,
        item_category: 'Book',
        item_brand: 'Scaremoor',
        quantity: 1
      }]
    });
  }

  // Track in Clarity with custom tags for heatmap segmentation
  setClarityCustomTag('page_type', 'book_page');
  setClarityCustomTag('book_title', bookTitle);
  setClarityCustomTag('book_slug', bookSlug);
  
  trackClarityEvent('book_page_view', {
    book_title: bookTitle,
    book_slug: bookSlug
  });

  // Set user journey stage
  trackUserJourneyStage('interest');
};

export const trackVideoPlay = (videoTitle: string, bookTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'play', {
      event_category: 'Video',
      event_label: videoTitle,
      custom_parameters: {
        video_title: videoTitle,
        book_title: bookTitle || 'Unknown',
        engagement_type: 'video_start'
      }
    });
  }
};

export const trackVideoComplete = (videoTitle: string, bookTitle?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'video_complete', {
      event_category: 'Video',
      event_label: videoTitle,
      custom_parameters: {
        video_title: videoTitle,
        book_title: bookTitle || 'Unknown',
        engagement_type: 'video_complete'
      }
    });
  }
};

// Form Tracking
export const trackFormStart = (formName: string, formLocation: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'begin_checkout', {
      event_category: 'Form',
      event_label: formName,
      custom_parameters: {
        form_name: formName,
        form_location: formLocation,
        step: 'start'
      }
    });
  }
};

export const trackFormSubmit = (formName: string, formLocation: string, success: boolean = true) => {
  if (typeof window !== 'undefined' && window.gtag) {
    if (success) {
      window.gtag('event', 'purchase', {
        transaction_id: `form_${Date.now()}`,
        value: 3.00, // Estimated value of form submission
        currency: 'USD',
        custom_parameters: {
          form_name: formName,
          form_location: formLocation,
          submission_status: 'success'
        }
      });

      // Track as conversion
      window.gtag('event', 'conversion', {
        send_to: `${GA_TRACKING_ID}/form_submission`,
        value: 3.00,
        currency: 'USD'
      });
    } else {
      window.gtag('event', 'exception', {
        description: 'Form Submission Failed',
        fatal: false,
        custom_parameters: {
          form_name: formName,
          form_location: formLocation
        }
      });
    }
  }
};

// Navigation and Engagement
export const trackButtonClick = (buttonText: string, buttonLocation: string, destination?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: 'Button',
      event_label: buttonText,
      custom_parameters: {
        button_text: buttonText,
        button_location: buttonLocation,
        destination: destination || 'unknown'
      }
    });
  }
};

export const trackNavigation = (linkText: string, destination: string, isInternal: boolean = true) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: isInternal ? 'Internal Navigation' : 'External Navigation',
      event_label: linkText,
      transport_type: isInternal ? 'beacon' : 'beacon',
      custom_parameters: {
        link_text: linkText,
        destination: destination,
        link_type: isInternal ? 'internal' : 'external'
      }
    });
  }
};

// Scroll and Time Tracking
export const trackScrollDepth = (depth: number, pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'scroll', {
      event_category: 'Engagement',
      event_label: `${depth}% Scrolled`,
      custom_parameters: {
        scroll_depth: depth,
        page_name: pageName
      }
    });
  }
};

export const trackTimeOnPage = (timeInSeconds: number, pageName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'timing_complete', {
      name: 'page_engagement',
      value: timeInSeconds * 1000, // GA expects milliseconds
      event_category: 'Engagement',
      custom_parameters: {
        time_on_page: timeInSeconds,
        page_name: pageName
      }
    });
  }
};

// Error Tracking
export const trackError = (error: string, errorInfo?: Record<string, unknown>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'exception', {
      description: error,
      fatal: false,
      custom_parameters: {
        error_details: JSON.stringify(errorInfo),
        timestamp: new Date().toISOString()
      }
    });
  }
};

// Custom Dimensions for User Segmentation
export const setUserProperties = (properties: { [key: string]: string | number }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      custom_map: properties
    });
  }
};

// Enhanced Configuration
export const configureGA = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      // Enhanced ecommerce
      send_page_view: false, // We'll send manual page views with more data
      
      // User engagement
      engagement_time_msec: 1000,
      
      // Content grouping
      content_group1: 'Page Type',
      content_group2: 'Book Category',
      content_group3: 'User Journey Stage',
      
      // Custom parameters
      custom_map: {
        dimension1: 'user_type',
        dimension2: 'book_preference',
        dimension3: 'engagement_level'
      }
    });
  }
};

// Microsoft Clarity Integration
export const trackClarityEvent = (eventName: string, properties?: { [key: string]: string | number }) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('event', eventName, properties);
  }
};

export const setClarityCustomTag = (key: string, value: string) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('set', key, value);
  }
};

export const identifyClarityUser = (userId: string) => {
  if (typeof window !== 'undefined' && window.clarity) {
    window.clarity('identify', userId);
  }
};

// Enhanced tracking with both GA4 and Clarity
export const trackBookInteraction = (action: string, bookTitle: string, bookSlug: string) => {
  // Track in GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: 'Book Interaction',
      event_label: bookTitle,
      custom_parameters: {
        book_slug: bookSlug,
        book_title: bookTitle
      }
    });
  }
  
  // Track in Clarity
  trackClarityEvent('book_interaction', {
    action,
    book_title: bookTitle,
    book_slug: bookSlug
  });
};

export const trackUserJourneyStage = (stage: 'discovery' | 'interest' | 'consideration' | 'purchase' | 'advocacy') => {
  // Set custom tag in Clarity for heatmap segmentation
  setClarityCustomTag('journey_stage', stage);
  
  // Track in GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'user_journey_stage', {
      event_category: 'User Journey',
      event_label: stage,
      custom_parameters: {
        stage
      }
    });
  }
};

// Quiz-specific tracking
export const trackQuizStart = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_start', {
      event_category: 'Quiz',
      event_label: 'Book Recommendation Quiz',
      custom_parameters: {
        quiz_type: 'book_recommendation'
      }
    });
  }
  
  setClarityCustomTag('quiz_started', 'yes');
  trackClarityEvent('quiz_start', {
    quiz_type: 'book_recommendation'
  });
};

export const trackQuizAnswer = (questionNumber: number, questionText: string, answer: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_answer', {
      event_category: 'Quiz',
      event_label: `Question ${questionNumber}`,
      custom_parameters: {
        question_number: questionNumber,
        question_text: questionText,
        answer_text: answer,
        quiz_type: 'book_recommendation'
      }
    });
  }
  
  trackClarityEvent('quiz_answer', {
    question_number: questionNumber,
    question_text: questionText,
    answer_text: answer
  });
};

export const trackQuizComplete = (recommendedBook: string, timeSpent?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'quiz_complete', {
      event_category: 'Quiz',
      event_label: 'Book Recommendation Quiz Complete',
      value: timeSpent || 0,
      custom_parameters: {
        recommended_book: recommendedBook,
        quiz_type: 'book_recommendation',
        time_spent_seconds: timeSpent || 0
      }
    });
  }
  
  setClarityCustomTag('quiz_completed', 'yes');
  setClarityCustomTag('recommended_book', recommendedBook);
  
  trackClarityEvent('quiz_complete', {
    recommended_book: recommendedBook,
    time_spent_seconds: timeSpent || 0
  });
  
  // Track as conversion event
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/quiz_completion`,
      value: 2.00,
      currency: 'USD'
    });
  }
};

export const trackQuizEmailSignup = (recommendedBook: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'generate_lead', {
      currency: 'USD',
      value: 8.00, // Higher value for quiz-driven leads
      method: 'Quiz Result Email Capture',
      custom_parameters: {
        lead_source: 'quiz_result',
        recommended_book: recommendedBook,
        quiz_type: 'book_recommendation'
      }
    });
  }
  
  trackClarityEvent('quiz_email_signup', {
    recommended_book: recommendedBook,
    lead_source: 'quiz_result'
  });
  
  // Track as high-value conversion
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: `${GA_TRACKING_ID}/quiz_lead_generation`,
      value: 8.00,
      currency: 'USD'
    });
  }
};

export const trackQuizBookPurchase = (recommendedBook: string, purchaseUrl: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase_intent', {
      event_category: 'Quiz Conversion',
      event_label: `${recommendedBook} Purchase Click`,
      custom_parameters: {
        recommended_book: recommendedBook,
        purchase_source: 'quiz_result',
        destination_url: purchaseUrl
      }
    });
  }
  
  trackClarityEvent('quiz_book_purchase_click', {
    recommended_book: recommendedBook,
    purchase_source: 'quiz_result'
  });
};