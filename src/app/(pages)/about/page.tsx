import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CheckCircle, Zap, Shield, Goal, Star, Code } from 'lucide-react';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Technology from '@/components/technology';
import Cta from '@/components/cta';
import Image from 'next/image';

const features = [
  {
    icon: Zap,
    title: 'Offensive Mindset',
    description:
      'We adopt an offensive mindset, leveraging advanced cybersecurity methods to proactively identify security risks before they escalate.',
  },
  {
    icon: Goal,
    title: 'Result-Oriented',
    description:
      'Our approach is centered around your needs. We collaborate closely to customize pentesting solutions that address your specific requirements.',
  },
  {
    icon: Star,
    title: 'High-Quality Service',
    description:
      'We are committed to delivering exceptional service, consistently meeting the highest standards and striving to exceed your expectations.',
  },
  {
    icon: Code,
    title: 'Technology-Agnostic',
    description:
      'We select the most suitable tools and methodologies for each client, providing the best possible outcomes for your security.',
  },
];

const faqs = [
  {
    question: "What is Cryol's mission?",
    answer:
      "Cryol's mission is to enable organizations with data-driven, creative, and safe digital solutions, empowering businesses to achieve their goals through cutting-edge technology.",
  },
  {
    question: "What drives Cryol's vision?",
    answer:
      "Our vision is to be a global leader in IT services, fostering a safer and more efficient digital world. We are driven by integrity, innovation, and a commitment to delivering evidence-driven results that set new industry standards.",
  },
  {
    question: 'What services does Cryol offer?',
    answer:
      'Cryol offers a comprehensive suite of IT services, including Application Development, Cloud Services, Cyber Security, Cyber Forensics, and Digital Marketing. We provide solutions that are secure, scalable, and tailored to your business needs.',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  About Cryol
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                  Empowering organizations with data-driven, secure and
                  innovative digital solutions
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Leading digital transformation with integrity, innovation, and
                  evidence-driven solutions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Card className="flex-1">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                      Experience
                    </CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5+ Years</div>
                    <p className="text-xs text-muted-foreground">
                      in the IT industry
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                alt="Our Team"
                className="rounded-xl object-cover shadow-2xl"
                height={500}
                src="https://picsum.photos/600/500"
                width={600}
                data-ai-hint="team working"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Our Approach
              </div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl font-headline">
                Our Unique Methods
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our unique methods are designed to provide businesses with
                customized and high-quality cybersecurity solutions.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold font-headline">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
               <div className="space-y-2 mb-6">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    FAQ
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                    Frequently Asked Questions
                  </h2>
               </div>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
             <div className="flex items-center justify-center">
              <Image
                alt="FAQ"
                className="rounded-xl object-cover shadow-2xl"
                height={500}
                src="https://picsum.photos/600/500"
                width={600}
                data-ai-hint="question mark"
              />
            </div>
          </div>
        </div>
      </section>

      <Technology />
      <Cta />
    </>
  );
}
