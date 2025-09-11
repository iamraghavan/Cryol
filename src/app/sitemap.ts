import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.cryol.in';

  const staticPages = [
    '/',
    '/about',
    '/services',
    '/services/application-development',
    '/services/cloud-services',
    '/services/cyber-security',
    '/services/cyber-forensics',
    '/services/digital-marketing',
    '/case-studies',
    '/blog',
    '/get-a-quote',
    '/contact',
  ];

  const sitemap = staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as 'weekly',
    priority: path === '/' ? 1 : 0.8,
  }));

  return sitemap;
}
