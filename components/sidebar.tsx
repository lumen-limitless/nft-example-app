import { useUI } from '@/lib/hooks/useUI';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import { useClickAway } from 'react-use';
import { Button } from './ui/button';

export default function Sidebar() {
  const { pathname } = useRouter();
  const mobileNavRef = useRef(null);
  const { toggleViewingSidebar } = useUI();
  useClickAway(mobileNavRef, () => {
    toggleViewingSidebar(false);
  });

  return (
    <>
      <motion.nav
        ref={mobileNavRef}
        initial={{ opacity: 0, translateX: '100%' }}
        animate={{ opacity: 1, translateX: '0%' }}
        exit={{ opacity: 0, translateX: '100%' }}
        transition={{ ease: 'easeOut', duration: 0.33 }}
        className="fixed right-0 top-0 z-40 h-screen w-[75vw] bg-black/20 backdrop-blur-md"
      >
        <div className="relative flex h-full w-full flex-col gap-3 pt-36">
          <Button
            className="absolute right-6 top-14 z-50 sm:hidden"
            id="menu"
            onClick={() => toggleViewingSidebar()}
          >
            <span className="sr-only">Close menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width={24}
              height={24}
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </Button>

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
      </motion.nav>
    </>
  );
}
