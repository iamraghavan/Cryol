import Link from 'next/link';
import type { Metadata } from 'next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowUpRight } from 'lucide-react';
import { business } from '@/lib/business';
import { getService } from '@/lib/services';
import type { ContentEntry } from '@/lib/content';

export function articleMetadata(entry: ContentEntry): Metadata {
  const url = '/' + entry.kind + '/' + entry.slug;
  const title = entry.seoTitle || entry.title;
  const description = entry.seoDescription || entry.summary;
  return { title, description, alternates: { canonical: url },
    openGraph: { type: 'article', title, description, url, publishedTime: entry.date, authors: [entry.author], images: [entry.cover || '/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: [entry.cover || '/opengraph-image'] },
  };
}

export default function ContentArticle({ entry }: { entry: ContentEntry }) {
  const url = business.url + '/' + entry.kind + '/' + entry.slug;
  const label = entry.kind === 'blog' ? 'Insights' : 'Case Studies';
  const schema = { '@context': 'https://schema.org', '@type': entry.kind === 'blog' ? 'BlogPosting' : 'Article', headline: entry.title, description: entry.summary, datePublished: entry.date,
    author: entry.author === business.name ? { '@type': 'Organization', name: entry.author } : { '@type': 'Person', name: entry.author },
    publisher: { '@id': business.url + '/#organization' }, mainEntityOfPage: url, url, image: business.url + (entry.cover || '/opengraph-image') };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <section className="page-hero"><div className="shell"><Link href={'/' + entry.kind} className="text-link">← All {label.toLowerCase()}</Link><p className="eyebrow article-category">{label.toUpperCase()}{entry.industry ? ' / ' + entry.industry.toUpperCase() : ''}</p><h1>{entry.title}</h1><p>{entry.summary}</p><p className="article-byline"><time dateTime={entry.date}>{new Intl.DateTimeFormat('en-IN', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(entry.date))}</time> · {entry.author}</p></div></section>
    <article className="shell prose-page section-space markdown-content">
      {entry.cover && <img src={entry.cover} alt={entry.coverAlt || entry.title} className="article-cover" />}
      {entry.client && <p>Client: <strong>{entry.client}</strong></p>}
      <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={{ h1: ({ children }) => <h2>{children}</h2> }}>{entry.body}</ReactMarkdown>
    </article>
    <section className="home-enquiry section-space"><div className="shell"><p className="eyebrow">TURN AN IDEA INTO YOUR NEXT PROJECT</p><h2>Have a similar challenge?<br /><span>Let’s discuss it.</span></h2><div className="hero-actions"><Link href="/get-a-quote" className="button button-primary">Tell us about your project <ArrowUpRight size={18} /></Link></div>{entry.services.length > 0 && <div className="related-services">{entry.services.map(slug => <Link key={slug} href={'/services/' + slug}>{getService(slug).title}<ArrowUpRight size={17} /></Link>)}</div>}</div></section>
  </>;
}
