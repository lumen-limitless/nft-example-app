import {
  useCalls,
  useContractFunction,
  useEtherBalance,
  useEthers,
} from '@usedapp/core'
import { Contract } from 'ethers'
import { parseEther } from 'ethers/lib/utils'
import React, { useState } from 'react'
import { HOME_CHAINID, CONTRACTS } from '../constants'
import { parseBalance } from '../functions'
import useStore from '../store/useStore'
import Gas from './Gas'
import Logo from './Logo'
import TransactionButton from './ui/TransactionButton'
import Button from './ui/Button'
import { NFT } from '../typechain/contracts'

const MAX_MINTABLE = 5
const PUBLIC_PRICE = parseEther('0.0001')

const contract = new Contract(CONTRACTS.address, CONTRACTS.abi) as NFT

export default function Sale() {
  const [numTokens, setNumTokens] = useState<number | ''>(1)
  const setModalView = useStore((state) => state.setModalView)
  const { account, chainId } = useEthers()
  const balance = useEtherBalance(account)
  const [mintedCount] = useCalls(
    [account && { contract, method: 'mintedCount', args: [account] }],
    { chainId: HOME_CHAINID }
  )

  const mint = useContractFunction(contract, 'buyPublic', {
    transactionName: 'Mint',
  })
  return (
    <>
      <div className="relative z-20   mx-auto mb-32 flex w-full max-w-md flex-col items-center justify-center gap-3 text-center md:mb-0">
        {!account ? (
          <div className=" flex w-full flex-col place-items-center gap-3">
            <Logo />
            <Button
              size="sm"
              color="blue"
              className="max-w-sm"
              onClick={() => setModalView('connect')}
            >
              Connect Wallet
            </Button>
          </div>
        ) : chainId !== HOME_CHAINID ? (
          <>Switch to Goerli</>
        ) : mintedCount?.value[0].toNumber() === MAX_MINTABLE ? (
          <>
            <Logo />
            <p>You have minted the max amount of NFT&apos;s available to you</p>
          </>
        ) : (
          <>
            <Gas className="absolute top-0 right-0" />
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
                    MAX_MINTABLE - mintedCount?.value[0].toNumber()
                    ? MAX_MINTABLE - mintedCount?.value[0].toNumber()
                    : parseInt(e.currentTarget.value)
                )
              }}
              value={numTokens}
              placeholder="Enter number of tokens"
              className=" focus:border-purple w-full   rounded bg-black  p-3 border-gray-800 border-2 ring ring-black"
            />
            <TransactionButton
              color="green"
              full
              method={mint}
              requirements={{
                requirement:
                  numTokens !== '' &&
                  parseBalance(balance ?? 0) >=
                    numTokens * parseBalance(PUBLIC_PRICE),
                message: 'Insufficient Balance',
              }}
              name="Mint"
              args={[
                numTokens ?? 1,
                { value: PUBLIC_PRICE.mul(numTokens !== '' ? numTokens : 1) },
              ]}
            />
          </>
        )}
      </div>
    </>
  )
}
