import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Fingerprint } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CyberForensicsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary flex items-center gap-2">
                    <Fingerprint className="h-4 w-4" />
                    Our Services
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Cyber Forensics
                  </h1>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  In the event of a security breach, our cyber forensics team is here to help. We provide expert digital investigation to uncover evidence, determine the impact, and support legal and recovery efforts.
                </p>
                <div className="prose prose-blue max-w-none text-muted-foreground">
                  <p>
                    Our certified investigators use state-of-the-art tools and techniques to perform evidence-driven analysis. We help you understand what happened, how it happened, and what to do next.
                  </p>
                </div>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Request an Investigation</Link>
                </Button>
              </div>
               <div className="flex items-center justify-center">
                <Image
                  alt="Cyber Forensics"
                  className="aspect-video w-full object-cover rounded-xl shadow-lg"
                  height={450}
                  src="https://picsum.photos/800/450"
                  width={800}
                  data-ai-hint="digital forensics"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
