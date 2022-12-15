import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { provider } from 'web3-core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { AbiItem } from 'web3-utils';
import {
  TContractOperation,
  ContractOperationCallback,
} from '@interfaces/contract';
import { ContractOperationStatus } from '@enums/contract';
import { getChainList } from '@services/chain-service';
import { IResourceChain } from '@interfaces/chain';
import { WalletOperationReturn } from '@interfaces/wallet';

const LOG_PREFIX = 'WalletManager';

export class WalletManager {
  web3Provider: Web3 | null = null;
  metamaskProvider: MetaMaskInpageProvider | null = null;
  contracts: Record<string, Contract | null> = {};

  constructor() {
    this.initiateWeb3Provider();
    this.initiateMetamaskProvider();
  }

  initiateWeb3Provider(): void {
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

  async connect(): Promise<WalletOperationReturn<string | null>> {
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
        return {
          isError: false,
          isSuccess: true,
          message: '',
          data: addresses[0],
        };
      }
      return {
        isError: true,
        isSuccess: false,
        message: 'OK',
        data: null,
      };
    } catch (err: unknown) {
      log('can not connect to wallet', LogLevel.Error, LOG_PREFIX);
      return {
        isError: true,
        isSuccess: false,
        message: '',
        data: null,
      };
    }
  }

  async requestSwitchChain(
    chainID: number
  ): Promise<WalletOperationReturn<unknown>> {
    try {
      const metamaskProvider = this.getMetamaskProvider();
      const web3Provider = this.getWeb3Provider();

      try {
        await metamaskProvider.request({
          method: 'wallet_switchEthereumChain',
          params: [
            {
              chainId: web3Provider.utils.toHex(chainID),
            },
          ],
        });
      } catch (_: unknown) {
        this.requestAddChain(chainID);
      }

      return {
        isError: false,
        isSuccess: true,
        message: 'OK',
        data: null,
      };
    } catch (err: unknown) {
      log(
        `can not switch chain, request chain id ${chainID}`,
        LogLevel.Error,
        LOG_PREFIX
      );

      return {
        isError: true,
        isSuccess: false,
        message: 'Can not switch chain',
        data: null,
      };
    }
  }

  async requestAddChain(
    chainID: number
  ): Promise<WalletOperationReturn<unknown>> {
    try {
      const chainList = await getChainList();
      const chain = chainList.find(
        (c: IResourceChain) => c.chainId === chainID
      );
      if (!chain) {
        log(`chain ${chainID} not found`, LogLevel.Error, LOG_PREFIX);
        return {
          isError: true,
          isSuccess: false,
          message: `Chain ID ${chainID} not found`,
          data: null,
        };
      }
      const web3Provider = this.getWeb3Provider();
      const metamaskProvider = this.getMetamaskProvider();
      const account = web3Provider.eth.getAccounts();

      const params = {
        chainId: web3Provider.utils.toHex(chain.chainId),
        chainName: chain.name,
        nativeCurrency: {
          name: chain.nativeCurrency.name,
          symbol: chain.nativeCurrency.symbol,
          decimals: chain.nativeCurrency.decimals,
        },
        rpcUrls: chain.rpc,
        blockExplorerUrls: [
          chain.explorers &&
          chain.explorers.length > 0 &&
          chain.explorers[0].url
            ? chain.explorers[0].url
            : chain.infoURL,
        ],
      };

      await metamaskProvider.request({
        method: 'wallet_addEthereumChain',
        params: [params, account],
      });

      return {
        isError: false,
        isSuccess: true,
        message: 'OK',
        data: null,
      };
    } catch (err: unknown) {
      log('can not add chain', LogLevel.Error, LOG_PREFIX);
      return {
        isError: true,
        isSuccess: false,
        message: `Can not add chain`,
        data: null,
      };
    }
  }

  async isChainSupported(chainID: number): Promise<boolean> {
    try {
      const currentChainID = await this.getWeb3Provider().eth.getChainId();
      return chainID === currentChainID;
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
      return false;
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
      const web3Provider = this.getWeb3Provider();
      this.contracts[contractAddress] = new web3Provider.eth.Contract(
        abi,
        contractAddress
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.contracts[contractAddress]!;
  }

  async runContractOperation<P>(
    OperationClass: TContractOperation<P>,
    params: P,
    statusCallback: ContractOperationCallback
  ) {
    const contractOperation = new OperationClass(this, params);

    try {
      statusCallback?.(ContractOperationStatus.IDLE);

      await contractOperation.prepare();
      statusCallback?.(ContractOperationStatus.CALLING);

      const transaction = await contractOperation.call();

      statusCallback?.(ContractOperationStatus.WAITING_CONFIRMATION);

      return statusCallback?.(ContractOperationStatus.SUCCESS, {
        transactionHash: transaction.transactionHash,
        transaction: transaction,
        message: contractOperation.success(),
      });
    } catch (err: unknown) {
      log('run contract operation error', LogLevel.Error, LOG_PREFIX);

      return statusCallback?.(ContractOperationStatus.ERROR, {
        error: err,
        message: contractOperation.error(),
      });
    }
  }
}
