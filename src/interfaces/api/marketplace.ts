import { IMakeOffers, MarketplaceStats } from '@interfaces/marketplace';
import { IPagingResponse } from '@interfaces/paging';
import { TokenOffer } from '@interfaces/token';

export interface IListingTokensResponse extends IPagingResponse {
  result: TokenOffer[];
}

export interface ITokenOfferListResponse extends IPagingResponse {
  result: TokenOffer[];
}

export interface IMarketplaceStatsResponse {
  stats: MarketplaceStats;
}

export type IMakeOffersParams = IMakeOffers;