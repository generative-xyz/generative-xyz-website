import { LogLevel } from '@enums/log-level';
import { IResourceChain } from '@interfaces/chain';
import { get } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'ChainService';

const API_PATH = 'https://chainid.network/chains.json';

export const getChainList = async (): Promise<Array<IResourceChain>> => {
  try {
    const res = await get<Array<IResourceChain>>(API_PATH, {
      externalResource: true,
    });
    return res;
  } catch (err: unknown) {
    log('get chain list error', LogLevel.Error, LOG_PREFIX);
    return [];
  }
};
