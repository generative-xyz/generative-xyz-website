/* eslint-disable @typescript-eslint/no-explicit-any */
import { getTokensFromLocalStorage } from '@helpers/auth';
import axios from 'axios';
import 'whatwg-fetch';

const getHeaders = () => {
  const { accessToken } = getTokensFromLocalStorage();
  return {
    // pragma: "no-cache",
    ...(accessToken && { Authorization: `${accessToken}` }),
  };
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GN_API_URL || '/api',
  withCredentials: true,
  headers: getHeaders(),
  timeout: 60 * 1000, // 10s
});
const isDebug = process.browser === false;
instance.interceptors.response.use(
  response => {
    // eslint-disable-next-line no-console
    isDebug && console.timeEnd(`callAPI: ${response?.config?.url}`);
    return response;
  },
  error => {
    // eslint-disable-next-line no-console
    isDebug && console.timeEnd(`callAPI: ${error?.response?.config?.url}`);
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-console
    isDebug && console.time(`callAPI: ${config?.url}`);
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;

export const DEFAULT_RESPONSE = {
  status: 0,
  message: '',
  data: {},
};

export const instanceV2 = {
  get: async (url: string) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: getHeaders(),
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });
    return response.json(); // parses JSON response into native JavaScript objects
  },
  post: async (url: string, data: any) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: getHeaders(),
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  },
  postFormData: async (url: string, data: any) => {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      // mode: 'cors', // no-cors, *cors, same-origin
      // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: 'same-origin', // include, *same-origin, omit
      headers: getHeaders(),
      // redirect: 'follow', // manual, *follow, error
      // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  },
};
