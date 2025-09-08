import Cta from '@/components/cta';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { QuickEnquiryForm } from '@/components/quick-enquiry-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div className="space-y-6">
                <div className="space-y-2">
                    <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                        CONTACT US
                    </div>
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get in Touch</h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                        Have a question or a project in mind? We'd love to hear from you. Fill out the form or contact us directly.
                    </p>
                </div>
                <div className="space-y-4 text-lg">
                    <div className="flex items-center gap-4">
                        <MapPin className="h-6 w-6 text-primary" />
                        <span>20/22 kannappan street, otteri, chennai 600012</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Mail className="h-6 w-6 text-primary" />
                        <a href="mailto:contact@cryol.com" className="hover:text-primary">contact@cryol.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Phone className="h-6 w-6 text-primary" />
                        <a href="tel:+911234520120" className="hover:text-primary">(+91) 12345 20120</a>
                    </div>
                </div>
              </div>
              <Card className="shadow-2xl bg-card rounded-2xl">
                <CardHeader>
                    <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>We'll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                    <QuickEnquiryForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
