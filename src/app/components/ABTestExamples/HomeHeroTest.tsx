"use client";

import OptimizedImage from "../OptimizedImage";
import { ABTestWrapper } from "../ABTest";
import { useABTest } from "@/app/utils/abTesting";
import BookImageRight from "../../../../public/images/home-hero-comingsoon.png";

interface HomeHeroTestProps {
  className?: string;
}

/**
 * A/B Test for Homepage Hero Section
 * Tests video trailer vs book covers grid to see what engages users more
 */
export const HomeHeroTest: React.FC<HomeHeroTestProps> = ({
  className = "",
}) => {
  const { trackConversion } = useABTest("home_hero_layout");

  const handleVideoPlay = () => {
    trackConversion("video_play", 2);
  };

  const handleBookClick = () => {
    trackConversion("book_click", 1);
  };

  return (
    <div className={`relative flex justify-center items-center ${className}`}>
      {/* Control: Video Trailer */}
      <ABTestWrapper testId="home_hero_layout" variant="control">
        <video
          className="w-full lg:w-[90%] max-w-screen-md rounded-lg shadow-lg"
          src="/videos/themaskroom_trailer.mp4"
          playsInline
          muted
          controls
          preload="metadata"
          onPlay={handleVideoPlay}
          autoPlay
        />
      </ABTestWrapper>

      {/* Variant A: Single Featured Book */}
      <ABTestWrapper testId="home_hero_layout" variant="variant_a">
        <div className="w-full lg:w-[70%] max-w-lg mx-auto">
          <OptimizedImage
            src={BookImageRight}
            alt="Featured Book - Coming Soon"
            className="w-full h-auto rounded-lg cursor-pointer"
            onClick={handleBookClick}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 512px"
            priority={true}
          />
        </div>
      </ABTestWrapper>
    </div>
  );
};

export default HomeHeroTest;
