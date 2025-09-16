'use client'

import { useEffect } from 'react';
import { trackWorksheetsPageView, trackWorksheetStoryView, trackWorksheetDownload, trackOnlineWorksheetStart, trackWorksheetContact, trackWorksheetCardClick } from '../../utils/analytics';

interface WorksheetAnalyticsProps {
  pageType: 'landing' | 'story';
  storyTitle?: string;
  storySlug?: string;
}

const WorksheetAnalytics: React.FC<WorksheetAnalyticsProps> = ({
  pageType,
  storyTitle,
  storySlug
}) => {
  useEffect(() => {
    if (pageType === 'landing') {
      trackWorksheetsPageView();
    } else if (pageType === 'story' && storyTitle && storySlug) {
      trackWorksheetStoryView(storyTitle, storySlug);
    }
  }, [pageType, storyTitle, storySlug]);

  return null; // This is a tracking component with no visual output
};

// Export individual tracking functions for use in components
export {
  trackWorksheetDownload,
  trackOnlineWorksheetStart,
  trackWorksheetContact,
  trackWorksheetCardClick
};

export default WorksheetAnalytics;