import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IGetParameterControlParams
  extends ContractOperationRequiredParams {
  key: string;
}
