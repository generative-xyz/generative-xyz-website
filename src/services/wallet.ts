import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { provider } from 'web3-core';
import { MetaMaskInpageProvider } from '@metamask/providers';
import { AbiItem } from 'web3-utils';
import {
  TContractOperation,
  ContractOperationCallback,
  ContractOperationReturn,
} from '@interfaces/contract';
import { ContractOperationStatus } from '@enums/contract';
import { getChainList } from '@services/chainlist';
import { IResourceChain } from '@interfaces/chain';
import {
  ITransferPayload,
  ProviderRpcError,
  WalletOperationReturn,
} from '@interfaces/wallet';
import { WalletError, WalletErrorCode } from '@enums/wallet-error';

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

  // Wallet simple getters

  isInstalled(): boolean {
    try {
      return this.getMetamaskProvider().isMetaMask;
    } catch (_: unknown) {
      return false;
    }
  }

  isConnected(): boolean {
    try {
      return this.getMetamaskProvider().isConnected();
    } catch (_: unknown) {
      return false;
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

  async connectedAddress(): Promise<string | null> {
    const addresses = await this.getMetamaskProvider().request({
      method: 'eth_accounts',
    });
    if (addresses && Array.isArray(addresses)) {
      return addresses[0];
    }
    return null;
  }

  // Wallet methods
  // Should return WalletOperationReturn for more information

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
        message: WalletError.FAILED_CONNECT,
        data: null,
      };
    } catch (err: unknown) {
      log('failed to connect to wallet', LogLevel.Error, LOG_PREFIX);
      return {
        isError: true,
        isSuccess: false,
        message: WalletError.FAILED_CONNECT,
        data: null,
      };
    }
  }

  async signMessage(
    message: string,
    walletAddress: string
  ): Promise<WalletOperationReturn<string | null>> {
    try {
      const signature = await this.getWeb3Provider().eth.personal.sign(
        Web3.utils.fromUtf8(message),
        walletAddress,
        ''
      );

      return {
        isError: false,
        isSuccess: true,
        message: '',
        data: signature,
      };
    } catch (err: unknown) {
      log('failed to sign message', LogLevel.Error, LOG_PREFIX);
      return {
        isError: true,
        isSuccess: false,
        message: WalletError.FAILED_CONNECT,
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
      } catch (err: unknown) {
        log(err as Error, LogLevel.Error, LOG_PREFIX);
        this.requestAddChain(chainID);

        if ((err as ProviderRpcError).code !== WalletErrorCode.USER_REJECTED) {
          this.requestAddChain(chainID);
        }
      }

      return {
        isError: false,
        isSuccess: true,
        message: 'OK',
        data: null,
      };
    } catch (err: unknown) {
      log(
        `failed switch chain, request chain id ${chainID}`,
        LogLevel.Error,
        LOG_PREFIX
      );

      return {
        isError: true,
        isSuccess: false,
        message: WalletError.FAILED_SWITCH_CHAIN,
        data: null,
      };
    }
  }

  /**
   *
   * @param chainID
   * @returns
   */
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
          message: WalletError.FAILED_ADD_CHAIN,
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
    } catch (_: unknown) {
      log('failed to add chain', LogLevel.Error, LOG_PREFIX);
      return {
        isError: true,
        isSuccess: false,
        message: WalletError.FAILED_ADD_CHAIN,
        data: null,
      };
    }
  }

  async transfer(
    payload: ITransferPayload
  ): Promise<WalletOperationReturn<string | null>> {
    const { fromAddress, toAddress, value } = payload;

    try {
      const metamaskProvider = this.getMetamaskProvider();
      const txHash = await metamaskProvider.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: fromAddress,
            to: toAddress,
            value: Web3.utils.toHex(Web3.utils.toWei(value, 'ether')),
          },
        ],
      });

      if (txHash) {
        return {
          isError: false,
          isSuccess: true,
          message: 'OK',
          data: txHash as string,
        };
      } else {
        return {
          isError: true,
          isSuccess: false,
          message: WalletError.FAILED_TRANSFER,
          data: null,
        };
      }
    } catch (_: unknown) {
      log('failed to add chain', LogLevel.Error, LOG_PREFIX);
      return {
        isError: true,
        isSuccess: false,
        message: WalletError.FAILED_TRANSFER,
        data: null,
      };
    }
  }

  /**
   * Looking for contract in cache
   * creates it if it doesn't exist,
   * and then returns it.
   * @param contractAddress
   * @param abi
   * @returns
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

  /**
   * Main method to inject and process contract operation
   * @param OperationClass
   * @param params
   * @param statusCallback
   * @returns
   */
  async runContractOperation<P, R extends ContractOperationReturn>(
    OperationClass: TContractOperation<P, R>,
    params: P,
    statusCallback: ContractOperationCallback
  ): Promise<R | null> {
    const contractOperation = new OperationClass(this, params);

    try {
      statusCallback?.(ContractOperationStatus.IDLE);

      await contractOperation.prepare();
      statusCallback?.(ContractOperationStatus.CALLING);

      const res = await contractOperation.call();

      statusCallback?.(ContractOperationStatus.WAITING_CONFIRMATION);

      if (
        typeof res === 'number' ||
        typeof res === 'boolean' ||
        typeof res === 'string'
      ) {
        statusCallback?.(ContractOperationStatus.SUCCESS, {
          transactionHash: '',
          data: res,
          message: contractOperation.success(),
        });

        return res;
      }

      statusCallback?.(ContractOperationStatus.SUCCESS, {
        transactionHash: (res as TransactionReceipt).transactionHash,
        data: res as TransactionReceipt,
        message: contractOperation.success(),
      });
      return res;
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);

      statusCallback?.(ContractOperationStatus.ERROR, {
        error: err,
        message: contractOperation.error(),
      });

      return null;
    }
  }
}
