import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuickEnquiryForm } from './quick-enquiry-form';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://onlinedegrees.sandiego.edu/wp-content/uploads/2022/01/USD-Cyber-How-to-Become-a-Cybersecurity-Specialist-Career-Salary-Guide_cover.jpg"
          alt="Cybersecurity background"
          fill
          style={{objectFit: 'cover'}}
          quality={100}
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      <div className="container relative z-10 mx-auto px-4 md:px-6 hero-content">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-shadow-lg">
              Expert IT Solutions
            </h1>
            <p className="max-w-[600px] text-gray-200 md:text-xl text-shadow">
              Transform Your Business with Our Services. We provide cutting-edge
              technology solutions to drive growth, innovation, and efficiency.
            </p>
          </div>
          <Card className="shadow-2xl bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-2xl transform transition-transform duration-500 hover:scale-105 hover:shadow-cyan-500/50" style={{'--tw-shadow-color': 'hsl(var(--primary))'}}>
            <CardHeader>
              <CardTitle className="text-white">Quick Enquiry</CardTitle>
              <CardDescription className="text-gray-300">
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
