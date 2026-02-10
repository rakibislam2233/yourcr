
import {
  getResponsiveSizes,
  getShimmerDataURL,
  optimizeImageURL,
} from "@/utils/imageOptimization";
import Image from "next/image";

interface DynamicImageProps {
  src: string; // URL from backend
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
}

export default function DynamicImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  fill = false,
}: DynamicImageProps) {
  // Optimize the image URL
  const optimizedSrc = optimizeImageURL(src, {
    width: width,
    quality: 85,
    format: "webp",
  });

  // Generate shimmer placeholder
  const shimmerPlaceholder = getShimmerDataURL(width || 800, height || 600);

  if (fill) {
    return (
      <Image
        src={optimizedSrc}
        alt={alt}
        fill
        className={className}
        placeholder="blur"
        blurDataURL={shimmerPlaceholder}
        sizes={getResponsiveSizes()}
        priority={priority}
        quality={85}
      />
    );
  }

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      placeholder="blur"
      blurDataURL={shimmerPlaceholder}
      priority={priority}
      quality={85}
    />
  );
}

/**
 * Example Usage in a Component:
 *
 * // 1. Simple usage with dynamic URL from backend
 * <DynamicImage
 *   src={user.profileImage} // URL from backend
 *   alt={user.name}
 *   width={200}
 *   height={200}
 * />
 *
 * // 2. Hero image with fill and priority
 * <div className="relative w-full h-96">
 *   <DynamicImage
 *     src={heroData.imageUrl} // URL from backend
 *     alt="Hero"
 *     fill
 *     priority
 *     className="object-cover"
 *   />
 * </div>
 *
 * // 3. Gallery images with lazy loading
 * {gallery.map((item) => (
 *   <DynamicImage
 *     key={item.id}
 *     src={item.imageUrl}
 *     alt={item.title}
 *     width={400}
 *     height={300}
 *   />
 * ))}
 */
