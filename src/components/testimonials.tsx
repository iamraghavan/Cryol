
'use client';

import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const testimonials = [
  {
    name: 'Ajay',
    role: 'Project Vendor',
    testimonial:
      'Working with Cryol has been a game-changer. Their expertise in application development and commitment to deadlines is unparalleled. They delivered a robust solution that exceeded our expectations.',
    avatar: 'https://ui-avatars.com/api/?name=Ajay&background=random',
    aiHint: 'man portrait',
  },
  {
    name: 'Mr. Udayakumar',
    role: 'Director, JAY VEE Groups',
    testimonial:
      'Cryol developed a comprehensive business website for us that has significantly improved our online presence. Their team is professional, creative, and highly skilled. I highly recommend their services.',
    avatar: 'https://ui-avatars.com/api/?name=Udayakumar&background=random',
    aiHint: 'businessman portrait',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-secondary py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              TESTIMONIALS
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline">
              What Our Clients Say
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We are trusted by businesses to deliver exceptional results.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                  <div className="p-1 h-full">
                    <Card
                      className="flex flex-col h-full rounded-2xl bg-card p-6 shadow-lg"
                    >
                      <CardHeader className="flex flex-row items-center gap-4 p-0 pb-6">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            data-ai-hint={testimonial.aiHint}
                          />
                          <AvatarFallback>
                            {testimonial.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-bold font-headline">{testimonial.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </CardHeader>
                      <CardContent className="relative p-0 flex-grow">
                        <Quote className="absolute -top-2 left-0 h-8 w-8 text-primary/20" />
                        <p className="pl-10 text-lg italic text-foreground">
                          {testimonial.testimonial}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 text-primary" />
            <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 text-primary" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
