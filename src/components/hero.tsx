import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuickEnquiryForm } from './quick-enquiry-form';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

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
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 hero-content">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-shadow-lg font-headline">
              We are expert in{' '}
              <TypeAnimation
                sequence={[
                  'Application Development',
                  1000,
                  'Cloud Services',
                  1000,
                  'Cyber Security',
                  1000,
                  'Cyber Forensics',
                  1000,
                  'Digital Marketing',
                  1000,
                ]}
                wrapper="span"
                speed={50}
                className="text-primary"
                repeat={Infinity}
              />
            </h1>
            <p className="max-w-[600px] text-gray-200 md:text-xl text-shadow">
              Transform Your Business with Our Services. We provide cutting-edge
              technology solutions to drive growth, innovation, and efficiency.
            </p>
          </div>
          <Card className="bg-card/80 backdrop-blur-lg text-card-foreground rounded-2xl shadow-2xl border border-white/10">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Quick Enquiry
              </CardTitle>
              <CardDescription>
                Connect with us to explore our IT solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickEnquiryForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
