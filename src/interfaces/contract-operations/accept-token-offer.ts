import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IAcceptTokenOfferParams
  extends ContractOperationRequiredParams {
  offerId: string;
}
