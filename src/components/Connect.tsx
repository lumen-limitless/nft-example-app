import { useEthers } from '@usedapp/core'
import { useCallback } from 'react'
import { HOME_CHAINID, RPC } from '../constants'
import useToast from '../hooks/useToast'
import WalletConnectIcon from './icons/WalletConnectIcon'
import MetaMaskIcon from './icons/MetaMaskIcon'
import { Icon } from '@iconify/react'
import { Dialog } from '@headlessui/react'
import { useUI } from '../hooks/useUI'
import OperaIcon from './icons/OperaIcon'
import BraveIcon from './icons/BraveIcon'
import ExternalLink from './ui/ExternalLink'

export default function Connect() {
  const { activateBrowserWallet, activate } = useEthers()
  const { toggleViewingModal } = useUI()
  const t = useToast()

  return (
    <>
      <div className=" h-144  flex w-full flex-col items-center py-6 sm:h-96 ">
        <div className="flex items-center gap-3">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="24" cy="24" r="24" fill="url(#paint0_linear_106_7)" />
            <path d="M19.2 29.76H20.16V31.68H19.2V29.76Z" fill="white" />
            <path
              d="M33.216 18.0266V15.7333C33.216 14.4685 32.1826 13.4399 30.912 13.4399H15.936C14.0306 13.4399 12.48 14.9834 12.48 16.8799V30.6399C12.48 33.1638 14.5467 34.0799 15.936 34.0799H33.216C34.4866 34.0799 35.52 33.0514 35.52 31.7866V20.3199C35.52 19.0552 34.4866 18.0266 33.216 18.0266ZM15.936 15.7333H30.912V18.0266H15.936C15.6394 18.0134 15.3593 17.8868 15.1541 17.6732C14.9489 17.4596 14.8344 17.1755 14.8344 16.8799C14.8344 16.5844 14.9489 16.3003 15.1541 16.0867C15.3593 15.8731 15.6394 15.7465 15.936 15.7333V15.7333ZM33.216 31.7866H15.9498C15.4176 31.7728 14.784 31.563 14.784 30.6399V20.1078C15.1457 20.2374 15.5293 20.3199 15.936 20.3199H33.216V31.7866Z"
              fill="white"
            />
            <defs>
              <linearGradient
                id="paint0_linear_106_7"
                x1="-15.3488"
                y1="48"
                x2="32.7697"
                y2="1.00049"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0.215808" stopColor="#0E24D7" />
                <stop offset="1" stopColor="#E300FC" />
              </linearGradient>
            </defs>
          </svg>
          <Dialog.Title as="h1" className={'text-2xl text-white'}>
            Select a Wallet
          </Dialog.Title>
        </div>

        <div className=" my-3 grid h-full w-full grid-cols-1 sm:grid-cols-2  ">
          <button
            className="flex flex-col items-center justify-center gap-1  border border-gray-600/30 text-lg transition hover:bg-white/10"
            onClick={() => {
              activateBrowserWallet({ type: 'metamask' })
              toggleViewingModal(false)
            }}
          >
            <div className="flex gap-1">
              <MetaMaskIcon />
              <OperaIcon />
              <BraveIcon />
            </div>
            Browser Wallet
          </button>

          <button
            className="flex flex-col items-center justify-center gap-1  border border-gray-600/30 text-lg transition hover:bg-white/10"
            onClick={() => {
              activateBrowserWallet({ type: 'walletConnect' })
              toggleViewingModal(false)
            }}
          >
            <WalletConnectIcon />
            WalletConnect
          </button>

          <button
            className="flex flex-col items-center justify-center gap-1  border border-gray-600/30 text-lg transition hover:bg-white/10"
            onClick={() => {
              activateBrowserWallet({ type: 'coinbase' })
              toggleViewingModal(false)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              viewBox="0 0 1024 1024"
            >
              <circle cx="512" cy="512" r="512" style={{ fill: '#0052ff' }} />
              <path
                style={{ fill: '#fff' }}
                d="M516.3 361.83c60.28 0 108.1 37.18 126.26 92.47H764C742 336.09 644.47 256 517.27 256 372.82 256 260 365.65 260 512.49S370 768 517.27 768c124.35 0 223.82-80.09 245.84-199.28H642.55c-17.22 55.3-65 93.45-125.32 93.45-83.23 0-141.56-63.89-141.56-149.68.04-86.77 57.43-150.66 140.63-150.66z"
              />
            </svg>
            Coinbase Wallet
          </button>
        </div>
        <ExternalLink
          href="https://www.coinbase.com/learn/crypto-basics/what-is-a-crypto-wallet"
          className="flex gap-1 text-blue-100 opacity-80 hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
            width={24}
            height={24}
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <g fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" d="M12 7h.01" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 11h2v5m-2 0h4"
              />
            </g>
          </svg>
          What is a wallet?
        </ExternalLink>
      </div>
    </>
  )
}
