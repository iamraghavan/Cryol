import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { business } from '@/lib/business';
import { serviceCatalog } from '@/lib/services';
export default function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-top"><div><p className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</p><h2>Have a challenge?<br /><span>Let’s build the solution.</span></h2></div><Link href="/get-a-quote" className="button button-primary">Start a conversation <ArrowUpRight size={18} /></Link></div>
    <div className="footer-grid"><div><Link href="/" className="wordmark">cryol<span>®</span></Link><p>Technology with purpose.<br />Built for your business.</p><a href={'mailto:' + business.email} className="break-all">{business.email}</a>{business.phones.map(phone => <div key={phone.href}><a href={phone.href}>{phone.number}</a></div>)}</div>
      <div><h3>What we do</h3>{serviceCatalog.map(s => <Link key={s.slug} href={'/services/' + s.slug}>{s.title}</Link>)}</div>
      <div><h3>Explore</h3><Link href="/about">About Cryol</Link><Link href="/blog">Insights & guides</Link><Link href="/case-studies">Case Studies</Link><Link href="/contact">Contact us</Link><Link href="/get-a-quote">Request a proposal</Link><Link href="/privacy">Privacy notice</Link></div>
      <div><h3>Find us</h3><p>{business.address}</p><a href={business.map} target="_blank" rel="noopener noreferrer" className="inline-link">Open Google Maps <ArrowUpRight size={15} /></a><p className="footer-note">Based in Chennai.<br />Collaborating wherever you work.</p></div>
    </div><div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name}. All rights reserved.</span><span>Build. Grow. Secure.</span></div>
  </div></footer>;
}
