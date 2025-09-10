import Services from '@/components/services';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore the comprehensive IT services offered by Cryol in Chennai, including Application Development, Cloud Services, Cyber Security, Cyber Forensics, and Digital Marketing.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'IT Services in Chennai | Cryol',
    description: 'From app development to cybersecurity, explore the full range of expert IT services we offer to businesses in Chennai.',
    url: '/services',
  },
};


export default function ServicesPage() {
  return (
    <>
      <Services />
    </>
  );
}
