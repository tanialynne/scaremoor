'use client'

import Link from 'next/link';
import { trackWorksheetCardClick, trackOnlineWorksheetStart, trackWorksheetContact } from '../../utils/analytics';

interface WorksheetCardLinkProps {
  href: string;
  storyTitle: string;
  storySlug: string;
  children: React.ReactNode;
}

export const WorksheetCardLink: React.FC<WorksheetCardLinkProps> = ({
  href,
  storyTitle,
  storySlug,
  children
}) => {
  const handleClick = () => {
    trackWorksheetCardClick(storyTitle, storySlug);
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};

interface OnlineWorksheetLinkProps {
  href: string;
  storySlug: string;
  grade: number;
  children: React.ReactNode;
  className?: string;
}

export const OnlineWorksheetLink: React.FC<OnlineWorksheetLinkProps> = ({
  href,
  storySlug,
  grade,
  children,
  className
}) => {
  const handleClick = () => {
    trackOnlineWorksheetStart(storySlug, grade);
  };

  return (
    <Link href={href} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};

interface ContactLinkProps {
  href: string;
  source: string;
  children: React.ReactNode;
}

export const ContactLink: React.FC<ContactLinkProps> = ({
  href,
  source,
  children
}) => {
  const handleClick = () => {
    trackWorksheetContact(source);
  };

  return (
    <Link href={href} onClick={handleClick}>
      {children}
    </Link>
  );
};