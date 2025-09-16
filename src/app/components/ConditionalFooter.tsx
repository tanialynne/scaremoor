'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Don't show the large footer on worksheet pages
  if (pathname?.includes('/worksheets/')) {
    return null;
  }

  return <Footer />;
}