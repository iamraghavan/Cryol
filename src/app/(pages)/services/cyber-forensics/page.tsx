import { Fingerprint, Search, Shield, Database, FileText } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


const features = [
  {
    icon: Search,
    title: 'Incident Response',
    description: 'Our rapid response team helps you contain and mitigate security breaches, minimizing damage and recovery time.',
  },
  {
    icon: Shield,
    title: 'Digital Evidence Recovery',
    description: 'We use state-of-the-art techniques to recover and preserve digital evidence from various devices for legal and internal investigations.',
  },
  {
    icon: Database,
    title: 'Data Breach Analysis',
    description: 'Our experts analyze the scope and impact of data breaches, identifying the source and preventing future incidents.',
  },
    {
    icon: FileText,
    title: 'Expert Witness & Litigation Support',
    description: 'We provide clear, credible expert testimony and litigation support based on our forensic findings.',
  },
];


export default function CyberForensicsPage() {
  const service = {
    title: 'Cyber Forensics',
    description: 'In the event of a security breach, our cyber forensics team provides expert digital investigation to uncover evidence, determine the impact, and support legal and recovery efforts.',
    icon: Fingerprint,
    imageUrl: 'https://picsum.photos/1200/802',
    imageHint: 'digital forensics'
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
