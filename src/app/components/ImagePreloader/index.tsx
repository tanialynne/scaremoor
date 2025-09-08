"use client";

import { useEffect } from "react";

interface ImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images, priority = true }) => {
  useEffect(() => {
    if (priority) {
      // Preload critical images immediately
      images.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        link.type = "image/webp"; // Prefer WebP
        document.head.appendChild(link);
      });
    } else {
      // Preload non-critical images after page load
      const preloadImages = () => {
        images.forEach((src) => {
          const img = new Image();
          img.src = src;
        });
      };
      
      if (document.readyState === "complete") {
        setTimeout(preloadImages, 100);
      } else {
        window.addEventListener("load", () => {
          setTimeout(preloadImages, 100);
        });
      }
    }
  }, [images, priority]);

  return null; // This component doesn't render anything
};

export default ImagePreloader;