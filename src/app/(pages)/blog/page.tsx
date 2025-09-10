import UnderConstruction from '@/components/under-construction';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Our blog is currently under construction. Check back soon for insights on application development, cloud services, and cybersecurity from our experts in Chennai.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Cryol Blog | Under Construction',
    description: 'Our IT services blog is coming soon. Stay tuned for expert articles.',
    url: '/blog',
  },
};


export default function BlogPage() {
  return (
    <div className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
            <UnderConstruction />
        </div>
    </div>
  );
}
