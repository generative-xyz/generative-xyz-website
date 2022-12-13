import { MetaMaskInpageProvider } from '@metamask/providers';
import { provider } from 'web3-core';

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider | provider;
  }
}
