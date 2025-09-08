import type { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

type ServicePageProps = {
  service: Service;
  features: Feature[];
  featuresTitle?: string;
  children?: React.ReactNode;
  contactComponent?: React.ReactNode;
};

export default function ServicePage({
  service,
  features,
  featuresTitle = 'Key Features of Our Service',
  children,
  contactComponent,
}: ServicePageProps) {
  return (
    <>
      <section className="w-full bg-secondary py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Our Services
                </div>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                  {service.title}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  {service.description}
                </p>
              </div>
              <div className="flex items-center gap-4">
                 <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                <p className="text-lg font-semibold">{service.title}</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                alt={service.title}
                className="w-full max-w-2xl rounded-xl object-cover shadow-2xl"
                height={600}
                src={service.imageUrl}
                width={800}
                data-ai-hint={service.imageHint}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              {featuresTitle}
            </h2>
          </div>
          <div className="mx-auto mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {children}

      {contactComponent && (
         <section className="w-full py-12 md:py-24 bg-secondary">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="space-y-4">
                        <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                            GET A QUOTE
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl font-headline">
                          Ready to Secure Your Business?
                        </h2>
                        <p className="mt-4 text-muted-foreground md:text-xl/relaxed">
                          Fill out the form below to get a personalized quote for our top-tier services.
                        </p>
                    </div>
                    <div>
                        {contactComponent}
                    </div>
                </div>
            </div>
         </section>
      )}
    </>
  );
}
