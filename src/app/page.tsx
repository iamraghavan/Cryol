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

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Ensure GSAP animations run only after the page is fully loaded to avoid layout shifts.
    const runAnimations = () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.hero-content',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      // Fade in sections on scroll
      const sections = ['#services', '#about', '#technology', '#testimonials', '#cta'];
      sections.forEach((section) => {
        const el = document.querySelector(section);
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
            }
          );
        }
      });
    };
    
    // Check if the document is already loaded
    if (document.readyState === 'complete') {
        runAnimations();
    } else {
        window.addEventListener('load', runAnimations);
    }

    return () => {
      window.removeEventListener('load', runAnimations);
      // Kill all scroll triggers and timelines
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
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
