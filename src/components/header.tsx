'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return <header className="site-header"><div className="shell header-inner">
    <Link href="/" aria-label="Cryol Technologies home" onClick={() => setOpen(false)}><Image src="/assets/img/cryol___logo__white.png" alt="Cryol Technologies" width={134} height={54} priority className="brand-logo" /></Link>
    <nav aria-label="Main navigation" className={open ? 'main-nav is-open' : 'main-nav'}>
      {[['/', 'Home'], ['/services', 'Our services'], ['/about', 'About Cryol'], ['/blog', 'Insights'], ['/case-studies', 'Case Studies'], ['/contact', 'Contact']].map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="button button-primary mobile-nav-cta" href="/get-a-quote" onClick={() => setOpen(false)}>Let’s talk <ArrowUpRight size={17} /></Link>
    </nav>
    <Link className="button button-primary desktop-cta" href="/get-a-quote">Let’s talk <ArrowUpRight size={17} /></Link>
    <button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
  </div></header>;
}
