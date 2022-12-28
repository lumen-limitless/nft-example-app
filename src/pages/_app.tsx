import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  Config,
  DAppProvider,
  MetamaskConnector,
  CoinbaseWalletConnector,
} from '@usedapp/core'
// import { WalletConnectConnector } from '@usedapp/wallet-connect-connector'
import Layout from '../layouts'
import Head from 'next/head'
import {
  APP_DESCRIPTION,
  APP_NAME,
  HOME_CHAINID,
  RPC,
  SUPPORTED_CHAINS,
} from '../constants'
import { DefaultSeo } from 'next-seo'

const config: Config = {
  readOnlyChainId: HOME_CHAINID,
  readOnlyUrls: RPC,
  autoConnect: true,
  multicallVersion: 2,
  notifications: {
    checkInterval: 3000,
    expirationPeriod: 1,
  },
  connectors: {
    // walletConnect: new WalletConnectConnector({ rpc: RPC }),
    metamask: new MetamaskConnector(),
    coinbase: new CoinbaseWalletConnector(),
  },
  pollingInterval: 5000,
  networks: SUPPORTED_CHAINS,
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        defaultTitle={APP_NAME}
        titleTemplate={`%s | ${APP_NAME}`}
        description={APP_DESCRIPTION}
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
