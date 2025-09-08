import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Cta() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Ready to transform your business?
        </h2>
        <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">
          Let's build something amazing together. Get in touch with our experts
          today.
        </p>
        <div className="mt-6">
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
            <Link href="#contact">Get in Touch</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
