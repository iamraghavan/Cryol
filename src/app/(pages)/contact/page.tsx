import Cta from '@/components/cta';
import { QuickEnquiryForm } from '@/components/quick-enquiry-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Cryol, a leading IT services company in Chennai. Contact us for application development, cloud solutions, and cybersecurity services. Visit our office or send us a message.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Cryol | IT Services in Chennai',
    description: 'Reach out to our team in Chennai for expert IT solutions. Let\'s discuss your project today.',
    url: '/contact',
  },
};


export default function ContactPage() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  CONTACT US
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                  Get in Touch
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a question or a project in mind? We'd love to hear from
                  you. Fill out the form or contact us directly.
                </p>
              </div>
              <div className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span>20/22 kannappan street, otteri, chennai 600012</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <a href="mailto:contact@cryol.in" className="hover:text-primary">
                    contact@cryol.in
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <a href="tel:+919962310278" className="hover:text-primary">
                    +91 99623 10278
                  </a>
                </div>
              </div>
            </div>
            <Card className="rounded-2xl bg-card shadow-2xl">
              <CardHeader>
                <CardTitle className="font-headline">
                  Send Us a Message
                </CardTitle>
                <CardDescription>
                  We'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuickEnquiryForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="w-full bg-secondary/30 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.427845345919!2d80.24151447479719!3d13.072175913256956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52660a95555555%3A0x1634195155134e77!2sKannappan%20St%2C%20Otteri%2C%20Chennai%2C%20Tamil%20Nadu%20600012%2C%20India!5e0!3m2!1sen!2sus!4v1718886635569!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cryol Office Location on Google Maps"
            ></iframe>
          </div>
        </div>
      </section>
      <Cta />
    </>
  );
}
