import Main from '@/app/main';
import { Nav } from '@/components/nav';
import { cn } from '@/lib/utils';
import '@rainbow-me/rainbowkit/styles.css';
import { Viewport } from 'next';
import { Roboto } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import Providers from './providers';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const viewport: Viewport = {
  themeColor: '#000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>

      <body
        style={{
          textRendering: 'optimizeLegibility',
        }}
        className={cn(
          roboto.className,
          'flex min-h-screen touch-manipulation flex-col antialiased',
        )}
      >
        <Providers>
          <a
            href="#main"
            className="sr-only absolute left-[-999px] top-[-999px] block border bg-[#ffc] text-black focus:not-sr-only focus:bottom-0 focus:top-0 focus:border-[#990000]"
            aria-label="skip"
            id="skip"
          >
            Skip Content
          </a>

          <Toaster />

          <header className="z-20" id="header">
            <Nav />
          </header>

          <Main>{children}</Main>

          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  );
}

const TailwindIndicator = () => {
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-0 left-0 z-50 bg-black p-2 font-mono text-sm text-white">
      <span className="block sm:hidden">XS</span>
      <span className="hidden sm:block md:hidden">SM</span>
      <span className="hidden md:block lg:hidden">MD</span>
      <span className="hidden lg:block xl:hidden">LG</span>
      <span className="hidden xl:block 2xl:hidden">XL</span>
      <span className="3xl:hidden hidden 2xl:block">2XL</span>
      <span className="3xl:block hidden">3XL</span>
    </div>
  );
};
