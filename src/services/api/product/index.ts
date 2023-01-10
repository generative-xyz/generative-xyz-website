/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFactory from '../http';

/**
 *
 * @param data
 * @returns {object}
 */
export const addOptionTextToObject = (object: any) => {
  const newObject: any = {};
  object &&
    Object.keys(object).forEach(prop => {
      if (object[prop]) newObject[`option${prop}`] = object[prop];
    });
  return newObject;
};
const ECOM_API_URL =
  process.env.NEXT_PUBLIC_ECOM_API_URL ||
  'https://api.staging.autonomousdev.xyz';
const PRODUCTS_API = `${ECOM_API_URL}/product-api`;
const FLASHSALE_API = `${ECOM_API_URL}/flash-sale`;
const ORDER_API = `${ECOM_API_URL}/order-api`;
const DEFAULT_RESPONSE = {
  status: 0,
  message: '',
  data: {},
};
const PRODUCT_LIST_API = '/v1/product/list';

/**
 * Get Product API
 * Params: {
 *  productId: number
 * }
 */
export const postCartItem = async (dataPost: any): Promise<any> => {
  try {
    const response = await ApiFactory.post(
      `${ORDER_API}/order/cart?gateway_id=`,
      dataPost
    );
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

/**
 * Get Product API
 * Params: {
 *  productId: number
 * }
 */
export const getProductById = async (productId: number): Promise<any> => {
  try {
    const response = await ApiFactory.get(
      `${PRODUCTS_API}/product/${productId}`
    );
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

/**
 * Get Product API
 * Params: {
 *  productSlug: string
 *  categorySlug: string
 * }
 */
export const getProductBySlug = async (
  productSlug: string,
  categorySlug: string
): Promise<any> => {
  try {
    const response = await ApiFactory.get(
      `${PRODUCTS_API}/product/${productSlug}?categorySlug=${categorySlug}`
    );
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

/**
 * Get Product Info By ID API
 * Params: {
 *  productId: number
 *  optionSelecting: number
 *  rid: string
 * }
 */
export const getProductInfoById = async (
  productId: number,
  optionSelecting?: any,
  rid = '',
  isFlashSale = false,
  isBusinessWeek = false,
  quantity = 1,
  workEmail = '',
  state = ''
): Promise<any> => {
  try {
    let endpoint = PRODUCTS_API;
    if (isFlashSale) {
      endpoint = FLASHSALE_API;
    }
    let query = `${endpoint}/product-info/${productId}?rid=${rid}&is_flash_sale=${isFlashSale}&is_business_week=${isBusinessWeek}&quantity=${quantity}&state=${state}`;
    if (workEmail) {
      query += `&working_email=${workEmail}`;
    }
    const response = await ApiFactory.post(
      query,
      addOptionTextToObject(optionSelecting)
    );
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

/**
 * Get Product Questions API
 * Params: {
 *  productId: number
 *  queryParams: string
 * }
 */
export const getProductQuestions = async ({
  productId,
  queryParams = '',
}: any): Promise<any> => {
  try {
    const response = await ApiFactory.get(
      `${PRODUCTS_API}/product-questions/${productId}?${queryParams}`
    );
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

/**
 * Get Product Specs API
 * Params: {
 *  productId: number
 *  type: number
 * }
 */
export const getProductSpecs = async ({
  productId,
  type,
  product_url_id = -1,
}: any): Promise<any> => {
  try {
    const response = await ApiFactory.get(
      `${PRODUCTS_API}/product-spec/${productId}?type=${type}&product_url_id=${product_url_id}`
    );
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};
export const getProductList = async (): Promise<any> => {
  try {
    const response = await ApiFactory.get(`${PRODUCT_LIST_API}`);
    return response.data;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};
