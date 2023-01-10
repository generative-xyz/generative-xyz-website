/* eslint-disable @typescript-eslint/no-explicit-any */
import store from 'store2';

export const LOCALSTORAGE_CONFIG = {
  user: '__u_id',
  dataDetectIp: '__dataDetectIp',
  eppUser: '__epp_u',
  userEmail: '__u_email',
  accessTokenStorageKey: '__t',
  refreshTokenStorageKey: '__rt',
  address: '__at',
};

export const storageUtil =
  typeof window === 'undefined'
    ? store
    : {
        set(name: string, value: any): void {
          try {
            localStorage?.setItem(name, JSON.stringify(value));
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        get(name: string): any {
          try {
            const value = localStorage?.getItem(name);
            if (value) {
              return JSON.parse(value);
            }
            return false;
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error('storageUtil get', error);
            return false;
          }
        },
        remove(name: string): void {
          try {
            localStorage?.removeItem(name);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        clear(): void {
          try {
            localStorage?.clear();
          } catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
      };
export const setWithExpiry = (key: string, value: any, ttl: number): void => {
  const now = new Date();
  const item = {
    value,
    expiry: now.getTime() + ttl,
  };
  try {
    localStorage?.setItem(key, JSON.stringify(item));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};
export const getWithExpiry = (key: string): any => {
  let itemStr;
  try {
    itemStr = localStorage?.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
      localStorage?.removeItem(key);
      return null;
    }
    return item.value;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('getWithExpiry', error);
    return null;
  }
};
