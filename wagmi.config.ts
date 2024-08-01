import { defineConfig } from '@wagmi/cli';
import { foundry, react } from '@wagmi/cli/plugins';

export default defineConfig({
  out: 'lib/wagmi.ts',
  contracts: [],
  plugins: [
    react(),
    foundry({
      project: '../nft-example-contract',
      deployments: {
        NFT: '0xCA19eac9109f7f482C669670781eDEe696657347',
      },
    }),
  ],
});
