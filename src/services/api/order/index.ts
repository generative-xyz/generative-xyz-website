import logger from '@helpers/logger';
import ApiFactory, { DEFAULT_RESPONSE } from '../http';

const ORDER_API = '/v1/order';

export const makeOrder = async (orderInfo: {
  details: Array<{ id: string; qty: number }>;
  name: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}): Promise<any> => {
  try {
    const response = await ApiFactory.post(`${ORDER_API}/make`, {
      details: orderInfo.details.map(({ id, qty }) => ({
        product_id: id,
        quantity: qty,
      })),
      email: orderInfo.email,
      shipping_firstname: orderInfo.name,
      shipping_address1: orderInfo.address,
      shipping_address2: orderInfo.address2,
      shipping_postal_code: orderInfo.zip,
      shipping_region: orderInfo.state,
      shipping_city: orderInfo.city,
      shipping_country: orderInfo.country,
    });
    return response.data;
  } catch (e) {
    logger.error(e);
    return DEFAULT_RESPONSE;
  }
};

export const getOrder = async (orderId: string): Promise<any> => {
  try {
    const response = await ApiFactory.get(`${ORDER_API}/by-id/${orderId}`);

    return response.data;
  } catch (e) {
    logger.error(e);
    return DEFAULT_RESPONSE;
  }
};