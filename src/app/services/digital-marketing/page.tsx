import Footer from '@/components/footer';
import Header from '@/components/header';
import { Button } from '@/components/ui/button';
import { Megaphone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function DigitalMarketingPage() {
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
                    <Megaphone className="h-4 w-4" />
                    Our Services
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Digital Marketing
                  </h1>
                </div>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Drive growth and reach your target audience with our strategic, data-driven digital marketing campaigns. From SEO and PPC to social media and content marketing, we've got you covered.
                </p>
                <div className="prose prose-blue max-w-none text-muted-foreground">
                  <p>
                    Our marketing experts work with you to understand your audience and create campaigns that deliver results. We focus on ROI and provide transparent reporting to track your success.
                  </p>
                </div>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/contact">Start a Campaign</Link>
                </Button>
              </div>
               <div className="flex items-center justify-center">
                <Image
                  alt="Digital Marketing"
                  className="aspect-video w-full object-cover rounded-xl shadow-lg"
                  height={450}
                  src="https://picsum.photos/800/450"
                  width={800}
                  data-ai-hint="marketing analytics"
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
