import { IPagingParams, IPagingResponse } from '@interfaces/paging';
import { Project } from '@interfaces/project';
import { RawTokenAttributes } from '@interfaces/sandbox';

export interface IGetProjectDetailParams {
  contractAddress: string;
  projectID: string;
}

export type IGetProjectDetailResponse = Project;

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
  result: Array<Project>;
}
