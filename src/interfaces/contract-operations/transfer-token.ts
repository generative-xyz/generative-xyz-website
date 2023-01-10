import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface ITransferTokenParams extends ContractOperationRequiredParams {
  tokenID: string;
  collectionAddress: string;
  toAddress: string;
}
