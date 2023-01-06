import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IListingTokenParams extends ContractOperationRequiredParams {
  collectionAddress: string;
  tokenID: string;
  erc20Token?: string;
  durationTime: number; // Unix timestamp
  price: string;
}
