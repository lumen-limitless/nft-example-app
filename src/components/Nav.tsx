import Link from 'next/link'
import ExternalLink from './ui/ExternalLink'
import Logo from './Logo'
import { Icon } from '@iconify/react'
import Button from './ui/Button'
import { clsx } from 'clsx'
import { useUI } from '../hooks/useUI'
import { ConnectKitButton } from 'connectkit'

const social = [
  {
    name: 'twitter',
    link: '',
    icon: 'akar-icons:twitter-fill',
  },
  {
    name: 'discord',
    link: '',
    icon: 'akar-icons:discord-fill',
  },
  {
    name: 'instagram',
    link: '',
    icon: 'akar-icons:instagram-fill',
  },
  {
    name: 'opensea',
    link: 'https://opensea.io/',
    icon: 'simple-icons:opensea',
  },
]

export default function Nav() {
  const { toggleViewingSidebar } = useUI()

  return (
    <>
      <nav className=" mx-auto  w-full max-w-7xl px-6  py-12 md:px-9 lg:px-12">
        <div className="relative flex h-12 items-center justify-between">
          <Logo />

          <div className="hidden flex-1 items-center justify-center sm:flex sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href={'/'}
                className={clsx(
                  'border-b-2 border-blue-800',
                  'inline-flex w-10 items-center  justify-center p-1  text-sm font-medium text-gray-100 hover:text-gray-300'
                )}
              >
                Home
              </Link>
            </div>
          </div>

          <div className="relative flex  items-center  gap-6 ">
            <div className=" hidden justify-evenly gap-3 md:flex">
              {social.map((s, i) => (
                <Button key={i} size="sm">
                  <ExternalLink href={s.link} alt={s.name}>
                    <Icon icon={s.icon} height={24} />
                  </ExternalLink>
                </Button>
              ))}
            </div>

            <ConnectKitButton />

            <Button
              className="sm:hidden"
              id="menu"
              size="none"
              onClick={() => toggleViewingSidebar()}
            >
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
            </Button>
          </div>
        </div>
      </nav>
    </>
  )
}
