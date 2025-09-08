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
import { Menu, ChevronDown, Globe } from 'lucide-react';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuPortal
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

const LOCALES = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'de', name: 'German' },
    { code: 'en-US-alt', name: 'USA (English)' }, // Custom locale for clarity
    { code: 'en-IE', name: 'UK & Ireland (English)' },
    { code: 'de-DE', name: 'Germany (Deutsch)' },
    { code: 'fr-FR', name: 'France (Français)' },
    { code: 'it-IT', name: 'Italy (Italiano)' },
    { code: 'zh-CN', name: 'Mainland China' },
    { code: 'zh-TW', name: 'Taiwan' },
    { code: 'ko-KR', name: 'Korea' },
    { code: 'ja-JP', name: 'Japan' },
    { code: 'pt-BR', name: 'Brazil (Português)' },
    { code: 'es-419', name: 'Latin America (Español)' },
    { code: 'ta', name: 'Tamil' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
];


export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-900 text-white">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Image src="/assets/img/cryol___logo__white.png" alt="Cryol Logo" width={100} height={40} />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-gray-800">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-white border-gray-700 max-h-96 overflow-y-auto">
              {LOCALES.map((locale) => (
                 <DropdownMenuItem key={locale.code} asChild>
                    <Link href={`/${locale.code.toLowerCase()}`} locale={false} className="hover:!bg-primary/20 hover:!text-white">
                        {locale.name}
                    </Link>
                 </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

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
                    <Image src="/assets/img/cryol___logo__white.png" alt="Cryol Logo" width={120} height={50} />
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
