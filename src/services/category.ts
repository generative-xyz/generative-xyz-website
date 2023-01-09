import { LogLevel } from '@enums/log-level';
import {
  IGetCategoryListParams,
  IGetCategoryListResponse,
} from '@interfaces/api/category';
import { get } from '@services/http-client';
import log from '@utils/logger';
import querystring from 'query-string';

const LOG_PREFIX = 'CategoryService';

const API_PATH = '/categories';

export const getCategoryList = async (
  params: IGetCategoryListParams
): Promise<IGetCategoryListResponse> => {
  try {
    const qs = '?' + querystring.stringify(params);
    const res = await get<IGetCategoryListResponse>(`${API_PATH}${qs}`);
    return res;
  } catch (err: unknown) {
    log('failed to get category list', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get category list');
  }
};
