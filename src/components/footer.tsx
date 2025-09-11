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
import Image from 'next/image';

const socialLinks = [
  { icon: Facebook, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Linkedin, href: '#' },
];

const serviceLinks = [
  {label: 'Application Development', href: '/services/application-development'},
  {label: 'Cloud Services', href: '/services/cloud-services'},
  {label: 'Cyber Security', href: '/services/cyber-security'},
  {label: 'Cyber Forensics', href: '/services/cyber-forensics'},
  {label: 'Digital Marketing', href: '/services/digital-marketing'},
];
const quickLinks = [
  {label: 'Home', href: '/'},
  {label: 'About Us', href: '/about'},
  {label: 'Services', href: '/services'},
  {label: 'Case Studies', href: '/case-studies'},
  {label: 'Contact', href: '/contact'},
  {label: 'Blog', href: '/blog'},
];
const supportLinks = [
  'Help & FAQ',
  'Contact Us',
  'Privacy Policy',
  'Terms of Service',
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/assets/img/cryol___logo__white.png" alt="Cryol Logo" width={160} height={64} />
            </Link>
            <p className="text-gray-400">
              Secure, Innovative, and Growth-Driven IT Solutions
            </p>
            <address className="not-italic text-gray-400">
              <p className="flex items-start">
                <MapPin className="mr-2 mt-1 h-4 w-4 shrink-0 text-primary" />
                20/22 kannappan street, otteri, chennai 600012
              </p>
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-primary" />
                <a href="mailto:contact@cryol.in" className="hover:text-primary">
                  contact@cryol.in
                </a>
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-primary" />
                <a href="tel:+919962310278" className="hover:text-primary">
                  +91 99623 10278
                </a>
              </p>
              <p className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-primary" />
                <a
                  href="https://www.cryol.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary"
                >
                  www.cryol.in
                </a>
              </p>
            </address>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-white">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-primary"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row md:px-6">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Cryol. All Rights Reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map(({ icon: Icon, href }, index) => (
              <Link
                key={index}
                href={href}
                className="text-gray-400 hover:text-primary"
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
