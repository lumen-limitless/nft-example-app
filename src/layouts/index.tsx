import dynamic from 'next/dynamic'
import { AnimatePresence } from 'framer-motion'
import { useLockBodyScroll } from 'react-use'
import { useNetworkNotifications } from '../hooks/useNetworkNotifications'
import { useUI } from '../hooks/useUI'
import Logo from '../components/Logo'
import Nav from '../components/Nav'
import { ReactNode } from 'react'

const Toaster = dynamic(() =>
  import('react-hot-toast').then((mod) => mod.Toaster)
)
const Sidebar = dynamic(() => import('../components/Sidebar'))
const Modal = dynamic(() => import('../components/ui/Modal'))
const Connect = dynamic(() => import('../components/Connect'))

const ModalUI = () => {
  const { toggleViewingModal, viewingModal, modalView } = useUI()
  return (
    <Modal isOpen={viewingModal} onDismiss={() => toggleViewingModal(false)}>
      {modalView === 'connect' && <Connect />}
    </Modal>
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

export default function Layout({ children }: { children: ReactNode }) {
  useNetworkNotifications()
  return (
    <>
      <a href="#main" className="sr-only">
        skip to main content
      </a>
      <Toaster position="top-right" containerClassName="mt-24" />
      <ModalUI />
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
