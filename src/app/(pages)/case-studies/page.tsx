import type { Metadata } from 'next';
import ContentIndex from '@/components/content-index';
import { getContent } from '@/lib/content';
export async function generateMetadata(): Promise<Metadata> {
 const entries = await getContent('case-studies');
 return { title: 'IT Project Case Studies', description: 'Explore approved Cryol Technologies project case studies, including the challenge, approach, solution and measured outcomes.', alternates: { canonical: '/case-studies' }, robots: { index: entries.length > 0, follow: true } };
}
export default async function Page() { return <ContentIndex kind="case-studies" entries={await getContent('case-studies')} />; }
