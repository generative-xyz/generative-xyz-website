import { IPagingParams, IPagingResponse } from '@interfaces/paging';
import { RawTokenAttributes } from '@interfaces/sandbox';

export interface IGetProjectDetailParams {
  contractAddress: string;
  projectID: string;
}

export interface IProjectSocial {
  Web: string;
  Twitter: string;
  Discord: string;
  Medium: string;
  Instagram: string;
}

export interface IProjectDetail {
  id: string;
  maxSupply: number;
  limit: number;
  mintPrice: string;
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
  projectURI: string;
  royalty?: number;
  tokenID: string;
  mintingInfo: {
    index: number;
    indexReserve: number;
  };
}

export type IGetProjectDetailResponse = IProjectDetail;

export interface IGetProjectItemsParams extends IPagingParams {
  contractAddress: string;
}

export interface IProjectItem {
  owner: IProjectItemOwner;
  name: string;
  description?: string;
  image: string;
  animation_url?: string;
  attributes: RawTokenAttributes;
}

export interface IProjectItemOwner {
  name: string;
  avatar: string;
}

export interface IGetProjectItemsResponse extends IPagingResponse {
  result: IProjectItem[];
}

export interface ICreateProjectMetadataPayload {
  categories: Array<string>;
  contractAddress: string;
  tags: Array<string>;
  tokenID: string;
}

export type ICreateProjectMetadataResponse = IGetProjectDetailResponse;

export interface IGetProjectListParams extends IPagingParams {
  contractAddress: string;
}

export interface IGetProjectListResponse extends IPagingResponse {
  result: Array<IProjectDetail>;
}
