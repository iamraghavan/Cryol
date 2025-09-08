import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { AppWindow } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AppDevPage() {
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
                    <AppWindow className="h-4 w-4" />
                    Our Services
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
                    Application Development
                  </h1>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We build custom, scalable, and secure applications to meet your business needs. From web to mobile, our team delivers high-quality solutions that streamline operations and enhance user experiences.
                </p>
                <div className="prose prose-blue max-w-none text-muted-foreground">
                  <p>
                    Our development process is agile and collaborative, ensuring that your final product is not only functional but also perfectly aligned with your strategic goals. We leverage modern technologies to build applications that are future-proof and ready to scale.
                  </p>
                </div>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
               <div className="flex items-center justify-center">
                <Image
                  alt="Application Development"
                  className="aspect-video w-full object-cover rounded-xl shadow-lg"
                  height={450}
                  src="https://picsum.photos/800/450"
                  width={800}
                  data-ai-hint="software development"
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
