import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IMakeTokenOfferParams extends ContractOperationRequiredParams {
  collectionAddress: string;
  tokenID: string;
  price: string;
  erc20Token?: string;
  durationTime: number; // Unix timestamp
}
