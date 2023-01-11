/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '../http';

const PROFILE_API = `/profile`;
const WALLET_API = '/user-wallet';
const DEFAULT_RESPONSE = {
  status: 0,
  message: '',
  data: {},
};

export const postMessages = async ({ address }: any): Promise<any> => {
  try {
    const response = await http.post(`${WALLET_API}/generate-nonce`, {
      wallet_address: address,
    });
    return response;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

export const postMessagesVerify = async ({
  address,
  signature,
}: any): Promise<any> => {
  try {
    const response = await http.post(`${WALLET_API}/connect`, {
      wallet_address: address,
      signature,
    });
    return response;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};

export const getProfile = async (): Promise<any> => {
  try {
    const response = await http.get(`${PROFILE_API}`);
    return response;
  } catch (e) {
    return DEFAULT_RESPONSE;
  }
};
