import About from '@/components/about';
import Footer from '@/components/footer';
import Header from '@/components/header';

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <About />
      </main>
      <Footer />
    </div>
  );
}
