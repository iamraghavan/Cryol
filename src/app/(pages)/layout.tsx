import Footer from '@/components/footer';
import Header from '@/components/header';
export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return <><Header /><main id="main-content">{children}</main><Footer /></>;
}
