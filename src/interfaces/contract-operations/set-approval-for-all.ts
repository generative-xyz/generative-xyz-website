import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface ISetApprovalForAllParams
  extends ContractOperationRequiredParams {
  marketplaceAddress: string;
  collectionAddress: string;
}
