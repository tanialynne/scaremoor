"use client";

type VideoPreviewProps = {
  videoSrc: string;
  title?: string;
  className?: string;
};

const VideoPreview: React.FC<VideoPreviewProps> = ({ 
  videoSrc, 
  title = "Book Preview", 
  className = "" 
}) => {
  return (
    <div className={`relative w-full aspect-video rounded-lg overflow-hidden bg-black ${className}`}>
      <video
        src={videoSrc}
        title={title}
        className="w-full h-full object-cover"
        controls
        preload="metadata"
      />
    </div>
  );
};

export default VideoPreview;