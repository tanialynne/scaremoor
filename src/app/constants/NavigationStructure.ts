import { isFeatureEnabled } from "./FeatureFlags";
import Books from "./Books";

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

const ALL_NAVIGATION_GROUPS: NavigationGroup[] = [
  {
    name: "Home",
    items: [{ name: "Home", href: "/" }],
    alwaysVisible: true
  },
  {
    name: "Books",
    items: [
      { name: "All Books", href: "/books" },
      ...Books.map(book => ({
        name: book.bookTitle,
        href: `/book/${book.bookSlug}`
      })),
      { name: "Series", href: "/series", featureFlag: "MULTI_SERIES_ENABLED" },
      { name: "Shop", href: "/shop", featureFlag: "DIRECT_SALES_ENABLED" }
    ]
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

// Filter navigation groups and items based on feature flags
export const getFilteredNavigation = (): NavigationGroup[] => {
  return ALL_NAVIGATION_GROUPS.map(group => ({
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