import { BigNumber } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import React, { useState } from 'react'
import { CONTRACTS } from '../constants'
import Logo from './Logo'
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from 'wagmi'
import { NFT__factory } from '../typechain'
import Button from './ui/Button'
import Spinner from './ui/Spinner'
import { useToast } from '../hooks'

const MAX_MINTABLE = 5
const PUBLIC_PRICE = parseEther('0.0001')

export default function Sale() {
  const t = useToast()
  const [numTokens, setNumTokens] = useState<number | ''>('')
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address: address,
    formatUnits: 'ether',
  })

  const { data: mintedCount }: { data: BigNumber | undefined } =
    useContractRead({
      address: CONTRACTS.address as `0x${string}`,
      abi: NFT__factory.abi,
      functionName: 'mintedCount',
      args: [address],
      enabled: isConnected,
    })
  const { config } = usePrepareContractWrite({
    address: CONTRACTS.address as `0x${string}`,
    abi: NFT__factory.abi,
    functionName: 'buyPublic',
    args: [numTokens || 0],
    overrides: { value: PUBLIC_PRICE.mul(numTokens || 0) },
    enabled:
      mintedCount?.lt(MAX_MINTABLE) &&
      balance?.value.gte(numTokens || 0 * 0.0001),
  })
  const { write, isLoading } = useContractWrite({
    ...config,
    onSuccess: () =>
      t('success', `${config.functionName} transaction submitted.`),
  })

  if (!isConnected)
    return (
      <div className="flex flex-col items-center mx-auto text-center">
        <Logo />
        <p>Connect a wallet to continue.</p>
      </div>
    )

  if (mintedCount?.gte(MAX_MINTABLE))
    return (
      <div className="flex flex-col items-center mx-auto text-center">
        <Logo />
        <p>You have minted the maximum amount of tokens available.</p>
      </div>
    )

  return (
    <div className="relative z-20   mx-auto mb-32 flex w-full max-w-md flex-col items-center justify-center gap-3 text-center md:mb-0">
      <Logo />

      <input
        type="number"
        min={1}
        onInput={(e) => {
          e.preventDefault()
          if (e.currentTarget.value === '') {
            setNumTokens('')
            return
          }
          setNumTokens(
            parseInt(e.currentTarget.value) >
              MAX_MINTABLE - (mintedCount?.toNumber() ?? 0)
              ? MAX_MINTABLE - (mintedCount?.toNumber() ?? 0)
              : parseInt(e.currentTarget.value)
          )
        }}
        value={numTokens}
        placeholder="Enter number of tokens"
        className="  w-full   rounded bg-black  p-3 border-gray-800 border-2  focus:outline-none focus:border-gray-700"
      />
      <Button full disabled={!write} color="blue" onClick={() => write?.()}>
        {isLoading ? <Spinner /> : 'Buy NFT'}
      </Button>
    </div>
  )
}
