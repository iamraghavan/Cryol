import UnderConstruction from '@/components/under-construction';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Our case studies page is under construction. We are preparing detailed examples of our successful projects in application development, cloud, and cybersecurity. Check back soon!',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/case-studies',
  },
  openGraph: {
    title: 'Cryol Case Studies | Under Construction',
    description: 'Explore our successful client projects soon. Our case studies page is being updated.',
    url: '/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <UnderConstruction />
        </div>
    </div>
  );
}
