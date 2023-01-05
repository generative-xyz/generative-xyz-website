import { isBrowser } from '@utils/common';

export const utf8ToBase64 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const base64ToUtf8 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return decodeURIComponent(escape(window.atob(str)));
};

export const formatAddress = (address: string): string => {
  if (address.length < 14) return address;
  return `${address.substring(0, 7)}`;
};

export const getProjectIdFromTokenId = (tokenId: number): number => {
  return Math.floor(tokenId / 1000000);
};

export const formatTokenId = (tokenId: string): string => {
  const id = Number(tokenId) % 1000000;
  return id.toString();
};
