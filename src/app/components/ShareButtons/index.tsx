"use client";

import { useState, useEffect } from 'react';

interface ShareButtonsProps {
  url: string;
  title: string;
  description: string;
  hashtags?: string;
  label?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title, description, hashtags = "Scaremoor", label }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} 📚✨`)}&hashtags=${hashtags}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`I thought you might enjoy this:\n\n${title}\n\n${description}\n\nCheck it out: ${url}`)}`
  };

  const handleShare = (platform: string) => {
    if (!isMounted) return;
    
    const shareUrl = shareLinks[platform as keyof typeof shareLinks];
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between pt-3 mt-4 border-t border-gray-700/30">
      {label && <span className="text-xs text-gray-500">{label}</span>}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleShare('facebook')}
          className="text-gray-500 hover:text-blue-500 transition-colors duration-200 p-1 rounded hover:bg-blue-500/10"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('twitter')}
          className="text-gray-500 hover:text-blue-400 transition-colors duration-200 p-1 rounded hover:bg-blue-400/10"
          aria-label="Share on Twitter"
          title="Share on Twitter"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('linkedin')}
          className="text-gray-500 hover:text-blue-600 transition-colors duration-200 p-1 rounded hover:bg-blue-600/10"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </button>

        <button
          onClick={() => handleShare('email')}
          className="text-gray-500 hover:text-orange-400 transition-colors duration-200 p-1 rounded hover:bg-orange-400/10"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 11.367 21.615 3.82h.749c.904 0 1.636.733 1.636 1.637Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ShareButtons;