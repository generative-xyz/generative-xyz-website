/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiFactory, { DEFAULT_RESPONSE } from '../http';

export const getConfigs = async (): Promise<any> => {
  try {
    const response = await ApiFactory.get(`/configs`);
    if (response?.status === 200) {
      return response.data;
    }
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('@mockup/data').default || DEFAULT_RESPONSE;
  }
};
