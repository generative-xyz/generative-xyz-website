import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { provider } from 'web3-core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { AbiItem } from 'web3-utils';

const LOG_PREFIX = 'WalletManager';

export class WalletManager {
  web3Provider: Web3 | null = null;
  metamaskProvider: MetaMaskInpageProvider | null = null;
  contracts: Record<string, Contract | null> = {};

  constructor() {
    this.initiateWeb3Provider();
  }

  initiateWeb3Provider(): void {
    log('initiateWeb3Provider', LogLevel.Info, LOG_PREFIX);
    this.web3Provider = new Web3(window.ethereum as provider);
  }

  getWeb3Provider(): Web3 {
    if (!this.web3Provider) {
      this.initiateWeb3Provider();
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.web3Provider!;
  }

  initiateMetamaskProvider(): void {
    log('initiateProvider', LogLevel.Info, LOG_PREFIX);
    this.metamaskProvider = window.ethereum as MetaMaskInpageProvider;
  }

  getMetamaskProvider(): MetaMaskInpageProvider {
    if (!this.web3Provider) {
      this.initiateMetamaskProvider();
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.metamaskProvider!;
  }

  isInstalled(): boolean {
    try {
      return this.getMetamaskProvider().isMetaMask;
    } catch (e) {
      return false;
    }
  }

  isConnected(): boolean {
    try {
      return (window.ethereum as MetaMaskInpageProvider).isConnected();
    } catch (e) {
      return false;
    }
  }

  async connect(): Promise<string | null> {
    try {
      const addresses = await this.getMetamaskProvider().request({
        method: 'eth_requestAccounts',
        params: [
          {
            eth_accounts: {},
          },
        ],
      });
      if (addresses && Array.isArray(addresses)) {
        return addresses[0];
      }
      return null;
    } catch (err: unknown) {
      log('connect', LogLevel.Error, LOG_PREFIX);
      return null;
    }
  }

  /**
   * Looking for contract in cache
   * creates it if it doesn't exist,
   * and then returns it.
   */
  async getContract(
    contractAddress: string,
    abi: AbiItem[]
  ): Promise<Contract> {
    if (!this.contracts[contractAddress]) {
      const web3Instance = this.getWeb3Provider();
      this.contracts[contractAddress] = new web3Instance.eth.Contract(
        abi,
        contractAddress
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.contracts[contractAddress]!;
  }
}
