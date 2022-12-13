import { LocalStorageKey } from '@enums/local-storage';

export const getAccessToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const accessToken = localStorage.getItem(LocalStorageKey.AccessToken);
    return accessToken;
  }
  return null;
};
