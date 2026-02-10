
"use client";
import {
  getResponsiveSizes,
  getShimmerDataURL,
  optimizeImageURL,
} from "@/utils/imageOptimization";
import Image from "next/image";
import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  quality?: number;
  sizes?: string;
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  onLoadingComplete?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  fill = false,
  quality = 85,
  sizes,
  objectFit = "cover",
  onLoadingComplete,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Optimize the image URL for external sources
  const optimizedSrc = optimizeImageURL(src, {
    width: width,
    quality: quality,
    format: "webp",
  });

  // Generate shimmer placeholder
  const shimmerPlaceholder = getShimmerDataURL(width || 800, height || 600);

  // Auto-generate responsive sizes if not provided
  const responsiveSizes = sizes || getResponsiveSizes();

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
    onLoadingComplete?.();
  };

  // Handle error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Error fallback
  if (hasError) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: width || "100%", height: height || "100%" }}
      >
        <svg
          className="w-12 h-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  const imageClasses = `
    ${className}
    ${isLoading ? "blur-sm scale-105" : "blur-0 scale-100"}
    transition-all duration-300 ease-in-out
  `;

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={imageClasses}
        style={{ objectFit }}
        placeholder="blur"
        blurDataURL={shimmerPlaceholder}
        sizes={responsiveSizes}
        priority={priority}
        quality={quality}
        onLoad={handleLoadingComplete}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={imageClasses}
      placeholder="blur"
      blurDataURL={shimmerPlaceholder}
      priority={priority}
      quality={quality}
      onLoad={handleLoadingComplete}
      onError={handleError}
    />
  );
}