import { isBrowser } from '@utils/common';

export const utf8ToBase64 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return window.btoa(unescape(encodeURIComponent(str)));
};

export const formatContractAddress = (contractAddress: string): string => {
  if (contractAddress.length < 14) return contractAddress;
  return `${contractAddress.substring(0, 7)}...${contractAddress.substring(
    contractAddress.length - 7,
    contractAddress.length
  )}`;
};
