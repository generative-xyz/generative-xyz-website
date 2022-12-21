import { LogLevel } from '@enums/log-level';
import {
  IGenerativeNonceMessagePayload,
  IGenerativeNonceMessageResponse,
  IVerifyNonceMessagePayload,
  IVerifyNonceMessageResponse,
} from '@interfaces/api/auth';
import { post } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'AuthService';

const API_PATH = '/auth';

export const generateNonceMessage = async (
  payload: IGenerativeNonceMessagePayload
): Promise<IGenerativeNonceMessageResponse> => {
  try {
    const res = await post<
      IGenerativeNonceMessagePayload,
      IGenerativeNonceMessageResponse
    >(`${API_PATH}/nonce`, payload);
    return res;
  } catch (err: unknown) {
    log('failed to generate nonce message', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to generate nonce message');
  }
};

export const verifyNonceMessage = async (
  payload: IVerifyNonceMessagePayload
): Promise<IVerifyNonceMessageResponse> => {
  try {
    const res = await post<
      IVerifyNonceMessagePayload,
      IVerifyNonceMessageResponse
    >(`${API_PATH}/nonce/verify`, payload);
    return res;
  } catch (err: unknown) {
    log('failed to verify nonce message', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to verify nonce message');
  }
};
