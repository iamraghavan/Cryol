import { AppWindow, Code, Database, Smartphone, Globe } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  {
    icon: Globe,
    title: 'Custom Web Applications',
    description: 'We build tailor-made web applications that are scalable, secure, and perfectly aligned with your business objectives.',
  },
  {
    icon: Smartphone,
    title: 'Mobile App Development',
    description: 'Engage your customers with intuitive and high-performance native and cross-platform mobile apps for iOS and Android.',
  },
  {
    icon: Code,
    title: 'API Development & Integration',
    description: 'We create robust APIs and integrate third-party services to ensure seamless connectivity and functionality for your applications.',
  },
    {
    icon: Database,
    title: 'Database & Backend Solutions',
    description: 'Our team designs and develops powerful backend systems and databases that ensure your application runs smoothly and efficiently.',
  },
];

export default function AppDevPage() {
  const service = {
    title: 'Application Development',
    description: 'We build custom, scalable, and secure applications to meet your business needs. From web to mobile, our team delivers high-quality solutions that streamline operations and enhance user experiences.',
    icon: AppWindow,
    imageUrl: 'https://img.freepik.com/free-photo/representation-user-experience-interface-design_23-2150169863.jpg',
    imageHint: 'software development'
  };

  return (
    <ServicePage
      service={service}
      features={features}
      contactComponent={
        <Card className="p-8 shadow-lg">
          <QuoteForm />
        </Card>
      }
    />
  );
}
