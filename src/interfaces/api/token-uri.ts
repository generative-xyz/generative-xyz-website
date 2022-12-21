import { Token, TokenAttribute } from '@interfaces/token';

export interface IGetGenerativeProjectUriParams {
  contractAddress: string;
  projectID: string;
}

export interface IGenerativeProjectSocial {
  web: string;
  twitter: string;
  discord: string;
  medium: string;
  instagram: string;
}

export interface IGetGenerativeProjectUriResponse {
  maxSupply: number;
  limit: number;
  mintPrice: number;
  mintPriceAddr: string;
  name: string;
  creator: string;
  creatorAddr: string;
  desc: string;
  image: string;
  scriptType: Array<string>;
  scripts: Array<string>;
  styles: string;
  reservationList: Array<string>;
  mintFee: number;
  completeTime: number;
  itemDesc?: string;
  royalty?: number;
  license?: string;
  mintTokenAddress?: string;
  genNFTAddr: string;
  nftTokenURI: string;
  status: boolean;
}

export interface IGetGenerativeTokenUriParams {
  contractAddress: string;
  tokenID: string;
}

export type IGetGenerativeTokenUriResponse = Token;

export interface IGetGenerativeTokenAttributesParams {
  contractAddress: string;
  projectID: string;
}

export interface IGetGenerativeTokenAttributesResponse {
  attributes: Array<TokenAttribute>;
}
