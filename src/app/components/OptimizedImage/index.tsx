"use client";

import Image, { ImageProps } from "next/image";
import { StaticImageData } from "next/image";

interface OptimizedImageProps extends ImageProps {
  src: string | StaticImageData;
}

/**
 * OptimizedImage Component - Automatically serves WebP/AVIF when available
 * Smart detection for images that have optimized versions
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  ...props
}) => {
  // List of images that have been optimized (have WebP/AVIF versions)
  const optimizedImages = [
    'JoinTheClub',
    'LeadManageBackground',
    'authorTania',
    'authorpage-image',
    'blurLayer',
    'books/ForgottenDoorBook-double',
    'books/ForgottenDoorBook-open',
    'books/HuntedLockerBook-info',
    'books/SingleBook',
    'books/changing-portrait-carousel',
    'books/changing-portrait-flat',
    'books/haunted-locker-carousel',
    'books/haunted-locker-flat',
    'books/hunterlocker-book',
    'books/living-vines-carousel',
    'books/living-vines-flat',
    'books/mask-room-carousel',
    'books/mask-room-flat',
    'books/phantom-playground-carousel',
    'books/phantom-playground-flat',
    'books/vanishing-words-carousel',
    'books/vanishing-words-flat',
    'booksBackgroundGuy',
    'bookspage-image',
    'cloudBottomMiddle',
    'footerBackground',
    'forgotten-door-free',
    'graveyard',
    'home-hero-comingsoon',
    'landingpage-Image',
    'logo',
    'monsterBackground',
    'more-stories',
    'readerQuote',
    'scaremoordoor',
    'scaremoorpage-image',
    'share-image',
    'singleBookBackground'
  ];

  // Extract the image path from src to check if it's optimized
  const getImagePath = (imageSrc: string | StaticImageData): string => {
    if (typeof imageSrc === 'object') {
      return imageSrc.src;
    }
    return imageSrc;
  };

  // Check if this image has optimized versions
  const hasOptimizedVersions = (imageSrc: string | StaticImageData): boolean => {
    const imagePath = getImagePath(imageSrc);
    return optimizedImages.some(optimizedImg => imagePath.includes(optimizedImg));
  };

  // Generate modern format URLs from the original path
  const getModernSrc = (originalSrc: string | StaticImageData, format: 'webp' | 'avif'): string => {
    const imagePath = getImagePath(originalSrc);
    // Convert from webpack path to public path and change extension
    const publicPath = imagePath.replace(/^\/_next\/static\/media\//, '/images/');
    const cleanPath = publicPath.replace(/\.[a-f0-9]+\./, '.'); // Remove webpack hash
    return cleanPath.replace(/\.(png|jpg|jpeg)$/i, `.${format}`);
  };

  // If image has optimized versions, use picture element with modern formats
  if (hasOptimizedVersions(src)) {
    return (
      <picture>
        {/* AVIF - Best compression, modern browsers */}
        <source
          srcSet={getModernSrc(src, 'avif')}
          type="image/avif"
          sizes={props.sizes}
        />

        {/* WebP - Good compression, widely supported */}
        <source
          srcSet={getModernSrc(src, 'webp')}
          type="image/webp"
          sizes={props.sizes}
        />

        {/* Fallback to original format */}
        <Image
          src={src}
          alt={props.alt || ""}
          {...props}
        />
      </picture>
    );
  }

  // For non-optimized images, use regular Image component
  return (
    <Image
      src={src}
      alt={props.alt || ""}
      {...props}
    />
  );
};

export default OptimizedImage;