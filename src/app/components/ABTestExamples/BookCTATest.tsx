"use client";

import Link from "next/link";
import Button from "../Button";
import { ABTest } from "../ABTest";
import { useABTest } from "@/app/utils/abTesting";
import OrangeBackground from "../../../../public/images/orangeBackground.png";

interface BookCTATestProps {
  purchaseLink: string;
  bookTitle: string;
  onPurchaseClick?: () => void;
}

/**
 * A/B Test for Book Purchase Button Text
 * Tests different call-to-action button text to see what drives more clicks
 */
export const BookCTATest: React.FC<BookCTATestProps> = ({ 
  purchaseLink, 
  onPurchaseClick 
}) => {
  const { trackConversion } = useABTest('book_cta_buttons');

  const handleClick = () => {
    // Track the conversion for this A/B test
    trackConversion('cta_click', 1);
    
    // Call the original click handler
    if (onPurchaseClick) {
      onPurchaseClick();
    }
  };

  return (
    <Link
      href={purchaseLink}
      rel="noreferrer"
      target="_blank"
      onClick={handleClick}
    >
      <ABTest
        testId="book_cta_buttons"
        variants={{
          control: (
            <Button
              buttonImage={OrangeBackground}
              altText="get-book"
              text="Get The Book"
            />
          ),
          variant_a: (
            <Button
              buttonImage={OrangeBackground}
              altText="buy-amazon"
              text="Buy Now on Amazon"
            />
          ),
          variant_b: (
            <Button
              buttonImage={OrangeBackground}
              altText="order-copy"
              text="Order Your Copy"
            />
          )
        }}
      />
    </Link>
  );
};

export default BookCTATest;