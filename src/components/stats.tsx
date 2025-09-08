import { Card, CardContent } from '@/components/ui/card';
import { ShieldCheck, Briefcase, ClipboardList, Users, Globe } from 'lucide-react';

const stats = [
  { icon: ShieldCheck, value: '12,099', label: 'Total No. Vulnerabilities', color: 'text-purple-500' },
  { icon: Briefcase, value: '4+', label: 'Years in Business', color: 'text-blue-500' },
  { icon: ClipboardList, value: '600+', label: 'Assessment Completed', color: 'text-yellow-500' },
  { icon: Users, value: '150+', label: 'Trusted Clients', color: 'text-green-500' },
  { icon: Globe, value: '21+', label: 'Countries Served', color: 'text-red-500' },
];

export default function Stats() {
  return (
    <Card className="bg-card/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              <stat.icon className={`h-8 w-8 shrink-0 ${stat.color}`} />
              <div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
