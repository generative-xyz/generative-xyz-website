import { LogLevel } from '@enums/log-level';
import { get } from '@services/http-client';
import log from '@utils/logger';
import {
  IListingTokens,
  IMakeOffers,
  IMarketplaceStatsResponse,
} from '@interfaces/api/marketplace';

const LOG_PREFIX = 'MarketplaceService';

const API_PATH = '/marketplace';

export const getListing = async ({
  genNFTAddr,
  tokenId,
  closed = false,
}: {
  genNFTAddr: string;
  tokenId: string;
  closed: boolean;
}): Promise<IListingTokens> => {
  try {
    return await get<IListingTokens>(
      `${API_PATH}/listing/${genNFTAddr}/token/${tokenId}?closed=${closed}`
    );
  } catch (err: unknown) {
    log('failed to get listing token', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get listing');
  }
};

export const getMakeOffers = async ({
  genNFTAddr,
  tokenId,
  closed = false,
}: {
  genNFTAddr: string;
  tokenId: string;
  closed: boolean;
}): Promise<IMakeOffers> => {
  try {
    return await get<IMakeOffers>(
      `${API_PATH}/offers/${genNFTAddr}/token/${tokenId}?closed=${closed}`
    );
  } catch (err: unknown) {
    log('failed to get listing token', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get listing');
  }
};

export const getListingTokensByWallet = async ({
  walletAddress,
  closed = false,
}: {
  walletAddress: string;
  closed: boolean;
}): Promise<IListingTokens> => {
  try {
    return await get<IListingTokens>(
      `${API_PATH}/wallet/${walletAddress}/listing?closed=${closed}`
    );
  } catch (err: unknown) {
    log('failed to get listing token', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get listing');
  }
};

export const getMakeOffersByWallet = async ({
  walletAddress,
  closed = false,
}: {
  walletAddress: string;
  closed: boolean;
}): Promise<IMakeOffers> => {
  try {
    return await get<IMakeOffers>(
      `${API_PATH}/wallet/${walletAddress}/offer?closed=${closed}`
    );
  } catch (err: unknown) {
    log('failed to get listing token', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get listing');
  }
};

export const getMarketplaceStats = async ({
  projectId,
}: {
  projectId: number;
}): Promise<IMarketplaceStatsResponse | null> => {
  try {
    return await get<IMarketplaceStatsResponse>(
      `${API_PATH}/stats/${projectId}`
    );
  } catch (err: unknown) {
    log('failed to get project stats', LogLevel.Error, LOG_PREFIX);
    return null;
  }
};
