import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

const LEGACY_REDIRECT_SOURCES = [
  '/job/:path*',
  '/jobs',
  '/jobs/:path*',
  '/talent',
  '/talent/:path*',
  '/employer/:path*',
  '/map',
  '/community',
  '/diary',
  '/property',
  '/business',
  '/business/:path*',
  '/partnership',
  '/register',
  '/login',
  '/messages',
  '/alerts',
  '/test-banners',
];

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  compress: true,
  experimental: { inlineCss: true },
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.abam.kr' }],
        destination: 'https://abam.kr/:path*',
        permanent: true,
      },
      {
        source: '/guide/late-night-24-hour-massage',
        destination: '/guide/late-night-massage',
        permanent: true,
      },
      ...LEGACY_REDIRECT_SOURCES.map((source) => ({
        source,
        destination: '/',
        permanent: true,
      })),
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      ...LEGACY_REDIRECT_SOURCES.map((source) => ({
        source,
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      })),
    ];
  },
};

export default nextConfig;
