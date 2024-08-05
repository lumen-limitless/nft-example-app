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
    link: 'https://testnets.opensea.io/collection/nft-example-60',
    icon: <Icon icon="simple-icons:opensea" />,
  },
  {
    name: 'etherscan',
    link: 'https://sepolia.etherscan.io/address/0x9D6Fdf3eFd7b7419ADd7a157E42d1EA3a2Be4856#readContract',
    icon: (
      <svg
        width="14"
        height="14"
        viewBox="0 0 122 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M25.29 57.9139C25.2901 57.2347 25.4244 56.5623 25.6851 55.9352C25.9458 55.308 26.3278 54.7386 26.8092 54.2595C27.2907 53.7804 27.8619 53.4011 28.4903 53.1434C29.1187 52.8858 29.7918 52.7548 30.471 52.7579L39.061 52.7859C40.4305 52.7859 41.744 53.33 42.7124 54.2984C43.6809 55.2669 44.225 56.5803 44.225 57.9499V90.4299C45.192 90.1429 46.434 89.8369 47.793 89.5169C48.737 89.2952 49.5783 88.761 50.1805 88.0009C50.7826 87.2409 51.1102 86.2996 51.11 85.3299V45.0399C51.11 43.6702 51.654 42.3567 52.6224 41.3881C53.5908 40.4195 54.9043 39.8752 56.274 39.8749H64.881C66.2506 39.8752 67.5641 40.4195 68.5325 41.3881C69.5009 42.3567 70.045 43.6702 70.045 45.0399V82.4329C70.045 82.4329 72.2 81.5609 74.299 80.6749C75.0787 80.3452 75.7441 79.7931 76.2122 79.0877C76.6803 78.3822 76.9302 77.5545 76.931 76.7079V32.1299C76.931 30.7605 77.4749 29.4472 78.4431 28.4788C79.4113 27.5103 80.7245 26.9662 82.0939 26.9659H90.701C92.0706 26.9659 93.384 27.51 94.3525 28.4784C95.3209 29.4468 95.865 30.7603 95.865 32.1299V68.8389C103.327 63.4309 110.889 56.9269 116.89 49.1059C117.761 47.9707 118.337 46.6377 118.567 45.2257C118.797 43.8138 118.674 42.3668 118.209 41.0139C115.431 33.0217 111.016 25.6973 105.245 19.5096C99.474 13.3218 92.4749 8.40687 84.6955 5.07934C76.9161 1.75182 68.5277 0.0849617 60.0671 0.185439C51.6065 0.285917 43.2601 2.15152 35.562 5.66286C27.8638 9.17419 20.9834 14.2539 15.3611 20.577C9.73881 26.9001 5.49842 34.3272 2.91131 42.3832C0.324207 50.4391 -0.552649 58.9464 0.336851 67.3607C1.22635 75.775 3.86263 83.911 8.07696 91.2479C8.81111 92.5135 9.89118 93.5434 11.1903 94.2165C12.4894 94.8896 13.9536 95.178 15.411 95.0479C17.039 94.9049 19.066 94.7019 21.476 94.4189C22.5251 94.2998 23.4937 93.7989 24.1972 93.0116C24.9008 92.2244 25.2901 91.2058 25.291 90.1499L25.29 57.9139Z"
          fill="white"
        />
        <path
          d="M25.1021 110.009C34.1744 116.609 44.8959 120.571 56.0802 121.456C67.2646 122.34 78.4757 120.114 88.4731 115.022C98.4705 109.93 106.864 102.172 112.726 92.6059C118.587 83.0395 121.688 72.0381 121.685 60.8188C121.685 59.4188 121.62 58.0337 121.527 56.6567C99.308 89.7947 58.2831 105.287 25.104 110.004"
          fill="#8B8B8B"
        />
      </svg>
    ),
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
