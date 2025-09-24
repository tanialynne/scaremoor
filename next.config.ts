import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enhanced image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Performance optimizations
  experimental: {
    scrollRestoration: true,
  },

  // Turbopack configuration (stable in Next.js 15)
  turbopack: {
    resolveAlias: {
      // Reduce bundle size for heavy libraries
      'three': 'three/build/three.min.js',
    },
  },

  // Webpack optimizations for bundle size
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      // Better code splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Separate heavy libraries
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
            reuseExistingChunk: true,
          },
          // Three.js and VANTA in separate chunk
          threeVanta: {
            test: /[\\/]node_modules[\\/](three|vanta)[\\/]/,
            name: 'three-vanta',
            priority: 20,
            reuseExistingChunk: true,
          },
          // Common components
          common: {
            name: 'common',
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };

      // Tree shaking for Three.js
      config.resolve.alias = {
        ...config.resolve.alias,
        'three/examples/jsm': 'three/examples/jsm',
      };
    }

    return config;
  },

  // Security headers
  async headers() {
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Base CSP without upgrade-insecure-requests for development
    const cspDirectives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.clarity.ms https://cdn.jsdelivr.net https://va.vercel-scripts.com https://connect.facebook.net https://js.stripe.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob: https://www.facebook.com",
      "media-src 'self' https:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-analytics.com https://vercel-vitals.axiom.co https://va.vercel-scripts.com https://www.facebook.com https://api.stripe.com https://js.stripe.com",
      "frame-src 'self' https://js.stripe.com https://hooks.stripe.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'"
    ];
    
    // Only add upgrade-insecure-requests in production
    if (!isDevelopment) {
      cspDirectives.push("upgrade-insecure-requests");
    }
    
    const headers = [
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      },
      {
        key: 'Referrer-Policy',
        value: 'origin-when-cross-origin'
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()'
      },
      {
        key: 'Content-Security-Policy',
        value: cspDirectives.join('; ')
      }
    ];
    
    // Only add HSTS in production
    if (!isDevelopment) {
      headers.push({
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
      });
    }
    
    return [
      {
        source: '/(.*)',
        headers
      }
    ];
  },

  // Compression
  compress: true,

  // Static optimization
  trailingSlash: false,
  poweredByHeader: false,

  // Remove invalid config - fonts are optimized in localFont config
};

export default nextConfig;