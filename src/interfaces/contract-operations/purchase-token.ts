import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IPurchaseTokenParams extends ContractOperationRequiredParams {
  offerId: string;
  price: string; // In ETH Wei
}
