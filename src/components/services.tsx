'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  AppWindow,
  Cloud,
  ShieldCheck,
  Fingerprint,
  Megaphone,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
};

const services: Service[] = [
  {
    icon: AppWindow,
    title: 'Application Development',
    description:
      'Building custom, scalable applications to streamline operations and enhance user experiences.',
    link: '/services/application-development',
  },
  {
    icon: Cloud,
    title: 'Cloud Services',
    description:
      'Delivering secure, flexible cloud solutions to optimize performance and scalability.',
    link: '/services/cloud-services',
  },
  {
    icon: ShieldCheck,
    title: 'Cyber Security',
    description:
      'Protecting your assets with advanced security measures and proactive threat management.',
    link: '/services/cyber-security',
  },
  {
    icon: Fingerprint,
    title: 'Cyber Forensics',
    description:
      'Investigating digital incidents with evidence-driven analysis for compliance and security.',
    link: '/services/cyber-forensics',
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description:
      'Driving growth with strategic, data-driven marketing campaigns tailored to your audience.',
    link: '/services/digital-marketing',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = cardsRef.current.filter(c => c !== null) as HTMLDivElement[];
    
    // Staggered animation for cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });

    tl.fromTo(cards, 
      { autoAlpha: 0, y: 50 }, 
      { 
        autoAlpha: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.2, // Stagger the animation by 0.2s
        ease: 'power3.out'
      }
    );
    
    // Hover effect for cards
    cards.forEach((card) => {
      const hoverTl = gsap.timeline({ paused: true });
      hoverTl.to(card, { y: -10, scale: 1.03, duration: 0.3, ease: 'power1.out' });
      
      card.addEventListener('mouseenter', () => hoverTl.play());
      card.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
      cards.forEach((card) => {
        // You might need a more robust way to remove listeners if they have complex logic
      });
    };
  }, []);
  
  return (
    <section id="services" className="w-full bg-background py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              OUR SERVICES
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Empowering Your Digital Future
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a comprehensive suite of IT services designed to meet the
              demands of the modern digital landscape.
            </p>
          </div>
        </div>
        <div ref={containerRef} className="mx-auto mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={service.title}
              ref={el => cardsRef.current[index] = el}
              className="invisible" // Start as invisible for GSAP
            >
              <Card
                className="flex flex-col h-full overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-3">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <div className="bg-secondary/50 p-4 mt-auto">
                  <Button asChild variant="link" className="text-primary">
                    <Link href={service.link}>
                      Discover Now &rarr;
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
