import About from '@/components/about';
import Cta from '@/components/cta';
import Footer from '@/components/footer';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from '@/components/services';
import Technology from '@/components/technology';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <About />
        <Technology />
        <Cta />
      </main>
      <Footer />
    </div>
  );
}
