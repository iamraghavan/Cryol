import { Cloud, Server, Shield, Database, Network } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const features = [
  {
    icon: Server,
    title: 'Cloud Migration',
    description: 'Seamlessly migrate your existing infrastructure and applications to the cloud with minimal downtime and maximum efficiency.',
  },
  {
    icon: Shield,
    title: 'Cloud Security',
    description: 'We implement robust security measures to protect your cloud environment, ensuring data integrity and compliance.',
  },
  {
    icon: Database,
    title: 'Managed Cloud Services',
    description: 'Our team provides 24/7 management and support for your cloud infrastructure, optimizing performance and costs.',
  },
    {
    icon: Network,
    title: 'Hybrid & Multi-Cloud Solutions',
    description: 'We design and manage complex hybrid and multi-cloud environments to give you flexibility and avoid vendor lock-in.',
  },
];

export default function CloudServicesPage() {
  const service = {
    title: 'Cloud Services',
    description: 'Leverage the power of the cloud with our secure, flexible, and scalable solutions. We help you migrate, manage, and optimize your cloud infrastructure for peak performance and cost-efficiency.',
    icon: Cloud,
    imageUrl: 'https://img.freepik.com/free-photo/saas-concept-collage_23-2149399283.jpg',
    imageHint: 'cloud services collage'
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
