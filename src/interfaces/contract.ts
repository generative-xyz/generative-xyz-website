import { TransactionReceipt } from 'web3-eth';
import { ContractOperationStatus } from '@enums/contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import { WalletManager } from '@services/wallet';

export type ContractSendTransactionReturn = TransactionReceipt;
export type ContractCallTransactionReturn = number | string | boolean;
export type ContractOperationReturn =
  | ContractSendTransactionReturn
  | ContractCallTransactionReturn;

export type TContractOperation<P, R extends ContractOperationReturn> = new (
  walletManager: WalletManager,
  params: P
) => ContractOperation<P, R>;

export type ContractOperationData = {
  transactionHash?: string;
  data?: ContractOperationReturn;
  message: string;
  error?: unknown;
};

export type ContractOperationCallback = (
  status: ContractOperationStatus,
  data?: ContractOperationData
) => void;

export type ContractOperationHookReturn<P, R> = {
  status: ContractOperationStatus;
  isLoading: boolean;
  isSuccess: boolean;
  successMessage: string | null;
  isError: boolean;
  errorMessage: string | null;
  transactionHash: string | null;
  params: P | null;
  data: R | null;
  call: (data: P) => void;
  reset: () => void;
};

export type ContractOperationRequiredParams = {
  chainID: number;
};
