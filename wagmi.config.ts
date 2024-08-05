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
        NFT: '0x9D6Fdf3eFd7b7419ADd7a157E42d1EA3a2Be4856',
      },
    }),
  ],
});
