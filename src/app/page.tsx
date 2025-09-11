'use client';

import About from '@/components/about';
import Cta from '@/components/cta';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Technology from '@/components/technology';
import Testimonials from '@/components/testimonials';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// 1

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(
      '.hero-content',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );

    // Fade in sections on scroll
    const sections = ['#services', '#about', '#technology', '#testimonials', '#cta'];
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      // Kill all scroll triggers and timelines
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      tl.kill();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Technology />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
