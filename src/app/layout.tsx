import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const title = 'Cryol - Application Development, Cloud Services, Cyber Security, Cyber Forensics & Digital Marketing in Chennai';
const description = 'Cryol offers top-notch Application Development, Cloud Services, Cyber Security, Cyber Forensics, and Digital Marketing in Chennai. Discover how we can help your business grow and protect your digital assets.';
const url = 'https://www.cryol.com';

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | Cryol`,
  },
  description: description,
  keywords: ['IT services Chennai', 'application development', 'cloud services', 'cyber security', 'cyber forensics', 'digital marketing', 'Cryol Chennai'],
  authors: [{ name: 'Cryol', url: url }],
  creator: 'Cryol',
  publisher: 'Cryol',
  metadataBase: new URL(url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: 'Cryol',
    images: [
      {
        url: '/assets/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cryol Digital IT Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: ['/assets/img/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};


const LocalBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Cryol",
  "image": "https://www.cryol.com/assets/img/cryol___logo__white.png",
  "@id": "https://www.cryol.com",
  "url": "https://www.cryol.com",
  "telephone": "+91 12345 20120",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "20/22 kannappan street, otteri",
    "addressLocality": "Chennai",
    "postalCode": "600012",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 13.072175913256956,
    "longitude": 80.24151447479719
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  },
  "sameAs": [
    "https://www.facebook.com/cryol",
    "https://www.twitter.com/cryol",
    "https://www.instagram.com/cryol",
    "https://www.linkedin.com/company/cryol"
  ]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(LocalBusinessJsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
