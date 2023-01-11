import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface ICancelListingOfferParams
  extends ContractOperationRequiredParams {
  offerId: string;
}
