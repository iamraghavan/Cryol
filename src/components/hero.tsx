import { Button } from '@/components/ui/button';
import { QuickEnquiryForm } from './quick-enquiry-form';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/img/H-Cybersecurity.webp"
          alt="Cybersecurity background"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
          priority
          data-ai-hint="cybersecurity abstract"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 hero-content text-center">
        <div className="flex flex-col justify-center items-center space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-shadow-lg font-headline">
            Pioneering Secure Digital Solutions in{' '}
            <TypeAnimation
              sequence={[
                'Application Development',
                1500,
                'Cloud Services',
                1500,
                'Cyber Security',
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="text-primary block md:inline"
              repeat={Infinity}
            />
          </h1>
          <p className="max-w-[700px] text-gray-200 md:text-xl text-shadow mx-auto">
            We deliver innovative and secure technology services to drive growth, efficiency, and protect your digital assets.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/services">
                  Explore Our Services
                </Link>
              </Button>
               <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white hover:text-black border-2 border-white">
                <Link href="/get-a-quote">
                  Get a Quote <ArrowRight className="ml-2" />
                </Link>
              </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
