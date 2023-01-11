import { LogLevel } from '@enums/log-level';
import {
  IGetProfileResponse,
  IUpdateProfilePayload,
  IUpdateProfileResponse,
} from '@interfaces/api/profile';
import { IGetProjectItemsResponse } from '@interfaces/api/project';
import { IGetProfileTokensResponse } from '@interfaces/api/token-uri';
import { get, put } from '@services/http-client';
import log from '@utils/logger';

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

export const getProfileProjectsByWallet = async ({
  walletAddress,
  limit = 10,
  page = 1,
}: {
  walletAddress: string;
  limit?: number;
  page?: number;
}): Promise<IGetProjectItemsResponse> => {
  try {
    return await get<IGetProjectItemsResponse>(
      `${API_PATH}/wallet/${walletAddress}/projects?limit=${limit}&page=${page}`
    );
  } catch (err: unknown) {
    log('failed to get profile', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile');
  }
};

export const getProfileTokens = async ({
  walletAddress,
  limit = 10,
  page = 1,
}: {
  walletAddress: string;
  limit?: number;
  page?: number;
}): Promise<IGetProfileTokensResponse> => {
  try {
    return await get<IGetProfileTokensResponse>(
      `${API_PATH}/wallet/${walletAddress}/nfts?limit=${limit}&page=${page}`
    );
  } catch (err: unknown) {
    log('failed to get profile nfts', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get profile nfts');
  }
};

export const updateProfile = async (
  payload: IUpdateProfilePayload
): Promise<IUpdateProfileResponse> => {
  try {
    const res = await put<IUpdateProfilePayload, IUpdateProfileResponse>(
      API_PATH,
      payload
    );
    return res;
  } catch (err: unknown) {
    log('failed to update profile', LogLevel.Error, LOG_PREFIX);
    throw Error();
  }
};
