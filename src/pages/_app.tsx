import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  Config,
  DAppProvider,
  MetamaskConnector,
  CoinbaseWalletConnector,
  Hardhat,
  Goerli,
} from '@usedapp/core'
import Layout from '../layouts'
import Head from 'next/head'
import { HOME_CHAINID, RPC } from '../constants'
import { DefaultSeo } from 'next-seo'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: RPC,
  autoConnect: false,
  multicallVersion: 2,
  notifications: {
    checkInterval: 3000,
    expirationPeriod: 1,
  },
  connectors: {
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
  pollingInterval: 5000,
  networks: [Hardhat, Goerli],
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle={process.env.NEXT_PUBLIC_APP_NAME || ''}
        titleTemplate={`%s | ${process.env.NEXT_PUBLIC_APP_NAME || ''}`}
        description={process.env.NEXT_PUBLIC_APP_DESCRIPTION || ''}
      />
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
        />
      </Head>

      <DAppProvider config={config}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DAppProvider>
    </>
  )
}

export default MyApp
