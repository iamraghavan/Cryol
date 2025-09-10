import { Cloud, Server, Shield, Database, Network, LineChart, ShieldAlert, Check } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cloud Services',
  description: 'Cryol offers expert cloud services in Chennai, including cloud migration, security, and managed services for AWS, Azure, and GCP. Optimize your infrastructure for performance and cost.',
  keywords: ['cloud services chennai', 'aws services', 'azure services', 'gcp services', 'cloud migration', 'cloud security'],
  alternates: {
    canonical: '/services/cloud-services',
  },
  openGraph: {
    title: 'Expert Cloud Services in Chennai | AWS, Azure, GCP | Cryol',
    description: 'Leverage the power of the cloud with our secure, flexible, and scalable solutions for migration, management, and optimization.',
    url: '/services/cloud-services',
  },
};


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

const processSteps = [
  {
    icon: Network,
    title: "1. Assessment & Strategy",
    description: "We analyze your current infrastructure and business goals to develop a tailored cloud strategy and roadmap."
  },
  {
    icon: Server,
    title: "2. Migration & Implementation",
    description: "Our experts execute a seamless migration to the cloud, whether it's re-hosting, re-platforming, or re-architecting."
  },
  {
    icon: Shield,
    title: "3. Security & Compliance",
    description: "We implement multi-layered security controls and ensure your cloud environment meets industry compliance standards."
  },
  {
    icon: LineChart,
    title: "4. Optimization & Management",
    description: "We continuously monitor and optimize your cloud resources for performance, cost-efficiency, and reliability."
  }
];

const whyChooseUsPoints = [
    "Certified experts in AWS, Azure, and Google Cloud Platform.",
    "Proven methodologies for secure and efficient cloud migration.",
    "Proactive 24/7 monitoring and management to ensure uptime.",
    "Cost optimization strategies to maximize your ROI.",
    "Focus on building scalable, resilient, and future-proof architectures.",
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
    >
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Our Process
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Our Path to the Cloud
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              We guide you through every step of your cloud journey, ensuring a smooth and successful transition.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <Card key={index} className="text-center p-6 shadow-md">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                     <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" /> Why Choose Us
                     </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Unlock Your Business Potential with the Cloud
                    </h2>
                    <p className="text-muted-foreground md:text-xl/relaxed">
                       We provide the expertise and support you need to harness the full power of the cloud, driving innovation and efficiency.
                    </p>
                    <ul className="space-y-4">
                        {whyChooseUsPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                                <span className="text-lg text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="flex items-center justify-center">
                    <Image
                        alt="Cloud services team"
                        className="rounded-xl object-cover shadow-2xl"
                        height={500}
                        src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1080"
                        width={600}
                        data-ai-hint="team discussing cloud architecture"
                    />
                </div>
            </div>
          </div>
      </section>

    </ServicePage>
  );
}
