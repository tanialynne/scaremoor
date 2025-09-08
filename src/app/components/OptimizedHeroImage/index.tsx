"use client";

import Image, { StaticImageData } from "next/image";
interface OptimizedHeroImageProps {
  src: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
}

const OptimizedHeroImage: React.FC<OptimizedHeroImageProps> = ({
  src,
  alt,
  priority = true,
  className = "absolute inset-0 object-cover"
}) => {

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
      className={className}
    />
  );
};

export default OptimizedHeroImage;