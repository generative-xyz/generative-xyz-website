import { Token, TokenAttribute } from '@interfaces/token';

export interface IGenerativeProjectSocial {
  web: string;
  twitter: string;
  discord: string;
  medium: string;
  instagram: string;
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

export interface IGetProfileTokensResponse {
  result: Array<Token>;
  total: number;
  page: number;
}
