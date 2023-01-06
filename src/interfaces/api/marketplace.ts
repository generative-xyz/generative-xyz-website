import { IPagingResponse } from '@interfaces/paging';
import { Token } from '@interfaces/token';

export interface IListingTokenResult {
  offeringID: string;
  price: string;
  seller: string;
  closed: boolean;

  token?: Token;
}

export interface IListingTokens extends IPagingResponse {
  result: IListingTokenResult[];
}
