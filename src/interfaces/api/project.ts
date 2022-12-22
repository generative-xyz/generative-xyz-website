import { IPagingResponse } from '@interfaces/paging';
import { RawTokenAttributes } from './../sandbox';
export interface IGetProjectDetailParams {
  projectID: string;
}

export interface IProjectSocial {
  Web: string;
  Twitter: string;
  Discord: string;
  Medium: string;
  Instagram: string;
}

export interface IGetProjectDetailResponse {
  maxSupply: number;
  limit: number;
  mintPrice: number;
  mintPriceAddr: string;
  name: string;
  creator: string;
  creatorAddr: string;
  license: string;
  desc: string;
  image: string;
  scriptType: string[];
  social: IProjectSocial;
  scripts: string[];
  styles: string;
  completeTime: number;
  genNFTAddr: string;
  itemDesc: string;
  status: boolean;
  nftTokenURI: string;
}

export interface IGetProjectItemsParams {
  contractAddress: string;
  limit?: number;
  cursor?: string;
}

export interface IProjectItem {
  name?: string;
  description?: string;
  image: string;
  animation_url?: string;
  attributes: RawTokenAttributes;
}
export interface IGetProjectItemsResponse extends IPagingResponse {
  result: IProjectItem[];
}
