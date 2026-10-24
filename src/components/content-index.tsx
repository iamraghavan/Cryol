import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ContentEntry, ContentKind } from '@/lib/content';

export default function ContentIndex({ kind, entries }: { kind: ContentKind; entries: ContentEntry[] }) {
  const blog = kind === 'blog';
  return <><section className="page-hero"><div className="shell"><p className="eyebrow">{blog ? 'THE CRYOL NOTEBOOK' : 'THE WORK BEHIND THE TECHNOLOGY'}</p><h1>{blog ? 'Clearer thinking.' : 'Real challenges.'}<br /><span className="brand-accent">{blog ? 'Better digital decisions.' : 'Practical solutions.'}</span></h1><p>{blog ? 'Practical starting points for your next technology project.' : 'Explore the challenges, approach and outcomes behind Cryol projects.'}</p></div></section>
    <section className="section-space"><div className="shell">{entries.length ? <div className="capability-grid">{entries.map(entry => <article className="insight-card" key={entry.slug}>{entry.cover && <img src={entry.cover} alt={entry.coverAlt || entry.title} className="content-card-cover" loading="lazy" />}<p className="eyebrow"><time dateTime={entry.date}>{entry.date}</time>{entry.industry ? ' / ' + entry.industry : ''}</p><h2><Link href={'/' + kind + '/' + entry.slug}>{entry.title}</Link></h2><p>{entry.summary}</p><Link href={'/' + kind + '/' + entry.slug} className="text-link">{blog ? 'Read the article' : 'Explore the project'}<ArrowUpRight size={17} /></Link></article>)}</div> : <div className="content-empty"><h2>Project stories are on the way.</h2><p>We’re preparing approved case studies. In the meantime, tell us about your requirements and we’ll discuss the relevant experience.</p><Link href="/contact" className="button button-primary">Discuss your project <ArrowUpRight size={17} /></Link></div>}</div></section>
  </>;
}
