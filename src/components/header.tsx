'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Search } from 'lucide-react';

const NAV_LINKS = [
  { href: '#', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#', label: 'Case Studies' },
  { href: '#', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="mr-6 flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Cryol</span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Button asChild className="hidden md:inline-flex">
            <Link href="#contact">Get a Free Consultation</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="#" className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-primary">Cryol</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-4">
                   <Button asChild>
                      <Link href="#contact" onClick={() => setMenuOpen(false)}>Get a Free Consultation</Link>
                   </Button>
                   <Button variant="outline">
                      <Search className="mr-2 h-4 w-4" /> Search
                   </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
