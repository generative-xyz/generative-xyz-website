import { isBrowser } from '@utils/common';

export const utf8ToBase64 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const formatAddress = (address: string): string => {
  if (address.length < 14) return address;
  return `${address.substring(0, 7)}...${address.substring(
    address.length - 7,
    address.length
  )}`;
};
