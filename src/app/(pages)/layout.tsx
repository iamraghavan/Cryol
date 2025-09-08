import Breadcrumbs from '@/components/breadcrumbs';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <Breadcrumbs />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
