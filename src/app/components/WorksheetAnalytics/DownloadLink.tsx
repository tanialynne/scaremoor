'use client'

import { trackWorksheetDownload } from '../../utils/analytics';

interface DownloadLinkProps {
  href: string;
  resourceTitle: string;
  resourceType: string;
  storySlug?: string;
  children: React.ReactNode;
  className?: string;
  download?: boolean;
}

export const DownloadLink: React.FC<DownloadLinkProps> = ({
  href,
  resourceTitle,
  resourceType,
  storySlug,
  children,
  className,
  download = true
}) => {
  const handleClick = () => {
    trackWorksheetDownload(resourceTitle, resourceType, storySlug);
  };

  return (
    <a
      href={href}
      download={download}
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
};