import { isFeatureEnabled } from "./FeatureFlags";
import Books from "./Books";
import { getActiveSeries, hasMultipleSeries } from "../utils/seriesUtils";

export interface NavigationItem {
  name: string;
  href: string;
  featureFlag?: keyof typeof import("./FeatureFlags").FEATURE_FLAGS;
}

export interface NavigationGroup {
  name: string;
  items: NavigationItem[];
  alwaysVisible?: boolean;
}

// Function to generate navigation groups dynamically
const getNavigationGroups = (): NavigationGroup[] => {
  const activeSeries = getActiveSeries();
  const multipleSeriesActive = hasMultipleSeries();
  const multiSeriesEnabled = isFeatureEnabled("MULTI_SERIES_ENABLED");
  
  const booksItems: NavigationItem[] = [];
  
  if (multiSeriesEnabled && multipleSeriesActive) {
    // If multiple series feature is enabled AND multiple series are active, show series navigation
    booksItems.push({ name: "All Series", href: "/series" });
    activeSeries.forEach(series => {
      booksItems.push({ name: series.seriesTitle, href: `/series/${series.seriesSlug}` });
    });
  } else {
    // If single series or feature disabled, show books directly
    booksItems.push({ name: "All Books", href: "/books" });
    Books.slice(0, 5).map(book => { // Limit to first 5 books in nav
      booksItems.push({
        name: book.bookTitle,
        href: `/book/${book.bookSlug}`
      });
    });
  }
  
  // Add optional shop link
  if (isFeatureEnabled("DIRECT_SALES_ENABLED")) {
    booksItems.push({ name: "Shop", href: "/shop" });
  }

  return [
    {
      name: "Home",
      items: [{ name: "Home", href: "/" }],
      alwaysVisible: true
    },
    {
      name: "Books",
      items: booksItems
      },
    {
      name: "Media",
      items: [
        { name: "Podcast", href: "/podcast", featureFlag: "PODCAST_ENABLED" },
        { name: "Blog", href: "/blog", featureFlag: "BLOG_ENABLED" },
        { name: "Press Kit", href: "/press-kit", featureFlag: "PRESS_KIT_ENABLED" }
      ]
    },
    {
      name: "Events",
      items: [
        { name: "Event Calendar", href: "/events", featureFlag: "EVENTS_ENABLED" },
        { name: "Book Signings", href: "/events/signings", featureFlag: "EVENTS_ENABLED" },
        { name: "Virtual Events", href: "/events/virtual", featureFlag: "EVENTS_ENABLED" }
      ]
    },
    {
      name: "Quiz",
      items: [{ name: "Quiz", href: "/quiz", featureFlag: "QUIZ_ENABLED" }],
      alwaysVisible: true
    },
    {
      name: "About",
      items: [
        { name: "Author", href: "/author" },
        { name: "Scaremoor", href: "/scaremoor" },
        { name: "Contact", href: "/contact" }
      ]
    }
  ];
};

// Filter navigation groups and items based on feature flags
export const getFilteredNavigation = (): NavigationGroup[] => {
  return getNavigationGroups().map(group => ({
    ...group,
    items: group.items.filter(item => 
      !item.featureFlag || isFeatureEnabled(item.featureFlag)
    )
  })).filter(group => group.items.length > 0);
};

// For mobile menu - includes all items including individual books
export const getFlatNavItems = (): NavigationItem[] => {
  return getFilteredNavigation().flatMap(group => group.items);
};

// For footer - excludes individual books for cleaner layout
export const getFlatNavItemsForFooter = (): NavigationItem[] => {
  return getFilteredNavigation().flatMap(group => {
    // For footer, only include main navigation items (not individual books)
    if (group.name === "Books") {
      return group.items.filter(item => !item.href.startsWith('/book/'));
    }
    return group.items;
  });
};