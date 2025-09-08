'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  {
    href: '/services',
    label: 'Services',
    subLinks: [
      { href: '/services/application-development', label: 'Application Development' },
      { href: '/services/cloud-services', label: 'Cloud Services' },
      { href: '/services/cyber-security', label: 'Cyber Security' },
      { href: '/services/cyber-forensics', label: 'Cyber Forensics' },
      { href: '/services/digital-marketing', label: 'Digital Marketing' },
    ],
  },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 text-white">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/assets/img/cryol___logo__white.png" alt="Cryol Logo" width={120} height={48} />
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
          {NAV_LINKS.map((link) =>
            link.subLinks ? (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger className="flex items-center gap-1 transition-colors hover:text-primary focus:outline-none">
                  {link.label} <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-white border-gray-700">
                  {link.subLinks.map((subLink) => (
                    <DropdownMenuItem key={subLink.label} asChild>
                      <Link href={subLink.href} className="hover:!bg-primary/20 hover:!text-white">
                        {subLink.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden md:inline-flex bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/contact">Get a Free Consultation</Link>
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-gray-800">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-gray-900 text-white">
                <SheetHeader>
                  <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                </SheetHeader>
              <div className="flex flex-col gap-6 p-6">
                 <Link href="/" className="flex items-center space-x-2">
                    <Image src="/assets/img/cryol___logo__white.png" alt="Cryol Logo" width={140} height={56} />
                 </Link>
                <nav className="flex flex-col gap-4">
                  {NAV_LINKS.map((link) =>
                    link.subLinks ? (
                      <Accordion key={link.label} type="single" collapsible>
                        <AccordionItem value={link.label} className="border-b-0">
                          <AccordionTrigger className="text-lg font-medium transition-colors hover:text-primary py-2">
                            {link.label}
                          </AccordionTrigger>
                          <AccordionContent className="pl-4">
                            <nav className="flex flex-col gap-2">
                              {link.subLinks.map((subLink) => (
                                <Link
                                  key={subLink.label}
                                  href={subLink.href}
                                  className="text-base font-medium text-gray-300 transition-colors hover:text-primary"
                                  onClick={() => setMenuOpen(false)}
                                >
                                  {subLink.label}
                                </Link>
                              ))}
                            </nav>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ) : (
                     <Link
                      key={link.label}
                      href={link.href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
                </nav>
                <div className="flex flex-col gap-4 mt-4">
                   <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={() => setMenuOpen(false)}>
                      <Link href="/contact">Get a Free Consultation</Link>
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
