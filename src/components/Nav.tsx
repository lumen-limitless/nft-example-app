import Link from 'next/link'
import ExternalLink from './ui/ExternalLink'
import Logo from './Logo'
import { Icon } from '@iconify/react'
import Button from './ui/Button'
import { clsx } from 'clsx'
import { useEthers } from '@usedapp/core'
import { HOME_CHAINID, social } from '../constants'
import AccountInfo from './Account'
import { useUI } from '../hooks/useUI'

export default function Nav() {
  const { account, chainId, switchNetwork } = useEthers()
  const { setModalView, toggleViewingSidebar } = useUI()

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
                  'border-blue-800 border-b-2',
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

            {!account ? (
              <Button
                size="sm"
                color="blue"
                onClick={() => setModalView('connect')}
              >
                Connect Wallet
              </Button>
            ) : chainId !== HOME_CHAINID ? (
              <Button
                size="sm"
                color="yellow"
                onClick={() => switchNetwork(HOME_CHAINID)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="currentColor"
                    d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z"
                  />
                </svg>
                Switch Network
              </Button>
            ) : (
              <AccountInfo />
            )}

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
