import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IGetAllowanceAmount extends ContractOperationRequiredParams {
  contractAddress: string;
  consumerAddress: string;
}
