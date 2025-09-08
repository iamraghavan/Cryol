import Services from '@/components/services';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Services />
      </main>
      <Footer />
    </div>
  );
}
