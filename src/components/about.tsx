'use client';

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from './ui/button';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      image,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    ).fromTo(
      text,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.8'
    );
    
    return () => {
      tl.kill();
       ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === section) {
          trigger.kill();
        }
      });
    };

  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full py-12 md:py-24 lg:py-32 bg-secondary overflow-x-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div ref={imageRef} className="flex items-center justify-center">
            <Card className="overflow-hidden rounded-xl shadow-lg">
              <Image
                alt="Developer activity"
                className="aspect-video w-full object-cover"
                height={450}
                src="/assets/img/Developer--activity-pana.svg"
                width={800}
                data-ai-hint="office collaboration"
              />
            </Card>
          </div>
          <div ref={textRef} className="flex flex-col justify-center space-y-6">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                WHO WE ARE
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                Pioneering Digital Excellence in India and Beyond
              </h2>
            </div>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              At Cryol, our mission is simple: to empower your business with creative, secure, and data-driven digital solutions. We are your trusted partner for digital transformation, known for our integrity, innovation, and commitment to delivering results.
            </p>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Our Vision</AccordionTrigger>
                <AccordionContent>
                  To be a global leader in the IT services industry, creating a safer and more efficient digital world for businesses everywhere. We aim to set new standards for excellence and innovation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Our Approach</AccordionTrigger>
                <AccordionContent>
                  We believe in a collaborative approach, working closely with our clients to understand their unique challenges and goals. Our solutions are custom-built to be scalable, secure, and perfectly aligned with your business strategy.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Our Commitment</AccordionTrigger>
                <AccordionContent>
                  Your success is our top priority. We are committed to providing exceptional service and support, ensuring your business not only stays competitive but thrives in the ever-evolving digital landscape.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-4">
              <Button asChild size="lg">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
