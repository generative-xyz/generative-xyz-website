import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import {
  IGetProjectDetailParams,
  IGetProjectDetailResponse,
} from '@interfaces/api/project';
import { get } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'ProjectService';

const API_PROJECT_DETAIL_PATH = '/project';

export const getProjectDetail = async (
  params: IGetProjectDetailParams
): Promise<IGetProjectDetailResponse> => {
  try {
    const res = await get<IGetProjectDetailResponse>(
      `${API_PROJECT_DETAIL_PATH}/${GENERATIVE_PROJECT_CONTRACT}/tokens/${params.projectID}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get project detail', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get project detail');
  }
};
