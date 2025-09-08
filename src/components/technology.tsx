'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'BurpSuite', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/BurpSuite_logo.svg/600px-BurpSuite_logo.svg.png' },
  { name: 'Node.js', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' },
  { name: 'Azure', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg' },
  { name: 'Python', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg' },
  { name: 'Go', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg' },
  { name: 'Linux Foundation', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Linux_Foundation_logo_2013.svg' },
  { name: 'Arch Linux', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/13/Arch_Linux_%22Crystal%22_icon.svg' },
  { name: 'Kali Linux', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Kali-dragon-icon.svg' },
];

export default function Technology() {
  const techContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const techIcons = techContainerRef.current?.querySelectorAll('.tech-icon');
    if (!techIcons || techIcons.length === 0) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: techContainerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      techIcons,
      { opacity: 0, scale: 0.5 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: 0.2, // Stagger animation for each icon
      }
    );

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === techContainerRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section id="technology" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              OUR TECHNOLOGY
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
              Innovative Solutions
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We leverage cutting-edge technologies to deliver secure, scalable solutions for Application
              Development, Cloud Services, Cyber Security, and more.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-xl font-semibold font-headline">Technology Stack</h3>
            <div ref={techContainerRef} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {technologies.map(({ name, logoUrl }) => (
                <div key={name} className="tech-icon flex flex-col items-center gap-2 opacity-0">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary transition-all hover:bg-primary/10 p-2">
                    <Image src={logoUrl} alt={`${name} logo`} width={64} height={64} className="h-full w-full object-contain" />
                  </div>
                  <span className="font-medium text-center">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
