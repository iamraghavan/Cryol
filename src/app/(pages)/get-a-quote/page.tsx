import { QuoteForm } from '@/components/quote-form';
import Stats from '@/components/stats';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description: 'Request a personalized quote for Cryol\'s IT services in Chennai. Fill out our form for application development, cybersecurity, cloud services, and more. Get a free consultation today.',
  alternates: {
    canonical: '/get-a-quote',
  },
  openGraph: {
    title: 'Get a Free Quote for IT Services in Chennai | Cryol',
    description: 'Protect your business and drive growth. Request a personalized quote from our expert team in Chennai.',
    url: '/get-a-quote',
  },
};


export default function GetAQuotePage() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col space-y-8">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                GET A QUOTE
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                Want To Protect Your Organization from Emerging Cyber Threats?
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Now is the perfect time to stay one step ahead of evolving cyber
                threats by taking proactive security measures. Fill out the form,
                and our expert pentesters will help you identify and address

                vulnerabilities before they escalate.
              </p>
            </div>
            <Stats />
          </div>
          <div className="bg-card p-8 rounded-2xl shadow-lg">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
