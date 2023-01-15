import { BigNumber } from 'ethers'
import { parseUnits } from 'ethers/lib/utils'
import React, { useMemo, useState } from 'react'
import { NFT_ADDRESS, NFT_ABI } from '../constants'
import Logo from './Logo'
import {
  useAccount,
  useBalance,
  useContractRead,
  useNetwork,
  usePrepareContractWrite,
} from 'wagmi'
import WagmiTransactionButton from './WagmiTransactionButton'
import { useToast } from '../hooks'
import { useDebounce } from 'react-use'
import Spinner from './ui/Spinner'

const MAX_MINTABLE = 100
const PUBLIC_PRICE = parseUnits('0.0001')

export default function Sale() {
  const t = useToast()
  const [numTokensInput, setNumTokensInput] = useState<string>('')
  const [numTokens, setNumTokens] = useState<number>(0)
  useDebounce(
    () => {
      if (numTokensInput === '') return
      setNumTokens(parseInt(numTokensInput))
    },
    500,
    [numTokensInput, numTokens]
  )
  const { address, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { data: balance } = useBalance({
    address: address,
    formatUnits: 'ether',
    watch: true,
  })

  const sufficientBalance = useMemo(() => {
    if (!balance) return false

    return balance.value.gte(PUBLIC_PRICE.mul(numTokens))
  }, [balance, numTokens])

  const { data: mintedCount } = useContractRead({
    address: NFT_ADDRESS[chain?.id ?? 0],
    abi: NFT_ABI,
    watch: true,
    functionName: 'mintedCount',
    args: [address || '0x'],
    enabled: Boolean(address),
  })

  const { config } = usePrepareContractWrite({
    address: NFT_ADDRESS[chain?.id ?? 0],
    abi: NFT_ABI,
    functionName: 'buyPublic',
    args: [BigNumber.from(numTokens)],
    overrides: {
      value: PUBLIC_PRICE.mul(numTokens),
    },
    enabled: mintedCount?.lt(MAX_MINTABLE) && sufficientBalance,
  })

  if (!isConnected)
    return (
      <div className="mx-auto flex flex-col items-center text-center">
        <Logo />
        <p>Connect a wallet to continue.</p>
      </div>
    )

  if (mintedCount?.gte(MAX_MINTABLE))
    return (
      <div className="mx-auto flex flex-col items-center text-center">
        <Logo />
        <p>You have minted the maximum amount of tokens available.</p>
      </div>
    )

  return (
    <div className="relative z-20   mx-auto mb-32 flex w-full max-w-md flex-col items-center justify-center gap-3 text-center md:mb-0">
      <Logo />
      {mintedCount && (
        <span>
          {MAX_MINTABLE - mintedCount.toNumber()} tokens available for minting.
        </span>
      )}
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault()
          const input = e.target.value.replace(/\D/g, '')
          if (Number.isNaN(input)) {
            setNumTokensInput('')
            return
          }
          setNumTokensInput(
            parseInt(input) >= MAX_MINTABLE - (mintedCount?.toNumber() || 0)
              ? (MAX_MINTABLE - (mintedCount?.toNumber() || 0)).toString()
              : input
          )
        }}
        value={numTokensInput}
        placeholder="Enter number of tokens"
        className="  w-full   rounded border-2  border-gray-800 bg-black p-3  focus:border-gray-700 focus:outline-none"
      />
      {numTokensInput === '' ? (
        <div className="p-6" />
      ) : numTokensInput !== numTokens.toString() ? (
        <div className="p-3">
          <Spinner />
        </div>
      ) : sufficientBalance ? (
        <WagmiTransactionButton
          className="w-full rounded bg-blue-500 p-3 drop-shadow"
          config={config}
          name={`Mint ${numTokens} NFT${numTokens > 1 ? "'s" : ''}`}
          color="blue"
          onSuccess={(data) => {
            t('info', 'Transaction sent')
            console.debug(data)
            data.wait().then(() => {
              t('success', 'Transaction confirmed')
              setNumTokensInput('')
            })
          }}
          onError={() => t('error', 'Transaction failed')}
        />
      ) : (
        <div className="p-3">Insufficient Balance</div>
      )}
    </div>
  )
}
