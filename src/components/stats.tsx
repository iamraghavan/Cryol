'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Download, Copy, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const brochures = [
  {
    name: 'Company Brochure 2024',
    file: '/brochures/cryol-company-brochure.pdf',
    sha256: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
    description: 'Download our brochure to get a detailed overview of our services and capabilities.',
  },
];

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: 'Copied!',
      description: 'SHA-256 hash copied to clipboard.',
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleCopy}
      aria-label="Copy SHA-256 hash"
    >
      <Copy className="h-4 w-4" />
    </Button>
  );
};

export default function Stats() {
  const brochure = brochures[0]; // Assuming there is always one main brochure

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-grow">
          <CardTitle>{brochure.name}</CardTitle>
          <CardDescription>{brochure.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
            <h4 className="text-sm font-medium">SHA-256 Hash</h4>
            <div className="flex items-center gap-2 rounded-md bg-muted p-2">
                <p className="flex-grow font-mono text-xs text-muted-foreground truncate">
                    {brochure.sha256}
                </p>
                <CopyButton textToCopy={brochure.sha256} />
            </div>
            <p className="text-xs text-muted-foreground">
                Verify the integrity of the downloaded file using this hash.
            </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" asChild>
          <a href={brochure.file} target="_blank" rel="noopener noreferrer">
            <Eye className="mr-2" />
            View
          </a>
        </Button>
        <Button asChild>
          <a href={brochure.file} download>
            <Download className="mr-2" />
            Download
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
