"use client";

import { ReactNode } from "react";
import { useABTest } from "@/app/utils/abTesting";

interface ABTestProps {
  testId: string;
  variants: {
    [variantId: string]: ReactNode;
  };
  fallback?: ReactNode;
}

/**
 * A/B Test Component
 * 
 * Usage:
 * <ABTest 
 *   testId="book_cta_buttons"
 *   variants={{
 *     control: <Button text="Get The Book" />,
 *     variant_a: <Button text="Buy Now on Amazon" />,
 *     variant_b: <Button text="Order Your Copy" />
 *   }}
 * />
 */
export const ABTest: React.FC<ABTestProps> = ({ testId, variants, fallback }) => {
  const { variant, isInTest, isHydrated } = useABTest(testId);
  
  // Show control during SSR and before hydration to prevent mismatch
  if (!isHydrated) {
    return <>{variants.control || fallback || null}</>;
  }
  
  // If user is not in test, show control or fallback
  if (!isInTest) {
    return <>{variants.control || fallback || null}</>;
  }
  
  // Show the assigned variant
  return <>{variants[variant] || variants.control || fallback || null}</>;
};

interface ABTestWrapperProps {
  testId: string;
  variant: string;
  children: ReactNode;
}

/**
 * A/B Test Wrapper Component
 * 
 * Usage:
 * <ABTestWrapper testId="home_hero_layout" variant="variant_a">
 *   <BookGrid />
 * </ABTestWrapper>
 */
export const ABTestWrapper: React.FC<ABTestWrapperProps> = ({ testId, variant, children }) => {
  const { variant: assignedVariant, isInTest, isHydrated } = useABTest(testId);
  
  // Show control during SSR and before hydration to prevent mismatch
  if (!isHydrated && variant === 'control') {
    return <>{children}</>;
  }
  
  if (!isHydrated && variant !== 'control') {
    return null;
  }
  
  // Only render if this is the assigned variant or if not in test and this is control
  if (isInTest && assignedVariant === variant) {
    return <>{children}</>;
  }
  
  if (!isInTest && variant === 'control') {
    return <>{children}</>;
  }
  
  return null;
};

interface ConditionalABTestProps {
  testId: string;
  condition: (variant: string, isInTest: boolean) => boolean;
  children: ReactNode;
}

/**
 * Conditional A/B Test Component
 * 
 * Usage:
 * <ConditionalABTest 
 *   testId="book_page_layout" 
 *   condition={(variant, isInTest) => variant === 'variant_a' || !isInTest}
 * >
 *   <StackedLayout />
 * </ConditionalABTest>
 */
export const ConditionalABTest: React.FC<ConditionalABTestProps> = ({ 
  testId, 
  condition, 
  children 
}) => {
  const { variant, isInTest, isHydrated } = useABTest(testId);
  
  // Show control during SSR and before hydration to prevent mismatch
  if (!isHydrated) {
    // Default to control behavior during hydration
    if (condition('control', false)) {
      return <>{children}</>;
    }
    return null;
  }
  
  if (condition(variant, isInTest)) {
    return <>{children}</>;
  }
  
  return null;
};

export default ABTest;