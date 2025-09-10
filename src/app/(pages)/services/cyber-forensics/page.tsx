import { Fingerprint, Search, Shield, Database, FileText, Briefcase, Check, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import ServicePage from '@/components/service-page';
import { QuoteForm } from '@/components/quote-form';
import { Card } from '@/components/ui/card';


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

const processSteps = [
    {
        icon: Search,
        title: "1. Identification & Containment",
        description: "We rapidly identify the security incident and take immediate steps to contain the breach and prevent further damage."
    },
    {
        icon: Database,
        title: "2. Evidence Preservation & Collection",
        description: "Following strict chain-of-custody protocols, we collect and preserve all relevant digital evidence from affected systems."
    },
    {
        icon: Shield,
        title: "3. Analysis & Investigation",
        description: "Our forensic experts analyze the evidence to determine the attack vector, timeline, and scope of the breach."
    },
    {
        icon: FileText,
        title: "4. Reporting & Remediation",
        description: "We provide a comprehensive report of our findings and recommend actionable steps to remediate vulnerabilities and improve security."
    }
];

const whyChooseUsPoints = [
    "Certified and court-tested forensic investigators.",
    "Use of industry-standard tools and methodologies.",
    "Strict adherence to chain-of-custody procedures.",
    "Clear, concise, and actionable reporting.",
    "Experience across a wide range of industries and incident types.",
];


export default function CyberForensicsPage() {
  const service = {
    title: 'Cyber Forensics',
    description: 'In the event of a security breach, our cyber forensics team provides expert digital investigation to uncover evidence, determine the impact, and support legal and recovery efforts.',
    icon: Fingerprint,
    imageUrl: 'https://img.freepik.com/free-photo/girl-hacker-wearing-glasses-hoodie-while-stealing-personal-data-with-her-team_482257-20610.jpg',
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
    >
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center">
             <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                Our Process
              </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
              Our Forensic Investigation Process
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl/relaxed">
              We follow a meticulous and forensically sound process to ensure the integrity of evidence and deliver defensible results.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
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
                        Uncovering the Truth in the Digital Realm
                    </h2>
                    <p className="text-muted-foreground md:text-xl/relaxed">
                        When a security incident occurs, you need a partner you can trust to conduct a thorough and objective investigation.
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
                    <Image
                        alt="Cyber Forensics Team"
                        className="rounded-xl object-cover shadow-2xl"
                        height={500}
                        src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1080"
                        width={600}
                        data-ai-hint="team analyzing data"
                    />
                </div>
            </div>
          </div>
      </section>

    </ServicePage>
  );
}
