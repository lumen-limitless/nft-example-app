import '../styles/globals.css'
import type { AppProps } from 'next/app'
import AppLayout from '../layouts/AppLayout'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import { createClient, WagmiConfig } from 'wagmi'
import { hardhat, goerli, foundry, localhost } from 'wagmi/chains'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

const chains = process.env.NODE_ENV === 'production' ? [goerli] : [hardhat]
const client = createClient(
  getDefaultClient({
    autoConnect: false,
    appName: 'NFT Example DApp',
    chains,
  })
)

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

      <WagmiConfig client={client}>
        <ConnectKitProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ConnectKitProvider>
      </WagmiConfig>
    </>
  )
}

export default MyApp
