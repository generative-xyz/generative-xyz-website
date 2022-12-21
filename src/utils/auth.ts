import { LocalStorageKey } from '@enums/local-storage';
import { isBrowser } from '@utils/common';

export const getAccessToken = (): string | null => {
  if (isBrowser()) {
    const accessToken = localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    return accessToken;
  }
  return null;
};

export const clearAuthStorage = (): void => {
  if (isBrowser()) {
    localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
  }
};

export const setAccessToken = (
  accessToken: string,
  refreshToken: string
): void => {
  if (isBrowser()) {
    localStorage.setItem(LocalStorageKey.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LocalStorageKey.REFRESH_TOKEN, refreshToken);
  }
};
