import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CyberSecurityPage() {
  return (
    <section className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <ShieldCheck className="h-4 w-4" />
                Our Services
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                Cyber Security
              </h1>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Protect your digital assets with our comprehensive cybersecurity
              services. We offer everything from threat assessment and
              penetration testing to 24/7 monitoring and incident response.
            </p>
            <div className="prose prose-blue max-w-none text-muted-foreground">
              <p>
                In today's digital world, a proactive security posture is
                non-negotiable. Our team of certified security professionals
                works to identify vulnerabilities before they can be exploited,
                ensuring your business stays secure and compliant.
              </p>
            </div>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/contact">Secure Your Business</Link>
            </Button>
          </div>
          <div className="flex items-center justify-center">
            <Image
              alt="Cyber Security"
              className="aspect-video w-full rounded-xl object-cover shadow-lg"
              height={450}
              src="https://picsum.photos/800/450"
              width={800}
              data-ai-hint="cyber security"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
