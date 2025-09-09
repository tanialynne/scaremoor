import { ReactNode, CSSProperties } from "react";
import { StaticImageData } from "next/image";

interface OptimizedSectionProps {
  children: ReactNode;
  backgroundImage?: StaticImageData;
  backgroundStyle?: CSSProperties;
  className?: string;
}

const OptimizedSection: React.FC<OptimizedSectionProps> = ({
  children,
  backgroundImage,
  backgroundStyle,
  className = "",
}) => {
  const combinedStyle: CSSProperties = {
    ...(backgroundImage && {
      backgroundImage: `url(${backgroundImage.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }),
    ...backgroundStyle,
  };

  return (
    <section 
      className={`relative overflow-hidden ${className}`}
      style={combinedStyle}
    >
      {children}
    </section>
  );
};

export default OptimizedSection;