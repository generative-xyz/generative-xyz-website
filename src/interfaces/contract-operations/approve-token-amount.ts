import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IApproveTokenAmountParams
  extends ContractOperationRequiredParams {
  contractAddress: string;
  consumerAddress: string;
}
