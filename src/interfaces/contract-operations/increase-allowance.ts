import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IIncreaseAllowanceParams
  extends ContractOperationRequiredParams {
  contractAddress: string;
  consumerAddress: string;
  amount: string;
}
