import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface ICancelTokenOfferParams
  extends ContractOperationRequiredParams {
  offerId: string;
}
