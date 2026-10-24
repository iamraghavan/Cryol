import { notFound } from 'next/navigation';
import ContentArticle, { articleMetadata } from '@/components/content-article';
import { getContent, getContentEntry } from '@/lib/content';
type Props = { params: Promise<{ slug: string }> };
export async function generateStaticParams() { return (await getContent('case-studies')).map(entry => ({ slug: entry.slug })); }
export async function generateMetadata({ params }: Props) {
  const entry = await getContentEntry('case-studies', (await params).slug);
  return entry ? articleMetadata(entry) : { robots: { index: false } };
}
export default async function Page({ params }: Props) {
  const entry = await getContentEntry('case-studies', (await params).slug);
  if (!entry) notFound();
  return <ContentArticle entry={entry} />;
}
