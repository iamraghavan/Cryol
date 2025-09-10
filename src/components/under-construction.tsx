import { Construction } from 'lucide-react';

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <Construction className="w-24 h-24 text-primary mb-8" />
      <h1 className="text-4xl font-bold font-headline mb-4">
        Page Under Construction
      </h1>
      <p className="text-xl text-muted-foreground max-w-md">
        We're working hard to bring you something amazing. Please check back
        soon!
      </p>
    </div>
  );
}
