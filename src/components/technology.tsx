import {
  BurpSuiteIcon,
  NodeJsIcon,
  AzureIcon,
  PythonIcon,
} from './icons';

const technologies = [
  { name: 'BurpSuite', icon: BurpSuiteIcon },
  { name: 'Node.js', icon: NodeJsIcon },
  { name: 'Azure', icon: AzureIcon },
  { name: 'Python', icon: PythonIcon },
];

export default function Technology() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              OUR TECHNOLOGY
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Innovative Solutions
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We leverage cutting-edge technologies like BurpSuite, Node.js, Azure,
              and Python to deliver secure, scalable solutions for Application
              Development, Cloud Services, Cyber Security, and more.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-xl font-semibold">Technology Stack</h3>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
              {technologies.map(({ name, icon: Icon }) => (
                <div key={name} className="flex flex-col items-center gap-2">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary transition-all hover:bg-primary/10">
                    <Icon className="h-10 w-10 text-primary" />
                  </div>
                  <span className="font-medium">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
