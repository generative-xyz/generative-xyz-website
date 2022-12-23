import { LogLevel } from '@enums/log-level';
import {
  IGetProjectDetailParams,
  IGetProjectDetailResponse,
  IGetProjectItemsParams,
  IGetProjectItemsResponse,
} from '@interfaces/api/project';
import { get } from '@services/http-client';
import log from '@utils/logger';
import querystring from 'query-string';

const LOG_PREFIX = 'ProjectService';

const API_PROJECT_DETAIL_PATH = '/project';

export const getProjectDetail = async (
  params: IGetProjectDetailParams
): Promise<IGetProjectDetailResponse> => {
  try {
    const res = await get<IGetProjectDetailResponse>(
      `${API_PROJECT_DETAIL_PATH}/${params.contractAddress}/tokens/${params.projectID}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get project detail', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get project detail');
  }
};

export const getProjectItems = async (
  params: IGetProjectItemsParams
): Promise<IGetProjectItemsResponse> => {
  try {
    const qs = '?' + querystring.stringify(params);
    const res = await get<IGetProjectItemsResponse>(
      `${API_PROJECT_DETAIL_PATH}/${params.contractAddress}/tokens${qs}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get project items', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get project items');
  }
};
