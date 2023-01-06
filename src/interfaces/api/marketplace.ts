import { IPagingResponse } from '@interfaces/paging';
import { Token } from '@interfaces/token';

export interface IListingTokenResult {
  offeringID: string;
  price: string;
  seller: string;
  closed: boolean;
  collectionContract: string;
  erc20Token: string;
  finished: boolean;
  durationTime: number;

  token?: Token;
}

export interface IListingTokens extends IPagingResponse {
  result: IListingTokenResult[];
}

export interface IMakeOfferResult {
  offeringID: string;
  price: string;
  seller: string;
  closed: boolean;
  collectionContract: string;
  erc20Token: string;
  finished: boolean;
  durationTime: number;

  token?: Token;
}

export interface IMakeOffers extends IPagingResponse {
  result: IMakeOfferResult[];
}
