'use client';
import {
  getDefaultConfig,
  midnightTheme,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { sepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';

const config = getDefaultConfig({
  appName: 'NFT EXAMPLE',
  projectId: 'YOUR_PROJECT_ID',
  chains: [sepolia],
  ssr: false,
});

const queryClient = new QueryClient();

export default function providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider theme={midnightTheme()}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
