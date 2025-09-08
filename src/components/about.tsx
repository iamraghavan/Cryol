import Image from 'next/image';
import { Card } from '@/components/ui/card';

export default function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex items-center justify-center">
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <Image
                alt="Our Mission"
                className="aspect-video w-full object-cover"
                height={450}
                src="https://picsum.photos/800/450"
                width={800}
                data-ai-hint="office collaboration"
              />
            </Card>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                WHO WE ARE
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Leading the Way in Digital Transformation
              </h2>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our mission is to enable organizations with data-driven, creative,
              and safe digital solutions. We strive to lead the world in digital
              transformation, being dependable for our honesty, originality, and
              output.
            </p>
            <div className="prose prose-blue max-w-none text-muted-foreground">
              <p>
                We specialize in application solutions that are not only
                innovative but also secure and scalable, ensuring your business
                stays ahead in the digital curve.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
