import { AppWindow, Code, Database, Smartphone, Globe, Lightbulb, Bot, Rocket, Users, ShieldAlert, Check } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Application Development Services',
  description: 'Cryol provides custom application development services in Chennai. We build secure, scalable web and mobile applications to meet your business needs and enhance user experience.',
  keywords: ['application development chennai', 'web development', 'mobile app development', 'custom software', 'api development'],
  alternates: {
    canonical: '/services/application-development',
  },
  openGraph: {
    title: 'Custom Application Development Services in Chennai | Cryol',
    description: 'Build powerful web and mobile applications with our expert development team. We deliver high-quality, scalable solutions.',
    url: '/services/application-development',
  },
};


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

const processSteps = [
  {
    icon: Lightbulb,
    title: "1. Discovery & Planning",
    description: "We start by understanding your vision, goals, and requirements to create a detailed project roadmap and strategy."
  },
  {
    icon: Bot,
    title: "2. Design & Prototyping",
    description: "Our team creates intuitive UI/UX designs and interactive prototypes to visualize the end product and gather feedback."
  },
  {
    icon: Code,
    title: "3. Development & Integration",
    description: "Following agile methodologies, our developers write clean, efficient code and integrate all necessary features and APIs."
  },
  {
    icon: ShieldAlert,
    title: "4. Testing & Quality Assurance",
    description: "We conduct rigorous testing to ensure your application is secure, bug-free, and performs flawlessly across all devices."
  },
  {
    icon: Rocket,
    title: "5. Deployment & Launch",
    description: "We handle the entire deployment process, ensuring a smooth launch on app stores or your web server."
  },
  {
    icon: Users,
    title: "6. Support & Maintenance",
    description: "Our partnership doesn't end at launch. We provide ongoing support and maintenance to keep your application up-to-date."
  },
];

const whyChooseUsPoints = [
    "Agile development methodology for flexibility and speed.",
    "Focus on creating intuitive and engaging user experiences.",
    "Expertise in a wide range of modern technologies and platforms.",
    "Commitment to writing clean, maintainable, and scalable code.",
    "Dedicated project managers to ensure seamless communication.",
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
    >
        <section className="py-12 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
                 <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                    Our Process
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Our Application Development Lifecycle
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
                We follow a proven, transparent process to take your idea from concept to a fully functional, market-ready application.
                </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                            Your Vision, Engineered by Experts
                        </h2>
                        <p className="text-muted-foreground md:text-xl/relaxed">
                            We combine technical excellence with a creative mindset to build applications that not only work flawlessly but also delight users.
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
                            alt="Application Development Team"
                            className="rounded-xl object-cover shadow-2xl"
                            height={500}
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1080"
                            width={600}
                            data-ai-hint="team brainstorming whiteboard"
                        />
                    </div>
                </div>
            </div>
        </section>

    </ServicePage>
  );
}
