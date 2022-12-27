import { LogLevel } from '@enums/log-level';
import { IGetProductResponse } from '@interfaces/api/product';
import { get } from '@services/http-client';
import log from '@utils/logger';

const LOG_PREFIX = 'ProductService';

const API_PATH = '/product/list';

// const API_PROD_URL = process.env.NEXT_PROD_API_URL;
const API_PROD_URL = 'https://generative.xyz/api' ?? '';

export const getProductList = async (): Promise<IGetProductResponse> => {
  try {
    const res = await get<IGetProductResponse>(
      `${API_PROD_URL}/v1${API_PATH}`,
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
