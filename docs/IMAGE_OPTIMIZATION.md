# Image Optimization Guide for Dynamic Images

## 📚 Overview

This guide explains how to optimize images that come from your backend API, including blur placeholders, responsive sizing, and performance optimization.

---

## 🎯 Quick Start

### 1. Basic Usage (Recommended)

```tsx
import OptimizedImage from "@/components/common/OptimizedImage";

// Simple usage
<OptimizedImage
  src={user.profileImage} // URL from backend
  alt={user.name}
  width={200}
  height={200}
/>;
```

### 2. Hero/Banner Images

```tsx
<div className="relative w-full h-96">
  <OptimizedImage
    src={heroData.imageUrl}
    alt="Hero"
    fill
    priority // Load immediately
    className="object-cover"
  />
</div>
```

---

## 🔧 Available Components

### 1. **OptimizedImage** (Recommended)

- ✅ Automatic blur placeholder
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive sizing
- ✅ URL optimization

### 2. **DynamicImage** (Simple)

- ✅ Basic optimization
- ✅ Shimmer placeholder
- ⚠️ No error handling

---

## 📦 Utility Functions

### `getShimmerDataURL(width, height)`

Creates an animated shimmer placeholder.

```tsx
import { getShimmerDataURL } from "@/utils/imageOptimization";

const placeholder = getShimmerDataURL(800, 600);
```

### `optimizeImageURL(url, options)`

Optimizes external image URLs (Google, Cloudinary, etc.).

```tsx
import { optimizeImageURL } from "@/utils/imageOptimization";

const optimized = optimizeImageURL(imageUrl, {
  width: 800,
  quality: 85,
  format: "webp",
});
```

### `getResponsiveSizes(mobile, tablet, desktop)`

Generates responsive sizes string.

```tsx
import { getResponsiveSizes } from "@/utils/imageOptimization";

const sizes = getResponsiveSizes("100vw", "50vw", "33vw");
// Returns: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
```

---

## 🎨 Real-World Examples

### Example 1: User Profile Picture

```tsx
// From backend: { profileImage: "https://api.example.com/users/123/photo.jpg" }

<OptimizedImage
  src={user.profileImage}
  alt={user.name}
  width={200}
  height={200}
  className="rounded-full border-4 border-white shadow-lg"
/>
```

### Example 2: Notice Board Images

```tsx
// From backend: { notices: [{ imageUrl: "...", title: "..." }] }

{
  notices.map((notice) => (
    <div key={notice.id} className="relative aspect-video">
      <OptimizedImage
        src={notice.imageUrl}
        alt={notice.title}
        fill
        className="rounded-lg object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  ));
}
```

### Example 3: Student ID Cards

```tsx
// From backend: { students: [{ idCardUrl: "...", name: "..." }] }

<OptimizedImage
  src={student.idCardUrl}
  alt={`${student.name} ID Card`}
  width={600}
  height={400}
  quality={95} // Higher quality for ID cards
  className="rounded-lg shadow-md"
/>
```

### Example 4: Gallery with Loading State

```tsx
const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

{
  gallery.map((item) => (
    <div key={item.id} className="relative">
      <OptimizedImage
        src={item.imageUrl}
        alt={item.title}
        width={400}
        height={300}
        onLoadingComplete={() => {
          setLoadedImages((prev) => new Set(prev).add(item.id));
        }}
      />
      {!loadedImages.has(item.id) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  ));
}
```

---

## 🚀 Performance Tips

### 1. **Use `priority` for Above-the-Fold Images**

```tsx
// Hero image - visible immediately
<OptimizedImage src={hero} alt="Hero" fill priority />

// Below-the-fold images - lazy load
<OptimizedImage src={gallery} alt="Gallery" fill />
```

### 2. **Optimize Sizes for Different Screens**

```tsx
<OptimizedImage
  src={image}
  alt="Responsive"
  fill
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
/>
```

### 3. **Adjust Quality Based on Use Case**

```tsx
// Profile pictures - medium quality
<OptimizedImage src={profile} quality={75} />

// ID cards - high quality
<OptimizedImage src={idCard} quality={95} />

// Thumbnails - lower quality
<OptimizedImage src={thumb} quality={60} />
```

---

## 🔥 Advanced: Server-Side Blur Generation

For the best quality blur placeholders, generate them server-side:

### Step 1: Install Sharp

```bash
npm install sharp
```

### Step 2: Generate Blur in API Route

```tsx
// app/api/blur-placeholder/route.ts
import { fetchAndGenerateBlur } from "@/utils/serverImageOptimization";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return new Response("Missing URL", { status: 400 });
  }

  const blurDataURL = await fetchAndGenerateBlur(imageUrl);

  return Response.json({ blurDataURL });
}
```

### Step 3: Use in Component

```tsx
const [blurDataURL, setBlurDataURL] = useState("");

useEffect(() => {
  fetch(`/api/blur-placeholder?url=${encodeURIComponent(imageUrl)}`)
    .then((res) => res.json())
    .then((data) => setBlurDataURL(data.blurDataURL));
}, [imageUrl]);

<Image
  src={imageUrl}
  alt="High Quality Blur"
  fill
  placeholder="blur"
  blurDataURL={blurDataURL || getShimmerDataURL(800, 600)}
/>;
```

---

## 📊 Performance Checklist

- ✅ Use `OptimizedImage` for all dynamic images
- ✅ Add `priority` to hero/above-fold images
- ✅ Use appropriate `quality` settings
- ✅ Specify `sizes` for responsive images
- ✅ Add `width` and `height` to prevent layout shift
- ✅ Use `fill` for container-based sizing
- ✅ Handle loading and error states
- ✅ Optimize backend image URLs when possible

---

## 🎯 Migration Guide

### Before (Static Blur)

```tsx
<Image
  src="https://example.com/image.jpg"
  alt="Static"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/..." // Manual base64
/>
```

### After (Dynamic Blur)

```tsx
<OptimizedImage
  src={dynamicImageUrl} // From backend
  alt="Dynamic"
  width={800}
  height={600}
  // Blur placeholder generated automatically!
/>
```

---

## 🐛 Troubleshooting

### Issue: Images not loading

**Solution:** Check `next.config.ts` for allowed domains:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-backend-domain.com',
    },
  ],
}
```

### Issue: Blur placeholder not showing

**Solution:** Make sure you're using `placeholder="blur"` and providing `blurDataURL`.

### Issue: Images loading slowly

**Solution:**

1. Use `priority` for critical images
2. Optimize backend image sizes
3. Use CDN for image hosting
4. Enable AVIF/WebP in `next.config.ts`

---

## 📝 Summary

**For 95% of cases, use this:**

```tsx
<OptimizedImage
  src={imageFromBackend}
  alt="Description"
  width={800}
  height={600}
/>
```

**That's it!** The component handles everything else automatically. 🎉
