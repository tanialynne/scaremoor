"use client";

import { useState, useEffect } from 'react';

interface PodcastShareButtonsProps {
  url: string;
  title: string;
  description: string;
}

const PodcastShareButtons: React.FC<PodcastShareButtonsProps> = ({ url, title, description }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Delay mounting to avoid blocking podcast card render
    const timer = setTimeout(() => setMounted(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const handleShare = (platform: string) => {
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} 🎧`)}&hashtags=Scaremoor,Podcast`,
      email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Listen to this podcast episode:\n\n${title}\n\n${description}\n\n${url}`)}`
    };
    
    const shareUrl = links[platform as keyof typeof links];
    if (platform === 'email') {
      window.location.href = shareUrl;
    } else {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex items-center justify-end pt-2 mt-2">
      <div className="flex items-center space-x-1">
        <span className="text-xs text-gray-500 mr-2">Share:</span>
        <button
          onClick={() => handleShare('facebook')}
          className="text-gray-500 hover:text-blue-500 transition-colors duration-200 p-1"
          aria-label="Share on Facebook"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </button>
        <button
          onClick={() => handleShare('twitter')}
          className="text-gray-500 hover:text-blue-400 transition-colors duration-200 p-1"
          aria-label="Share on Twitter"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
          </svg>
        </button>
        <button
          onClick={() => handleShare('email')}
          className="text-gray-500 hover:text-orange-400 transition-colors duration-200 p-1"
          aria-label="Share via Email"
        >
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.749L12 11.367 21.615 3.82h.749c.904 0 1.636.733 1.636 1.637Z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PodcastShareButtons;