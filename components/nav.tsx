import { cn } from '@/lib/utils';
import { Icon } from '@iconify/react/dist/iconify.js';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import React from 'react';
import Logo from './logo';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const social = [
  {
    name: 'twitter',
    link: '',
    icon: <Icon icon="akar-icons:twitter-fill" />,
  },
  {
    name: 'discord',
    link: '',
    icon: <Icon icon="akar-icons:discord-fill" />,
  },
  {
    name: 'instagram',
    link: '',
    icon: <Icon icon="akar-icons:instagram-fill" />,
  },
  {
    name: 'opensea',
    link: 'https://opensea.io/',
    icon: <Icon icon="simple-icons:opensea" />,
  },
  {
    name: 'github',
    link: 'https://github.com/lumen-limitless',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
        />
      </svg>
    ),
  },
];

export const Nav: React.FC = () => {
  return (
    <>
      <nav className="z-50 w-full max-w-7xl px-6 py-12 md:px-9 lg:px-12">
        <div className="relative flex h-12 items-center justify-between">
          <Logo />

          <div className="hidden flex-1 items-center justify-center sm:flex sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={'/'}
                className={cn(
                  'border-b-2 border-blue-800',
                  'inline-flex w-10 items-center justify-center p-1 text-sm font-medium text-gray-100 hover:text-gray-300',
                )}
              >
                Home
              </Link>
            </div>
          </div>

          <div className="relative flex items-center gap-6">
            <div className="hidden justify-evenly gap-3 md:flex">
              {social.map((s, i) => (
                <Button variant={'outline'} key={i} size="sm">
                  <a href={s.link}>{s.icon}</a>
                </Button>
              ))}
            </div>

            <ConnectButton />
            <Sheet>
              <SheetTrigger className="sm:hidden" id="menu">
                <span className="sr-only">Open menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  width={24}
                  height={24}
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M21 18h-9v-2h9v2Zm0-5H3v-2h18v2Zm0-5H3V6h18v2Z"
                  />
                </svg>
              </SheetTrigger>

              <SheetContent className="border-none bg-black/20 px-0 backdrop-blur-md">
                <nav>
                  <div className="relative flex h-full w-full flex-col gap-3 pt-36">
                    <Link
                      href={'/'}
                      className={cn(
                        'border-l-2 border-blue-800',
                        'mx-auto inline-flex w-full items-center justify-center p-1 text-sm font-medium text-gray-100 hover:text-gray-300',
                      )}
                    >
                      Home
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};
