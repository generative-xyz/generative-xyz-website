import { LogLevel } from '@enums/log-level';
import { post } from '@services/http-client';
import log from '@utils/logger';
import {
  ICreateOrderPayload,
  ICreateOrderResponse,
} from './../interfaces/api/order';

const LOG_PREFIX = 'ProductService';

const API_PATH = '/order';

// const API_PROD_URL = process.env.NEXT_PROD_API_URL;
const API_PROD_URL = 'https://generative.xyz/api' ?? '';

export const createOrder = async (
  payload: ICreateOrderPayload
): Promise<ICreateOrderResponse> => {
  try {
    const res = await post<ICreateOrderPayload, ICreateOrderResponse>(
      `${API_PROD_URL}/v1${API_PATH}/make`,
      payload,
      {
        externalResource: true,
      }
    );
    return res;
  } catch (err: unknown) {
    log('failed to get product', LogLevel.Error, LOG_PREFIX);
    throw Error('Failed to get product');
  }
};
