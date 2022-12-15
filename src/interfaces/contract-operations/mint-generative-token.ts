import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IMintGenerativeTokenParams
  extends ContractOperationRequiredParams {
  param1: string;
  param2: string;
  amount: number;
}
