import { ReactNode, CSSProperties } from "react";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface OptimizedSectionProps {
  children: ReactNode;
  backgroundImage?: StaticImageData;
  backgroundStyle?: CSSProperties;
  className?: string;
  priority?: boolean;
}

const OptimizedSection: React.FC<OptimizedSectionProps> = ({
  children,
  backgroundImage,
  backgroundStyle,
  className = "",
  priority = false,
}) => {
  return (
    <section 
      className={`relative overflow-hidden ${className}`}
      style={backgroundStyle}
    >
      {backgroundImage && (
        <Image 
          src={backgroundImage}
          alt="Section background"
          fill
          priority={priority}
          className="absolute inset-0 object-cover -z-10"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, 100vw"
          placeholder="blur"
        />
      )}
      {children}
    </section>
  );
};

export default OptimizedSection;