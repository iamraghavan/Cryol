import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, Download } from 'lucide-react';

const brochures = [
  {
    name: 'Company Brochure 2024',
    file: '/brochures/cryol-company-brochure.pdf',
  },
];

export default function Stats() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold text-foreground">Document</TableHead>
            <TableHead className="text-right font-bold text-foreground">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {brochures.map((brochure) => (
            <TableRow key={brochure.name}>
              <TableCell className="font-medium">{brochure.name}</TableCell>
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
