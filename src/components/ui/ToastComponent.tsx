import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import toast, { Toast } from 'react-hot-toast'
import cn from 'clsx'
import { Icon } from '@iconify/react'

interface Props {
  t: Toast
  type: string
  message: string
}
export default function ToastComponent({ t, type, message }: Props) {
  return (
    <>
      <Transition
        show={t.visible}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className={cn(
            ' pointer-events-auto w-72 overflow-hidden rounded-xl  bg-opacity-80 bg-gradient-to-r from-blue-800 to-pink-800 shadow-lg ring-1 ring-black ring-opacity-5'
          )}
        >
          <div className="p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {type === 'success' ? (
                  <Icon
                    icon="eva:checkmark-circle-2-outline"
                    className="h-6 w-6 text-white"
                    aria-hidden
                  />
                ) : type === 'error' ? (
                  <Icon
                    icon="bx:error-alt"
                    className="h-6 w-6 text-white"
                    aria-hidden
                  />
                ) : type === 'info' ? (
                  <Icon
                    icon="ant-design:info-circle-outlined"
                    className="h-6 w-6 text-white"
                    aria-hidden
                  />
                ) : null}
              </div>
              <div className="ml-3 w-0 flex-1 ">
                <p className="text-sm text-white">{message}</p>
              </div>
              <div className="ml-4 flex flex-shrink-0">
                <button
                  className="inline-flex rounded-md text-white hover:brightness-75 "
                  onClick={() => toast.dismiss(t.id)}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    role="img"
                    width="24"
                    height="24"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8L4.646 5.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
