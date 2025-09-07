import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

import Nav from "../Navigation";
import VantaFogBackground from "../VantaFogBackground";

import LandingPageAsset from "../../../../public/images/landingpage-asset.png";

type HeroboxProps = {
  backgroundImage?: StaticImageData;
  children: ReactNode;
  contentPaddingTop?: string;
  landingAssets?: boolean;
  fogEffect?: boolean;
};

const Herobox: React.FC<HeroboxProps> = ({ children, backgroundImage, contentPaddingTop = "lg:pt-12", landingAssets = false, fogEffect = false }) => {
  return (
    <div
      className="min-h-screen h-full relative z-50 px-8 md:px-20 p-8 overflow-hidden isolate"
      style={{
        backgroundImage: `url(${backgroundImage ? backgroundImage.src : ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="absolute inset-0 bg-black/50 -z-10"></div>
      {fogEffect && <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20 -z-5"></div>}

      <Nav />
      {fogEffect && <VantaFogBackground />}

      {landingAssets && (
        <div className="absolute bottom-0 left-0 right-0 -z-1">
          <Image src={LandingPageAsset} alt="landingpage-assets" className="w-full" />
        </div>
      )}

      <div className={`  text-white pt-10 ${contentPaddingTop}`}>{children}</div>
    </div>
  );
};

export default Herobox;
