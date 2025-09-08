import { isFeatureEnabled } from "./FeatureFlags";

const ALL_NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Books", href: "/books" },
  { name: "Podcasts", href: "/podcasts", featureFlag: "PODCASTS_ENABLED" as const },
  { name: "Blog", href: "/blog", featureFlag: "BLOG_ENABLED" as const },
  { name: "Quiz", href: "/quiz", featureFlag: "QUIZ_ENABLED" as const },
  { name: "Author", href: "/author" },
  { name: "Scaremoor", href: "/scaremoor" },
];

// Filter navigation items based on feature flags
const NAV_ITEMS = ALL_NAV_ITEMS.filter(item => 
  !item.featureFlag || isFeatureEnabled(item.featureFlag)
);

export { NAV_ITEMS };
