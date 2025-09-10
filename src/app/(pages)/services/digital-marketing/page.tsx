import { Megaphone, Search, BarChart, Users, Mail, Check, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Search,
    title: 'Search Engine Optimization (SEO)',
    description: 'Increase your organic visibility and drive targeted traffic with our proven SEO strategies.',
  },
  {
    icon: BarChart,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'We create and manage high-ROI PPC campaigns on Google Ads and social media to deliver immediate results.',
  },
  {
    icon: Users,
    title: 'Social Media Marketing',
    description: 'Build your brand and engage with your audience through strategic social media management and content creation.',
  },
    {
    icon: Mail,
    title: 'Email & Content Marketing',
    description: 'Nurture leads and drive conversions with compelling content and targeted email marketing campaigns.',
  },
];

const processSteps = [
  {
    icon: Search,
    title: "1. Strategy & Goal Setting",
    description: "We start with a deep dive into your business, audience, and goals to build a comprehensive digital marketing strategy."
  },
  {
    icon: BarChart,
    title: "2. Campaign Execution",
    description: "Our team launches targeted campaigns across SEO, PPC, social media, and email, optimized for maximum impact."
  },
  {
    icon: Users,
    title: "3. Performance Tracking",
    description: "We use advanced analytics to monitor campaign performance in real-time, tracking key metrics and KPIs."
  },
  {
    icon: Mail,
    title: "4. Reporting & Optimization",
    description: "You'll receive detailed reports and insights. We continuously refine our strategies to improve results and ROI."
  }
];

const whyChooseUsPoints = [
    "Data-driven strategies tailored to your business goals.",
    "A dedicated team of SEO, PPC, and social media experts.",
    "Transparent reporting and regular communication.",
    "Focus on generating measurable results and high ROI.",
    "Creative content that resonates with your target audience.",
];

export default function DigitalMarketingPage() {
  const service = {
    title: 'Digital Marketing',
    description: 'Drive growth and reach your target audience with our strategic, data-driven digital marketing campaigns. From SEO and PPC to social media and content marketing, we’ve got you covered.',
    icon: Megaphone,
    imageUrl: 'https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg',
    imageHint: 'digital marketing people'
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
                    Our Approach to Digital Growth
                </h2>
                <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
                    We use a strategic, results-oriented process to help you achieve your digital marketing objectives.
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
                            Amplify Your Brand, Accelerate Your Growth
                        </h2>
                        <p className="text-muted-foreground md:text-xl/relaxed">
                            Our digital marketing experts are dedicated to helping you connect with your audience and drive meaningful business results.
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
                            alt="Digital Marketing Team"
                            className="rounded-xl object-cover shadow-2xl"
                            height={500}
                            src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=1080"
                            width={600}
                            data-ai-hint="marketing team meeting"
                        />
                    </div>
                </div>
            </div>
        </section>

    </ServicePage>
  );
}
