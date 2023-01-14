import { BigNumber, ethers } from 'ethers'
import { parseEther, parseUnits } from 'ethers/lib/utils'
import React, { useMemo, useState } from 'react'
import { NFT } from '../constants'
import Logo from './Logo'
import {
  useAccount,
  useBalance,
  useContractRead,
  usePrepareContractWrite,
} from 'wagmi'
import WagmiTransactionButton from './WagmiTransactionButton'
import Button from './ui/Button'
import { useToast } from '../hooks'

const MAX_MINTABLE = 5
const PUBLIC_PRICE = '0.0001'

export default function Sale() {
  const t = useToast()
  const [numTokens, setNumTokens] = useState<string>('')
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address: address,
    formatUnits: 'ether',
    watch: true,
  })

  const sufficientBalance = useMemo(() => {
    if (!balance) return false
    if (!numTokens) return false
    return (
      parseFloat(balance.formatted) >
      parseInt(numTokens) * parseFloat(PUBLIC_PRICE)
    )
  }, [balance, numTokens])

  const { data: mintedCount } = useContractRead({
    ...NFT,
    watch: true,
    functionName: 'mintedCount',
    args: [address || ethers.constants.AddressZero],
  })

  const { config } = usePrepareContractWrite({
    ...NFT,
    functionName: 'buyPublic',
    args: [BigNumber.from(numTokens || 0)],
    overrides: {
      value: parseUnits(PUBLIC_PRICE).mul(parseInt(numTokens || '0')),
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
        <span>{5 - mintedCount.toNumber()} tokens available for minting.</span>
      )}
      <input
        type="text"
        onChange={(e) => {
          e.preventDefault()
          const input = e.target.value.replace(/\D/g, '')
          if (Number.isNaN(input)) {
            setNumTokens('')
            return
          }
          setNumTokens(
            parseInt(input) >= MAX_MINTABLE - (mintedCount?.toNumber() || 0)
              ? (MAX_MINTABLE - (mintedCount?.toNumber() || 0)).toString()
              : input
          )
        }}
        value={numTokens}
        placeholder="Enter number of tokens"
        className="  w-full   rounded border-2  border-gray-800 bg-black p-3  focus:border-gray-700 focus:outline-none"
      />
      {numTokens === '' ? (
        <div className="p-6" />
      ) : sufficientBalance ? (
        <WagmiTransactionButton
          full
          config={config}
          name={`Mint ${numTokens} NFT${parseInt(numTokens) > 1 ? "'s" : ''}`}
          color="blue"
          onMethodComplete={() => setNumTokens('')}
          onSuccess={(data) => {
            t('info', 'Transaction sent')
            console.debug(data)
            data.wait().then(() => t('success', 'Transaction confirmed'))
          }}
          onError={() => t('error', 'Transaction failed')}
        />
      ) : (
        <Button full color="gray" disabled>
          Insufficient Balance
        </Button>
      )}
    </div>
  )
}
