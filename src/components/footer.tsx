import Link from 'next/link';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Globe,
  Play,
} from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
];

const serviceLinks = [
  'Application Development',
  'Cloud Services',
  'Cyber Security',
  'Cyber Forensics',
  'Digital Marketing',
];
const quickLinks = [
  'Home',
  'About Us',
  'Services',
  'Case Studies',
  'Contact',
  'Blog',
];
const supportLinks = [
  'Help & FAQ',
  'Contact Us',
  'Pricing and Plans',
  'Privacy Policy',
  'Terms of Service',
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="#" className="text-2xl font-bold text-primary">
              Cryol
            </Link>
            <p className="text-muted-foreground">
              Secure, Innovative, and Growth-Driven IT Solutions
            </p>
            <address className="not-italic text-muted-foreground">
              <p className="flex items-start">
                <MapPin className="mr-2 mt-1 h-4 w-4 shrink-0" />
                20/22 kannappan street, otteri, chennai 600012
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                <a href="mailto:contact@cryol.com" className="hover:text-primary">
                  contact@cryol.com
                </a>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <a href="tel:+911234520120" className="hover:text-primary">
                  (+91) 12345 20120
                </a>
              </p>
              <p className="flex items-center">
                <Globe className="mr-2 h-4 w-4" />
                <a
                  href="https://www.cryol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  www.cryol.com
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Link href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary">
                <Play /> Play Store
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Cryol. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="text-muted-foreground hover:text-primary"
              >
                <Icon className="h-5 w-5" />
                <span className="sr-only">Social media link</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
