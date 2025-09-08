import Footer from '@/components/footer';
import Header from '@/components/header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    title: 'The Future of Cloud Computing',
    description: 'An in-depth look at the trends shaping the cloud industry in 2024 and beyond.',
    image: 'https://picsum.photos/600/400',
    author: 'Jane Doe',
    authorImage: 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
    date: 'Oct 26, 2023',
    href: '#',
    aiHint: 'cloud data'
  },
  {
    title: 'Top 5 Cybersecurity Threats to Watch Out For',
    description: 'Stay ahead of cyber threats with our expert analysis of the most pressing security risks.',
    image: 'https://picsum.photos/600/400',
    author: 'John Smith',
    authorImage: 'https://i.pravatar.cc/40?u=a042581f4e29026704e',
    date: 'Oct 22, 2023',
    href: '#',
    aiHint: 'hacker code'
  },
  {
    title: 'A Guide to Agile Application Development',
    description: 'Learn how the agile methodology can transform your development lifecycle.',
    image: 'https://picsum.photos/600/400',
    author: 'Alice Johnson',
    authorImage: 'https://i.pravatar.cc/40?u=a042581f4e29026704f',
    date: 'Oct 19, 2023',
    href: '#',
    aiHint: 'team meeting'
  },
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">From Our Blog</h1>
            <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Latest industry insights, articles, and news from our team of experts.
            </p>
          </div>
          <div className="mx-auto mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.title} className="flex flex-col overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-primary/20">
                <Link href={post.href} className="flex flex-col h-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="w-full object-cover"
                    data-ai-hint={post.aiHint}
                  />
                  <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{post.description}</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4 mt-auto pt-4">
                    <Avatar>
                      <AvatarImage src={post.authorImage} alt={post.author} />
                      <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
