# Performance Optimization Guide

## Image Optimization Status

✅ **38 images optimized** with 86-97% file size reduction
✅ **WebP and AVIF versions** created for all major images
✅ **OptimizedImage component** ready for use

## How to Use OptimizedImage Component

### Default Behavior (Recommended)
For StaticImageData imports (most images), use OptimizedImage as a drop-in replacement for Image:

```tsx
import OptimizedImage from "../components/OptimizedImage";
import BackgroundImage from "../../public/images/landingpage-Image.png";

// This will use the regular Image component (safe)
<OptimizedImage
  src={BackgroundImage}
  alt="Hero background"
  priority={true}
/>
```

### Explicit Optimization (String paths only)
For string paths where you know optimized versions exist:

```tsx
// This will serve WebP/AVIF versions with PNG fallback
<OptimizedImage
  src="/images/landingpage-Image.png"
  alt="Hero background"
  useOptimization={true}
  priority={true}
/>
```

## Optimized Images List

The following images have WebP/AVIF versions available:

### Large Images (>500KB original)
- `landingpage-Image.png` → 95% smaller
- `LeadManageBackground.png` → 94% smaller
- `monsterBackground.png` → 95% smaller
- `scaremoorpage-image.png` → 97% smaller
- All book carousel/flat images → 88-94% smaller

### Medium Images (100-500KB original)
- `authorTania.png` → 91% smaller
- `forgotten-door-free.png` → 92% smaller
- `graveyard.png` → 88% smaller
- Plus 20+ other images

## Performance Impact

### Before Optimization:
- Homepage hero: ~1.3MB
- Book pages: ~1.5MB+ per book image
- Total page weight: 5-15MB

### After Optimization:
- Homepage hero: ~64KB (AVIF)
- Book pages: ~150KB per book image
- Total page weight: 1-3MB

### Expected Mobile Performance:
- **LCP improvement**: 60-80% faster
- **PageSpeed scores**: 69-72 → 80-90+
- **Data usage**: 80-95% reduction

## Technical Details

### Component Logic:
1. **StaticImageData imports**: Uses regular Image component (safe)
2. **String paths + useOptimization=true**: Serves modern formats
3. **Automatic fallback**: If WebP/AVIF fails, shows original PNG/JPG

### Browser Support:
- **AVIF**: Chrome 85+, Firefox 93+ (best compression)
- **WebP**: Chrome 32+, Firefox 65+, Safari 14+ (good compression)
- **PNG/JPG**: All browsers (fallback)

## Usage Examples

### Hero Backgrounds (Current - Working)
```tsx
<OptimizedImage
  src={BackgroundImage} // StaticImageData import
  alt="Hero background"
  fill
  priority={true}
/>
```

### String Path with Optimization
```tsx
<OptimizedImage
  src="/images/landingpage-Image.png"
  alt="Hero background"
  useOptimization={true}
  fill
  priority={true}
/>
```

### Small Decorative Images (Current - Working)
```tsx
<OptimizedImage
  src={CloudIcon} // StaticImageData import
  alt="Decorative cloud"
  loading="lazy"
/>
```

## Troubleshooting

**Images not loading?**
- Check that you're using StaticImageData imports (recommended)
- For string paths, only use `useOptimization={true}` for images in the optimized list
- All StaticImageData imports should work normally

**Want to add more optimized images?**
- Run `npm run optimize-images` to generate WebP/AVIF versions
- Add new image names to the OptimizedImage component's list
- Use `useOptimization={true}` for new string paths

## Performance Monitoring

Use the WebVitals component to monitor performance:
```tsx
import WebVitals from "./components/WebVitals";

// Add to your app
<WebVitals />
```

This tracks Core Web Vitals and logs performance metrics in development.