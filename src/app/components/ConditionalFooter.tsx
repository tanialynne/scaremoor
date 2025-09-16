'use client';

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on printable/educational pages
  const isWorksheetSectionPage = pathname?.includes('/worksheets/') && pathname?.includes('/online') && pathname?.includes('/section/');
  const isFunActivitiesPage = pathname?.includes('/worksheets/') && pathname?.includes('/fun-activities/');

  if (isWorksheetSectionPage || isFunActivitiesPage) {
    return null;
  }

  return <Footer />;
}