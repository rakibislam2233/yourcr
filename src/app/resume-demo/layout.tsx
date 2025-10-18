import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function ResumeDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <Link href="/" className="font-bold text-xl">
            YourCr
          </Link>
          <nav className="flex items-center gap-4">
            <Link 
              href="/"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main>
        {children}
      </main>
      <footer className="border-t py-6 mt-12">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} YourCr Resume Demo. Built with Next.js, Framer Motion, and shadCN.
        </div>
      </footer>
    </div>
  );
}