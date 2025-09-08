import {
  ShieldCheck,
  ScanLine,
  Network,
  CloudCog,
  Smartphone,
  Router,
  Target,
  FlaskConical,
  FileText,
  ShieldAlert,
} from 'lucide-react';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';

const features = [
  {
    icon: ScanLine,
    title: 'Web App Pentesting',
    description:
      'We identify and exploit vulnerabilities in your web applications before attackers do.',
  },
  {
    icon: Network,
    title: 'API Pentesting',
    description:
      'Our team secures your APIs by testing for flaws in authentication, authorization, and data handling.',
  },
  {
    icon: CloudCog,
    title: 'External Network Pentesting',
    description:
      'We simulate real-world attacks on your network perimeter to uncover and fix security gaps.',
  },
  {
    icon: Smartphone,
    title: 'Cloud Security Assessment',
    description:
      'Protect your cloud infrastructure with our in-depth security assessments for AWS, Azure, and GCP.',
  },
  {
    icon: Router,
    title: 'Mobile App Pentesting',
    description:
      'We analyze your iOS and Android applications to find and eliminate security weaknesses.',
  },
  {
    icon: Target,
    title: 'IoT Pentesting',
    description:
      'Our IoT penetration testing secures your connected devices from a wide range of cyber threats.',
  },
];

const methodologySteps = [
    {
        icon: Target,
        title: "Planning & Scoping",
        description: "We work with you to define the scope, objectives, and rules of engagement for the penetration test."
    },
    {
        icon: ScanLine,
        title: "Reconnaissance & Scanning",
        description: "Our team gathers intelligence and scans your systems to identify potential vulnerabilities and attack vectors."
    },
    {
        icon: FlaskConical,
        title: "Gaining Access & Exploitation",
        description: "We simulate a real attack by attempting to exploit the identified vulnerabilities to gain access to your systems."
    },
    {
        icon: FileText,
        title: "Analysis & Reporting",
        description: "We provide a detailed report with our findings, risk analysis, and actionable recommendations for remediation."
    }
];

const whyChooseUsPoints = [
    "Certified and experienced ethical hackers",
    "Comprehensive and customized testing methodologies",
    "Actionable reports with clear remediation guidance",
    "Adherence to industry standards like OWASP and NIST",
    "Confidential and secure engagement process",
];


export default function CyberSecurityPage() {
  const service = {
    title: 'Cyber Security',
    description:
      'Protect your digital assets with our comprehensive cybersecurity services. We offer everything from threat assessment and penetration testing to 24/7 monitoring and incident response.',
    icon: ShieldCheck,
    imageUrl: 'https://img.freepik.com/free-photo/standard-quality-control-collage-concept_23-2149595831.jpg',
    imageHint: 'cyber security concept'
  };

  return (
    <ServicePage
      service={service}
      features={features}
      featuresTitle="Our Penetration Testing Services"
      contactComponent={
        <Card className="p-8 shadow-lg">
          <QuoteForm />
        </Card>
      }
    >
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Our Pentesting Methodology
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              We follow a structured and proven methodology to ensure thorough and effective penetration testing.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {methodologySteps.map((step, index) => (
              <Card key={index} className="text-center p-6 shadow-md">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                <h3 className="text-xl font-bold font-headline">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-secondary">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <div className="space-y-6">
                     <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4" /> Why Choose Us
                     </div>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Your Trusted Partner in Cybersecurity
                    </h2>
                    <p className="text-muted-foreground md:text-xl/relaxed">
                        We are committed to providing you with the highest quality of service and expertise to protect your organization from cyber threats.
                    </p>
                    <ul className="space-y-4">
                        {whyChooseUsPoints.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <Check className="h-6 w-6 text-primary mr-4 mt-1 shrink-0" />
                                <span className="text-lg text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="flex items-center justify-center">
                    <img
                        alt="Cybersecurity team"
                        className="rounded-xl object-cover shadow-2xl"
                        height={500}
                        src="https://picsum.photos/600/500"
                        width={600}
                        data-ai-hint="security team meeting"
                    />
                </div>
            </div>
          </div>
      </section>

    </ServicePage>
  );
}
