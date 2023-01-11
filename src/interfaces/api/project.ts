import { IPagingParams, IPagingResponse } from '@interfaces/paging';
import { Project } from '@interfaces/project';
import { Token } from '@interfaces/token';
export interface IGetProjectDetailParams {
  contractAddress: string;
  projectID: string;
}

export type IGetProjectDetailResponse = Project;

export interface IGetProjectItemsParams {
  contractAddress: string;
}
export interface IGetProjectItemsQuery extends IPagingParams {
  name?: string;
  sort?: string;
  attributes?: string[];
  minPrice?: string;
  maxPrice?: string;
}

export interface IGetProjectItemsResponse extends IPagingResponse {
  result: Project[];
}

export interface IGetProjectTokensResponse extends IPagingResponse {
  result: Token[];
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
  result: Array<Project>;
}
