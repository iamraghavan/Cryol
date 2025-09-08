import Footer from '@/components/footer';
import Header from '@/components/header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const caseStudies = [
  {
    title: 'Digital Transformation for a Retail Giant',
    description: 'How we modernized their e-commerce platform and boosted sales by 40%.',
    image: 'https://picsum.photos/600/400',
    tags: ['E-commerce', 'Cloud', 'React'],
    href: '#',
    aiHint: 'retail online'
  },
  {
    title: 'Cybersecurity Overhaul for a Financial Institution',
    description: 'Securing assets and achieving compliance with a robust security framework.',
    image: 'https://picsum.photos/600/400',
    tags: ['Cybersecurity', 'Finance', 'Azure'],
    href: '#',
    aiHint: 'finance security'
  },
  {
    title: 'Mobile App for a Healthcare Startup',
    description: 'A user-centric mobile application to connect patients with doctors.',
    image: 'https://picsum.photos/600/400',
    tags: ['Mobile App', 'Healthcare', 'Node.js'],
    href: '#',
    aiHint: 'healthcare app'
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Success Stories</h1>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Explore how we've helped businesses like yours to achieve their goals.
            </p>
          </div>
          <div className="mx-auto mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.title} className="overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-primary/20">
                <Link href={study.href}>
                  <Image
                    src={study.image}
                    alt={study.title}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    data-ai-hint={study.aiHint}
                  />
                  <CardHeader>
                    <CardTitle>{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{study.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span key={tag} className="text-xs font-semibold bg-primary/10 text-primary px-2 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
