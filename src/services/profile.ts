import { LogLevel } from '@enums/log-level';
import { IGetProfileResponse } from '@interfaces/api/profile';
import { get } from '@services/http-client';
import log from '@utils/logger';
import { IGetProjectItemsResponse } from '@interfaces/api/project';
import { IGetProfileTokensResponse } from '@interfaces/api/token-uri';

const LOG_PREFIX = 'ProfileService';

const API_PATH = '/profile';

export const getProfile = async (): Promise<IGetProfileResponse> => {
  try {
    return await get<IGetProfileResponse>(`${API_PATH}`);
  } catch (err: unknown) {
    log('failed to get profile', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile');
  }
};

export const getProfileByWallet = async ({
  walletAddress,
}: {
  walletAddress: string;
}): Promise<IGetProfileResponse> => {
  try {
    return await get<IGetProfileResponse>(
      `${API_PATH}/wallet/${walletAddress}`
    );
  } catch (err: unknown) {
    log('failed to get profile', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile');
  }
};

export const getProfileProjects =
  async (): Promise<IGetProjectItemsResponse> => {
    try {
      return await get<IGetProjectItemsResponse>(`${API_PATH}/projects`);
    } catch (err: unknown) {
      log('failed to get profile projects', LogLevel.Error, LOG_PREFIX);
      throw Error('Failed to get profile projects');
    }
  };

export const getProfileTokens = async ({
  walletAddress,
}: {
  walletAddress: string;
}): Promise<IGetProfileTokensResponse> => {
  try {
    return await get<IGetProfileTokensResponse>(
      `${API_PATH}/wallet/${walletAddress}/nfts`
    );
  } catch (err: unknown) {
    log('failed to get profile nfts', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile nfts');
  }
};
