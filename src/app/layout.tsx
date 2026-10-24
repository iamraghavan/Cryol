import type { Metadata } from 'next';
import './globals.css';
import { business } from '@/lib/business';
import { serviceCatalog } from '@/lib/services';

const title = 'Cryol Technologies | Complete IT Services in Chennai';
const description = 'Build, grow and secure your business with Cryol Technologies. Website, application and mobile app development, digital marketing, cloud, cyber security and cyber forensics.';
export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: { default: title, template: '%s | Cryol Technologies' }, description,
  authors: [{ name: business.name }], creator: business.name, publisher: business.name,
  openGraph: { title, description, siteName: business.name, locale: 'en_IN', type: 'website', images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Cryol Technologies — Build. Grow. Secure.' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
};
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'ProfessionalService', '@id': business.url + '/#organization', name: business.name, url: business.url, email: business.email, telephone: business.phone,
      logo: business.url + '/assets/img/cryol___logo__white.png', image: business.url + '/opengraph-image', hasMap: business.map,
      contactPoint: business.phones.map(phone => ({ '@type': 'ContactPoint', telephone: phone.number, contactType: 'customer service', availableLanguage: 'English' })),
      address: { '@type': 'PostalAddress', streetAddress: '20/22 Kannappan Street, Otteri', addressLocality: 'Chennai', addressRegion: 'Tamil Nadu', postalCode: '600012', addressCountry: 'IN' },
      hasOfferCatalog: { '@type': 'OfferCatalog', name: 'IT Services', itemListElement: serviceCatalog.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title, url: business.url + '/services/' + s.slug } })) },
    },
    { '@type': 'WebSite', '@id': business.url + '/#website', url: business.url, name: business.name, publisher: { '@id': business.url + '/#organization' } },
  ],
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }} />
      </head>
      {/* Extensions such as Grammarly can add body attributes before hydration. */}
      <body suppressHydrationWarning>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
