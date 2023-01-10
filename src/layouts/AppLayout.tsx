import { AnimatePresence } from 'framer-motion'
import { useLockBodyScroll } from 'react-use'
import { useUI } from '../hooks/useUI'
import Logo from '../components/Logo'
import Nav from '../components/Nav'
import { ReactNode } from 'react'
import Modal from '../components/ui/Modal'
import Sidebar from '../components/Sidebar'
import { useAccount } from 'wagmi'
import { useToast } from '../hooks'
import { Toaster } from 'react-hot-toast'

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
        className=" text-secondary  flex flex-col  place-items-center pt-12 pb-4 text-center"
        aria-labelledby="footer-heading"
      >
        <Logo />

        <p className="">
          &copy; {new Date().getFullYear()} Lumen Limitless. All rights
          reserved.
        </p>
      </footer>
    </>
  )
}
