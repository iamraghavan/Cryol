import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  typescript: { ignoreBuildErrors: false },
  poweredByHeader: false,
  outputFileTracingIncludes: { '/*': ['./content/**/*.md'] },
  async headers() {
    return [{ source: '/((?!int_ad/CMS/v1(?:/|$)).*)', headers: [
      { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none';" },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
    ] }, { source: '/int_ad/CMS/v1/:path*', headers: [
      { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
      { key: 'Cache-Control', value: 'no-store, max-age=0' },
      { key: 'Referrer-Policy', value: 'no-referrer' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ] }];
  },
  images: { remotePatterns: ['placehold.co','picsum.photos','onlinedegrees.sandiego.edu','upload.wikimedia.org','ui-avatars.com','img.freepik.com','images.unsplash.com'].map(hostname => ({ protocol: 'https' as const, hostname })) },
};
export default nextConfig;
