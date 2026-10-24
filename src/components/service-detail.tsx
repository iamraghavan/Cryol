import Link from 'next/link';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { getService, serviceCatalog } from '@/lib/services';
import { business } from '@/lib/business';
import { EnquiryForm } from './enquiry-form';

export function serviceMetadata(slug: string): Metadata {
  const service = getService(slug);
  const title = service.title + ' in Chennai';
  const description = service.intro;
  return { title, description, alternates: { canonical: '/services/' + slug },
    openGraph: { title: title + ' | Cryol Technologies', description, url: '/services/' + slug, images: ['/opengraph-image'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] } };
}
export default function ServiceDetail({ slug }: { slug: string }) {
  const service = getService(slug);
  const schema = { '@context': 'https://schema.org', '@type': 'Service', '@id': business.url + '/services/' + slug + '#service', name: service.title, description: service.intro, url: business.url + '/services/' + slug, provider: { '@id': business.url + '/#organization' }, areaServed: { '@type': 'City', name: 'Chennai' }, serviceType: service.title };
  const breadcrumbs = { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: business.url + '/' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: business.url + '/services' },
    { '@type': 'ListItem', position: 3, name: service.title, item: business.url + '/services/' + slug },
  ] };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, '\\u003c') }} />
    <nav className="service-breadcrumbs" aria-label="Breadcrumb"><div className="shell"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span aria-current="page">{service.title}</span></div></nav>
    <section className="page-hero"><div className="shell service-hero-grid"><div><p className="eyebrow">BUILD / GROW / SECURE</p><h1>{service.title}<span className="brand-accent">.</span></h1><p>{service.short}</p><div className="hero-actions"><a href="#service-enquiry" className="button button-primary">Discuss your requirements <ArrowUpRight size={18} /></a><a href="#capabilities" className="text-link">See what’s included <ArrowRight size={17} /></a></div></div><div className="service-summary"><span className="eyebrow">YOUR BUSINESS. THE RIGHT SOLUTION.</span><h2>{service.outcome}</h2><span>Based in Chennai. Built around your goals.</span></div></div></section>
    <section className="section-space" id="capabilities"><div className="shell"><div className="section-heading"><div><p className="eyebrow">WHAT WE CAN HELP WITH</p><h2>A practical approach to<br /><span>{service.title.toLowerCase()}.</span></h2></div><p>{service.intro}</p></div><div className="capability-grid">{service.capabilities.map((c, i) => <article key={c.title} className="capability"><span className="process-number">0{i + 1} /</span><h3>{c.title}</h3><p>{c.description}</p></article>)}</div></div></section>
    <section className="why-section section-space"><div className="shell why-grid"><div><p className="eyebrow">CLEAR SCOPE. CLEAR EXPECTATIONS.</p><h2>Know what<br /><span>you’re working towards.</span></h2><p className="section-intro">Every engagement starts with an agreed scope. Deliverables, timing, responsibilities and support are set out in your proposal.</p></div><div className="deliverables">{service.deliverables.map(d => <div key={d}><Check size={20} /><span>{d}</span></div>)}</div></div></section>
    <section className="section-space"><div className="shell faq-layout"><div><p className="eyebrow">BEFORE WE BEGIN</p><h2>Your questions.<br /><span>Clear answers.</span></h2></div><div className="faq-list">{service.questions.map(q => <details key={q.question}><summary>{q.question}<span>+</span></summary><p>{q.answer}</p></details>)}</div></div></section>
    <section id="service-enquiry" className="home-enquiry section-space"><div className="shell enquiry-layout"><div><p className="eyebrow">LET’S TALK ABOUT YOUR PROJECT</p><h2>Your next step<br /><span>starts with a conversation.</span></h2><p>Tell us what you want to achieve with {service.title.toLowerCase()}. We’ll review the details and discuss an approach that fits.</p><a className="text-link dark-link" href={'mailto:' + business.email}>{business.email} <ArrowUpRight size={16} /></a></div><div className="form-card"><h3>Enquire about {service.title.toLowerCase()}</h3><p>Share your requirements. We’ll help you plan the next step.</p><EnquiryForm service={slug} /></div></div></section>
    <section className="section-space"><div className="shell"><p className="eyebrow">CONNECTED SERVICES</p><h2>What else could help?</h2><div className="related-services">{serviceCatalog.filter(s => s.slug !== slug).map(s => <Link href={'/services/' + s.slug} key={s.slug}>{s.title}<ArrowUpRight size={17} /></Link>)}</div></div></section>
  </>;
}
