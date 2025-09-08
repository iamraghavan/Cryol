'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumbs = () => {
  const pathname = usePathname();

  // Don't show breadcrumbs on the homepage
  if (pathname === '/') {
    return null;
  }

  const pathSegments = pathname.split('/').filter((segment) => segment);

  // Function to capitalize and format segment names
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <section className="bg-secondary/50 py-4">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-2">
            <li className="inline-flex items-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
            </li>
            {pathSegments.map((segment, index) => {
              const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
              const isLast = index === pathSegments.length - 1;

              return (
                <li key={segment}>
                  <div className="flex items-center">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    <Link
                      href={href}
                      className={`ms-1 text-sm font-medium md:ms-2 ${
                        isLast
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                      aria-current={isLast ? 'page' : undefined}
                    >
                      {formatSegment(segment)}
                    </Link>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </section>
  );
};

export default Breadcrumbs;
