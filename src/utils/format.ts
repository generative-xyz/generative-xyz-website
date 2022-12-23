import { isBrowser } from './common';

export const utf8ToBase64 = (str: string): string => {
  if (!isBrowser()) {
    return '';
  }
  return window.btoa(unescape(encodeURIComponent(str)));
};
