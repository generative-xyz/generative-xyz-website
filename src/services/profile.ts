import { LogLevel } from '@enums/log-level';
import { IGetProfileResponse } from '@interfaces/api/profile';
import { get } from '@services/http-client';
import log from '@utils/logger';
import { IGetProjectItemsResponse } from '@interfaces/api/project';
import { IGetProfileNFTsResponse } from '@interfaces/api/token-uri';

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

export const getProfileProjects =
  async (): Promise<IGetProjectItemsResponse> => {
    try {
      return await get<IGetProjectItemsResponse>(`${API_PATH}/projects`);
    } catch (err: unknown) {
      log('failed to get profile projects', LogLevel.Error, LOG_PREFIX);
      throw Error('Failed to get profile projects');
    }
  };

export const getProfileNFTs = async ({
  walletAddress,
}: {
  walletAddress: string;
}): Promise<IGetProfileNFTsResponse> => {
  try {
    return await get<IGetProfileNFTsResponse>(
      `${API_PATH}/wallet/${walletAddress}/nfts`
    );
  } catch (err: unknown) {
    log('failed to get profile nfts', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile nfts');
  }
};
