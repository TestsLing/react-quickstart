import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains } from 'wagmi';
import * as chains from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import scaffoldConfig from '~/scaffold.config';
import { getTargetNetwork } from '~/utils/scaffold-eth/network';

const configuredNetwork = getTargetNetwork();

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
// const enabledChains =
//   (configuredNetwork.id as number) === 1
//     ? [configuredNetwork]
//     : [configuredNetwork, chains.mainnet];

/**
 * Chains for the app
 */
export const appChains = configureChains(
  [chains.sepolia],
  [
    infuraProvider({
      apiKey: scaffoldConfig.infuraApiKey,
      priority: 0,
    }),
    alchemyProvider({
      apiKey: scaffoldConfig.alchemyApiKey,
      priority: 1,
    }),
    publicProvider({ priority: 1 }),
  ],
  {
    stallTimeout: 3_000,
    // Sets pollingInterval if using chain's other than local hardhat chain
    ...(configuredNetwork.id !== chains.hardhat.id
      ? {
          pollingInterval: scaffoldConfig.pollingInterval,
        }
      : {}),
  }
);

const wallets = [
  metaMaskWallet({ chains: appChains.chains, shimDisconnect: true }),
  walletConnectWallet({ chains: appChains.chains }),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: 'Supported Wallets',
    wallets,
  },
]);
