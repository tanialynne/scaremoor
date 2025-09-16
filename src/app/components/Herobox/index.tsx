import { ReactNode } from "react";
import { StaticImageData } from "next/image";
import OptimizedImage from "../OptimizedImage";
import dynamic from "next/dynamic";

import Nav from "../Navigation";
// Lazy load the heavy Vanta component with loading fallback
const VantaFogBackground = dynamic(() => import("../VantaFogBackground"), {
  loading: () => (
    <div className="hidden lg:block absolute inset-0 -z-10 bg-gradient-to-b from-gray-800/20 via-gray-900/10 to-black/20 animate-pulse" />
  ),
});

import LandingPageAsset from "../../../../public/images/landingpage-asset.png";

type HeroboxProps = {
  backgroundImage?: StaticImageData;
  children: ReactNode;
  contentPaddingTop?: string;
  landingAssets?: boolean;
  fogEffect?: boolean;
  fullScreen?: boolean;
  priorityImage?: boolean;
};

const Herobox: React.FC<HeroboxProps> = ({ children, backgroundImage, contentPaddingTop = "lg:pt-12", landingAssets = false, fogEffect = false, fullScreen = false, priorityImage = true }) => {
  return (
    <>
      {/* Navigation outside of stacking context with proper padding */}
      <div className="absolute top-0 left-0 right-0 z-[1000] px-8 md:px-20 py-8">
        <Nav />
      </div>
      
      <div className={`${fullScreen ? 'min-h-screen' : 'min-h-fit'} h-full relative px-8 md:px-20 pt-24 pb-24 overflow-hidden isolate`}>
        {/* Optimized responsive background image */}
        {backgroundImage && (
          <OptimizedImage
            src={backgroundImage}
            alt="Hero background"
            fill
            priority={priorityImage}
            className="absolute inset-0 object-cover -z-30"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
            placeholder="blur"
          />
        )}
        <div className="absolute inset-0 bg-black/50 -z-20"></div>
        {fogEffect && <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 -z-10"></div>}

        {fogEffect && <VantaFogBackground />}

        {landingAssets && (
          <div className="absolute bottom-0 left-0 right-0 -z-5">
            <OptimizedImage
              src={LandingPageAsset}
              alt="landingpage-assets"
              className="w-full h-auto"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
              placeholder="blur"
            />
          </div>
        )}

        <div className={`relative z-10 text-white pt-10 ${contentPaddingTop}`}>{children}</div>
      </div>
    </>
  );
};

export default Herobox;
