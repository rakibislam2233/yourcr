
export const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

/**
 * Convert shimmer SVG to base64 data URL
 */
export const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

/**
 * Get shimmer data URL for placeholder
 * Usage: placeholder="blur" blurDataURL={getShimmerDataURL(800, 600)}
 */
export const getShimmerDataURL = (w: number, h: number) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;

/**
 * Generate blur placeholder from image URL
 * This uses Next.js Image Optimization API
 *
 * @param imageUrl - The full image URL
 * @returns A low-quality blurred version URL
 */
export const getBlurDataURL = (imageUrl: string): string => {
  // For external URLs, use a shimmer placeholder
  if (imageUrl.startsWith("http")) {
    return getShimmerDataURL(800, 600);
  }

  // For local images, Next.js will handle it automatically
  return imageUrl;
};

/**
 * Optimize image URL with query parameters
 * For services that support URL-based image optimization
 *
 * @param url - Original image URL
 * @param options - Optimization options
 */
export interface ImageOptimizationOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "webp" | "avif" | "jpeg" | "png";
}

export const optimizeImageURL = (
  url: string,
  options: ImageOptimizationOptions = {},
): string => {
  const { width, height, quality = 75, format = "webp" } = options;

  // If it's a Google User Content URL
  if (url.includes("googleusercontent.com")) {
    const params = new URLSearchParams();
    if (width) params.append("w", width.toString());
    if (height) params.append("h", height.toString());
    params.append("q", quality.toString());

    return `${url}${url.includes("?") ? "&" : "?"}${params.toString()}`;
  }

  // For other CDNs, add your logic here
  // Example for Cloudinary:
  // if (url.includes('cloudinary.com')) {
  //   return url.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`);
  // }

  return url;
};

/**
 * Preload critical images
 * Call this in layout or page component
 */
export const preloadImage = (src: string) => {
  if (typeof window !== "undefined") {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    document.head.appendChild(link);
  }
};

/**
 * Get responsive image sizes string
 * Based on common breakpoints
 */
export const getResponsiveSizes = (
  mobile = "100vw",
  tablet = "50vw",
  desktop = "33vw",
): string => {
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`;
};
