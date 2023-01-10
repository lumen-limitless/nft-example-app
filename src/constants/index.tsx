import contractsInfo from '../json/contractsInfo.json'
import contractsInfoLocal from '../json/contractsInfo.local.json'

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
