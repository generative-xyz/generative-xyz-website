import { IPagingResponse } from '@interfaces/paging';

export interface IListingTokenResult {
  offeringID: string;
  price: string;
  seller: string;
  closed: boolean;
}

export interface IListingTokens extends IPagingResponse {
  result: IListingTokenResult[];
}
