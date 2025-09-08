
'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Download, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const brochures = [
  {
    name: 'Company Brochure 2024',
    file: '/brochures/cryol-company-brochure.pdf',
    sha256: 'a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2',
  },
];

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
    const { toast } = useToast();

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy);
        toast({
            title: "Copied!",
            description: "SHA-256 hash copied to clipboard.",
        });
    };

    return (
        <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Copy SHA-256</span>
        </Button>
    );
};

export default function Stats() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-foreground">Document</TableHead>
            <TableHead className="font-bold text-foreground">SHA-256</TableHead>
            <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures.map((brochure) => (
            <TableRow key={brochure.name}>
              <TableCell className="font-medium">{brochure.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground flex items-center gap-2">
                <span className='truncate'>{brochure.sha256}</span>
                <CopyButton textToCopy={brochure.sha256} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" asChild>
                  <a href={brochure.file} target="_blank" rel="noopener noreferrer">
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">View</span>
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <a href={brochure.file} download>
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                    </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
