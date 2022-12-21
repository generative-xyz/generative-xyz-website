import { LogLevel } from '@enums/log-level';
import { IResourceChain } from '@interfaces/chain';
import log from '@utils/logger';

const LOG_PREFIX = 'ChainService';

const API_PATH = 'https://chainid.network/chains.json';

export const getChainList = async (): Promise<Array<IResourceChain>> => {
  try {
    const res = await fetch(API_PATH);
    const data = await res.json();
    return data as Array<IResourceChain>;
  } catch (err: unknown) {
    log('Failed to get chain list', LogLevel.Error, LOG_PREFIX);
    return [];
  }
};
