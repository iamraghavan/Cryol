import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';
import { serviceCatalog } from '@/lib/services';
export const metadata: Metadata = { title: 'Complete IT Services in Chennai', description: 'Explore website, application and mobile app development, digital marketing, cloud services, cyber security and cyber forensics from Cryol Technologies.', alternates: { canonical: '/services' } };
export default function Page() {
 return <><section className="page-hero"><div className="shell"><p className="eyebrow">ONE PARTNER. CONNECTED POSSIBILITIES.</p><h1>Complete IT services.<br /><span className="brand-accent">Built around your business.</span></h1><p>From a stronger online presence to software, infrastructure and security. Explore what you need today and what could help you grow tomorrow.</p></div></section><section className="section-space"><div className="shell capability-grid">{serviceCatalog.map((s,i) => <article className="insight-card" key={s.slug}><span className="process-number">0{i+1} /</span><h2>{s.title}</h2><p>{s.intro}</p><Link href={'/services/'+s.slug} className="text-link">Explore {s.title.toLowerCase()} <ArrowUpRight size={17} /></Link></article>)}</div></section></>;
}
