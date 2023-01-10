export interface MarketplaceStats {
  bestMakeOfferPrice: string;
  floorPrice: string;
  listedPercent: number;
  totalTradingVolumn: string;
  uniqueOwnerCount: number;
}

export interface IMakeOffers {
  genNFTAddr: string;
  tokenId: string;
  closed?: boolean;
}
