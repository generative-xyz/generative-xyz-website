import { LogLevel } from '@enums/log-level';
import {
  ICreateProjectMetadataPayload,
  ICreateProjectMetadataResponse,
  IGetProjectDetailParams,
  IGetProjectDetailResponse,
  IGetProjectItemsParams,
  IGetProjectItemsQuery,
  IGetProjectListParams,
  IGetProjectListResponse,
  IGetProjectTokensResponse,
} from '@interfaces/api/project';
import { get, post } from '@services/http-client';
import log from '@utils/logger';
import querystring from 'query-string';

const LOG_PREFIX = 'ProjectService';

const API_PATH = '/project';

export const getProjectDetail = async (
  params: IGetProjectDetailParams
): Promise<IGetProjectDetailResponse> => {
  try {
    const res = await get<IGetProjectDetailResponse>(
      `${API_PATH}/${params.contractAddress}/tokens/${params.projectID}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get project detail', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get project detail');
  }
};

export const getRandomProject =
  async (): Promise<IGetProjectDetailResponse> => {
    try {
      const res = await get<IGetProjectDetailResponse>(`${API_PATH}/random`);
      return res;
    } catch (err: unknown) {
      log('failed to get project detail', LogLevel.Error, LOG_PREFIX);
      throw Error('Failed to get project detail');
    }
  };

export const getProjectItems = async (
  params: IGetProjectItemsParams,
  query: IGetProjectItemsQuery
): Promise<IGetProjectTokensResponse> => {
  try {
    const qs = '?' + querystring.stringify(query);
    const res = await get<IGetProjectTokensResponse>(
      `${API_PATH}/${params.contractAddress}/tokens${qs}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get project items', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get project items');
  }
};

export const createProjectMetadata = async (
  payload: ICreateProjectMetadataPayload
): Promise<ICreateProjectMetadataResponse> => {
  try {
    const res = await post<
      ICreateProjectMetadataPayload,
      ICreateProjectMetadataResponse
    >(`${API_PATH}`, payload);
    return res;
  } catch (err: unknown) {
    log('failed to create project metadata', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to create project metadata');
  }
};

export const getProjectList = async (
  params: IGetProjectListParams
): Promise<IGetProjectListResponse> => {
  try {
    const qs = '?' + querystring.stringify(params);
    const res = await get<IGetProjectListResponse>(`${API_PATH}${qs}`);
    return res;
  } catch (err: unknown) {
    log('failed to get project list', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get project list');
  }
};
