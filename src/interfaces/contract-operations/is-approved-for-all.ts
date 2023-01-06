import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IIsApprovedForAllParams
  extends ContractOperationRequiredParams {
  marketplaceAddress: string;
  collectionAddress: string;
}
