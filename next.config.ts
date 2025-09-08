import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'onlinedegrees.sandiego.edu',
        port: '',
        pathname: '/**',
      }
    ],
  },
  i18n: {
    locales: [
        'en-us', 
        'en-gb', 
        'zh', 
        'ja', 
        'de', 
        'en-us-alt', 
        'en-ie', 
        'de-de', 
        'fr-fr',
        'it-it',
        'zh-cn',
        'zh-tw',
        'ko-kr',
        'ja-jp',
        'pt-br',
        'es-419',
        'ta',
        'kn',
        'ml',
    ],
    defaultLocale: 'en-us',
  },
};

export default nextConfig;
