"use client";

import { useRef } from "react";
import { trackVideoPlay, trackVideoComplete } from "@/app/utils/analytics";

type VideoPreviewProps = {
  videoSrc: string;
  title?: string;
  className?: string;
  bookTitle?: string;
};

const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  videoSrc, 
  title = "Book Preview", 
  className = "",
  bookTitle
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    trackVideoPlay(title, bookTitle);
  };

  const handleEnded = () => {
    trackVideoComplete(title, bookTitle);
  };

  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden bg-black ${className}`}>
      <video
        ref={videoRef}
        src={videoSrc}
        title={title}
        className="w-full h-full object-cover"
        controls
        preload="metadata"
        onPlay={handlePlay}
        onEnded={handleEnded}
      />
    </div>
  );
};

export default VideoPreview;