import { LogLevel } from '@enums/log-level';
import { IGetProfileResponse } from '@interfaces/api/profile';
import { get } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'ProfileService';

const API_PATH = '/profile';

export const getProfile = async (): Promise<IGetProfileResponse> => {
  try {
    const res = await get<IGetProfileResponse>(`${API_PATH}`);
    return res;
  } catch (err: unknown) {
    log('failed to get profile', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile');
  }
};
