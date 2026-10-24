import type { Metadata } from 'next';
import ContentIndex from '@/components/content-index';
import { getContent } from '@/lib/content';
export const metadata: Metadata = { title: 'IT Insights & Business Website Planning', description: 'Practical insights from Cryol Technologies on business websites, applications, marketing, cloud and security.', alternates: { canonical: '/blog' } };
export default async function Page() { return <ContentIndex kind="blog" entries={await getContent('blog')} />; }
