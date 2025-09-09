import { ReactNode } from "react";
import Image, { StaticImageData } from "next/image";

interface ResponsiveBackgroundProps {
  desktop: StaticImageData;
  tablet?: StaticImageData;
  mobile?: StaticImageData;
  alt: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}

const ResponsiveBackground: React.FC<ResponsiveBackgroundProps> = ({
  desktop,
  tablet,
  mobile,
  alt,
  priority = false,
  className = "",
  children
}) => {
  return (
    <div className={`relative ${className}`}>
      {/* Desktop Background */}
      <Image
        src={desktop}
        alt={alt}
        fill
        priority={priority}
        className="hidden lg:block absolute inset-0 object-cover -z-30"
        sizes="(min-width: 1024px) 100vw, 0px"
      />
      
      {/* Tablet Background */}
      {tablet && (
        <Image
          src={tablet}
          alt={alt}
          fill
          priority={priority}
          className="hidden md:block lg:hidden absolute inset-0 object-cover -z-30"
          sizes="(min-width: 768px) and (max-width: 1023px) 100vw, 0px"
        />
      )}
      
      {/* Mobile Background */}
      {mobile && (
        <Image
          src={mobile}
          alt={alt}
          fill
          priority={priority}
          className="block md:hidden absolute inset-0 object-cover -z-30"
          sizes="(max-width: 767px) 100vw, 0px"
        />
      )}
      
      {/* Fallback for when only desktop is provided */}
      {!tablet && !mobile && (
        <Image
          src={desktop}
          alt={alt}
          fill
          priority={priority}
          className="block lg:hidden absolute inset-0 object-cover -z-30"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
        />
      )}
      
      {children}
    </div>
  );
};

export default ResponsiveBackground;