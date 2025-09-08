import { Megaphone, Search, BarChart, Users, Mail } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const features = [
  {
    icon: Search,
    title: 'Search Engine Optimization (SEO)',
    description: 'Increase your organic visibility and drive targeted traffic with our proven SEO strategies.',
  },
  {
    icon: BarChart,
    title: 'Pay-Per-Click (PPC) Advertising',
    description: 'We create and manage high-ROI PPC campaigns on Google Ads and social media to deliver immediate results.',
  },
  {
    icon: Users,
    title: 'Social Media Marketing',
    description: 'Build your brand and engage with your audience through strategic social media management and content creation.',
  },
    {
    icon: Mail,
    title: 'Email & Content Marketing',
    description: 'Nurture leads and drive conversions with compelling content and targeted email marketing campaigns.',
  },
];


export default function DigitalMarketingPage() {
  const service = {
    title: 'Digital Marketing',
    description: 'Drive growth and reach your target audience with our strategic, data-driven digital marketing campaigns. From SEO and PPC to social media and content marketing, we’ve got you covered.',
    icon: Megaphone,
    imageUrl: 'https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg',
    imageHint: 'digital marketing people'
  };

  return (
    <ServicePage
      service={service}
      features={features}
      contactComponent={
        <Card className="p-8 shadow-lg">
          <QuoteForm />
        </Card>
      }
    />
  );
}
