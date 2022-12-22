import { LogLevel } from '@enums/log-level';
import {
  IGetGenerativeTokenAttributesParams,
  IGetGenerativeTokenAttributesResponse,
  IGetGenerativeTokenUriParams,
  IGetGenerativeTokenUriResponse,
} from '@interfaces/api/token-uri';
import { get } from '@services/http-client';
import log from '@utils/logger';
import querystring from 'query-string';

const LOG_PREFIX = 'TokenUriService';

const API_TOKEN_URI_PATH = '/token';
const API_TOKEN_TRAIT_PATH = '/trait';

export const getTokenUri = async (
  params: IGetGenerativeTokenUriParams
): Promise<IGetGenerativeTokenUriResponse> => {
  try {
    const qs = '?' + querystring.stringify(params);
    const res = await get<IGetGenerativeTokenUriResponse>(
      `${API_TOKEN_URI_PATH}${qs}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get token uri', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get token uri');
  }
};

export const getTokenAttributes = async (
  params: IGetGenerativeTokenAttributesParams
): Promise<IGetGenerativeTokenAttributesResponse> => {
  try {
    const qs = '?' + querystring.stringify(params);
    const res = await get<IGetGenerativeTokenUriResponse>(
      `${API_TOKEN_TRAIT_PATH}${qs}`
    );
    return res;
  } catch (err: unknown) {
    log('failed to get token attributes', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get token attributes');
  }
};
