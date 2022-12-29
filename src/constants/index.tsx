import { Goerli, Hardhat, Mainnet } from '@usedapp/core'
import contractsInfo from '../json/contractsInfo.json'
import contractsInfoLocal from '../json/contractsInfo.local.json'

export const APP_NAME = 'NFT EXAMPLE'

export const APP_DESCRIPTION = 'NFT Example app and smart contracts'

export const social = [
  {
    name: 'twitter',
    link: '',
    icon: 'akar-icons:twitter-fill',
  },
  {
    name: 'discord',
    link: '',
    icon: 'akar-icons:discord-fill',
  },
  {
    name: 'instagram',
    link: '',
    icon: 'akar-icons:instagram-fill',
  },
  {
    name: 'opensea',
    link: 'https://opensea.io/',
    icon: 'simple-icons:opensea',
  },
]

export const HOME_CHAINID = parseInt(
  process.env.NODE_ENV === 'production'
    ? contractsInfo.chainId
    : contractsInfoLocal.chainId
)
export const CONTRACTS =
  process.env.NODE_ENV === 'production'
    ? contractsInfo.contracts.NFT
    : contractsInfoLocal.contracts.NFT

export const RPC =
  process.env.NODE_ENV === 'production'
    ? {
        [Goerli.chainId]:
          'https://eth-goerli.g.alchemy.com/v2/9WA5ju6LZtjbnuhzqCedTtDoDXDIwNH6',
      }
    : { [Hardhat.chainId]: 'http://localhost:8545' }

export const MULTICALL2_ADDRESS = {
  [Goerli.chainId]: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
}
