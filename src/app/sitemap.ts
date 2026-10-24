import type { MetadataRoute } from 'next';
import { business } from '@/lib/business';
import { serviceCatalog } from '@/lib/services';
import { getContent } from '@/lib/content';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const [blogs, cases] = await Promise.all([getContent('blog'), getContent('case-studies')]);
 const pages = ['/', '/about', '/services', ...serviceCatalog.map(s => '/services/' + s.slug), '/blog', ...(cases.length ? ['/case-studies'] : []), '/get-a-quote', '/contact', '/privacy'];
 return [
   ...pages.map(path => ({ url: business.url + path })),
   ...[...blogs, ...cases].map(entry => ({ url: business.url + '/' + entry.kind + '/' + entry.slug, lastModified: entry.date })),
 ];
}
