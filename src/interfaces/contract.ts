import { TransactionReceipt } from 'web3-eth';
import { ContractOperationStatus } from '@enums/contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import { WalletManager } from '@services/wallet';

export type TContractOperation<P> = new (
  walletManager: WalletManager,
  params: P
) => ContractOperation<P>;

export type ContractOperationData = {
  transactionHash?: string;
  transaction?: TransactionReceipt;
  message: string;
  error?: unknown;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ContractOperationCallback = (
  status: ContractOperationStatus,
  data?: ContractOperationData
) => void;
/* eslint-enable @typescript-eslint/no-explicit-any */

export type ContractOperationHookReturn<P> = {
  status: ContractOperationStatus;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string | null;
  isError: boolean;
  errorMessage: string | null;
  transactionHash: string | null;
  params: P | null;
  transaction: TransactionReceipt | null;
  call: (data: P) => void;
  reset: () => void;
};

export type ContractOperationRequiredParams = {
  chainID: number;
  contractAddress: string;
  walletAddress: string;
};
