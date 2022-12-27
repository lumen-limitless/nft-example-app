import { Menu, Transition } from '@headlessui/react'
import { useEthers } from '@usedapp/core'
import React, { Fragment } from 'react'
import Avatar from './Avatar'
import cn from 'clsx'

export default function Account() {
  const { account, deactivate } = useEthers()

  return (
    <>
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="flex w-full items-center gap-1 rounded-full  transition hover:brightness-125">
            <>
              <span className="sr-only">Open user menu</span>
              <Avatar size={32} address={account} />
            </>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-900 py-1  shadow-lg focus:outline-none">
            <Menu.Item>
              {({ active }) => (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://opensea.io/account"
                  className={cn(
                    active ? 'bg-gray-800' : '',
                    'flex w-full gap-1 px-4 py-2 text-sm text-gray-300  transition'
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width={20}
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="currentColor"
                      d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5Zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3Z"
                    />
                    <path
                      fill="currentColor"
                      d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2Zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0Zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0Z"
                    />
                  </svg>{' '}
                  Your Profile
                </a>
              )}
            </Menu.Item>

            <button
              onClick={deactivate}
              className="flex w-full gap-1 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-800"
              title="disconnect"
              about="disconnect"
              id="disconnect"
            >
              <svg
                viewBox="0 0 24 24"
                className="fill-current text-red"
                width={20}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.3 8.09014C15.91 8.48014 15.91 9.10014 16.3 9.49014L18.2 11.3901H9C8.45 11.3901 8 11.8401 8 12.3901C8 12.9401 8.45 13.3901 9 13.3901H18.2L16.3 15.2901C15.91 15.6801 15.91 16.3001 16.3 16.6901C16.69 17.0801 17.31 17.0801 17.7 16.6901L21.29 13.1001C21.68 12.7101 21.68 12.0801 21.29 11.6901L17.7 8.09014C17.31 7.70014 16.69 7.70014 16.3 8.09014ZM4 19.3901H11C11.55 19.3901 12 19.8401 12 20.3901C12 20.9401 11.55 21.3901 11 21.3901H4C2.9 21.3901 2 20.4901 2 19.3901V5.39014C2 4.29014 2.9 3.39014 4 3.39014H11C11.55 3.39014 12 3.84014 12 4.39014C12 4.94014 11.55 5.39014 11 5.39014H4V19.3901Z"></path>
              </svg>{' '}
              Disconnect
            </button>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
}
