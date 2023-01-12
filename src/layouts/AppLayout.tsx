import { AnimatePresence } from 'framer-motion'
import { useLockBodyScroll } from 'react-use'
import { useUI } from '../hooks/useUI'
import Logo from '../components/Logo'
import Nav from '../components/Nav'
import { ReactNode } from 'react'
import Modal from '../components/ui/Modal'
import Sidebar from '../components/Sidebar'
import { Toaster } from 'react-hot-toast'
import ExternalLink from '../components/ui/ExternalLink'

const ModalUI = () => {
  const { toggleViewingModal, viewingModal, modalView } = useUI()
  return (
    <Modal
      isOpen={viewingModal}
      onDismiss={() => toggleViewingModal(false)}
    ></Modal>
  )
}

const SidebarUI = () => {
  const { viewingSidebar } = useUI()
  useLockBodyScroll(viewingSidebar)
  return (
    <AnimatePresence mode="wait">
      {viewingSidebar && <Sidebar />}
    </AnimatePresence>
  )
}

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="sr-only">
        skip to main content
      </a>
      <Toaster position="bottom-right" containerClassName="mb-12" />
      <SidebarUI />
      <header className=" z-20 " id="header">
        <Nav />
      </header>

      <main className="flex h-full w-full flex-grow flex-col" id="main">
        {children}
      </main>
      <footer
        id="footer"
        className=" flex  px-3   pt-12 pb-1  text-left text-sm text-gray-400"
        aria-labelledby="footer-heading"
      >
        <p className="">
          &copy; {new Date().getFullYear()} Lumen Limitless. All rights
          reserved.
        </p>
        <ExternalLink
          href="https://github.com/lumen-limitless/nft-example-app"
          className="ml-auto"
        >
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
        </ExternalLink>
      </footer>
    </>
  )
}
