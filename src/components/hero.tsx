import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuickEnquiryForm } from './quick-enquiry-form';

export default function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              Expert IT Solutions
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Transform Your Business with Our Services. We provide cutting-edge
              technology solutions to drive growth, innovation, and efficiency.
            </p>
          </div>
          <Card className="shadow-2xl">
            <CardHeader>
              <CardTitle>Quick Enquiry</CardTitle>
              <CardDescription>
                Connect with us to explore our IT solutions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuickEnquiryForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
